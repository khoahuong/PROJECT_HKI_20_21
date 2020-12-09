package com.huongmk.probackend.entrance.services.impl;

import com.huongmk.probackend.entrance.models.TableUsersDomain;
import com.huongmk.probackend.entrance.repositories.TableUsersRepository;
import com.huongmk.probackend.entrance.services.UsersService;
import com.huongmk.probackend.helper.DataResponse;
import com.huongmk.probackend.util.Constants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Date;
import java.util.List;
import java.util.Random;

/**
 * @author HuongMK
 */
@Service
public class UsersServiceImpl implements UsersService {

    @Autowired
    private TableUsersRepository userRepo;

    @Autowired
    private BCryptPasswordEncoder cryptPassword;

    @Autowired
    private JavaMailSender javaMailSender;

    @Override
    public Long createUser(TableUsersDomain users) {
        Long num = 1L;
        List<TableUsersDomain> lstUser = userRepo.findByIsActiveAndIsRole(Constants.STATUS.ACTIVE, Constants.ROLE.USER_NORMAL);
        if (lstUser != null && lstUser.size() > 0) {
            //List<TableUsersDomain> lstUserCheck = lstUser.stream().filter(d -> d.getUserName() == users.getUserName()).collect(Collectors.toList());
            TableUsersDomain userCheck = lstUser.stream().filter(d -> (d.getUserName()).equals(users.getUserName())).findAny().orElse(null);
            if (userCheck != null) {
                num = 2L;
                return num;
            }
            TableUsersDomain checkEmailUser = lstUser.stream().filter(d -> (d.getEmail()).equals(users.getEmail())).findAny().orElse(null);
            if (checkEmailUser != null) {
                num = 3L;
                return num;
            }
            TableUsersDomain checkCmndUser = lstUser.stream().filter(d -> (d.getSoCmnd()).equals(users.getSoCmnd())).findAny().orElse(null);
            if (checkCmndUser != null) {
                num = 4L;
                return num;
            }
        }

        users.setPassWord(cryptPassword.encode(users.getPassWord())); // ma hoa password
        users.setIsRole(Constants.ROLE.USER_NORMAL);
        users.setIsActive(Constants.STATUS.ACTIVE);
        users.setDateCreated(new Date());
        userRepo.save(users); //create tai khoan

        // send mail thong bao tao tai khoan thanh cong
        StringBuilder contentMail = new StringBuilder("Chào " + users.getLastName() + "!" + "\n");
        contentMail.append("Bạn đã tạo thành công tài khoản đăng kí hồ sơ dự thi THPT Quốc gia " +
                "và tuyển sinh đại học năm 2020 với tên đăng nhập là: " + users.getUserName()
                + " vào lúc " + new Date() + "." + "\n");
        contentMail.append("Cám ơn bạn đã tham gia.");

        sendMail(users.getEmail(), contentMail.toString());

        return num;
    }

    private void sendMail(String email, String contentMail) {
        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setFrom(Constants.MAIL_CONFIG.FROM);
        msg.setTo(email);
        msg.setSubject(Constants.MAIL_CONFIG.SUBJECT);
        msg.setText(contentMail);

        javaMailSender.send(msg);
    }

    @Override
    @Transactional
    public TableUsersDomain getUserInfo(String username, String password) {
        TableUsersDomain usersDomain = userRepo.findByUserNameAndIsActiveAndIsRole(username, Constants.STATUS.ACTIVE, Constants.ROLE.USER_NORMAL);
        if (usersDomain != null && cryptPassword.matches(password, usersDomain.getPassWord())) {
            usersDomain.setLastLogin(new Date());
            userRepo.save(usersDomain);
            return usersDomain;
        }
        return new TableUsersDomain();
    }

    @Override
    public Boolean getCodeConfirm(String email) {
        Boolean flag = false;
        TableUsersDomain userInfo = userRepo.findByEmailAndIsActive(email, Constants.STATUS.ACTIVE);
        if (userInfo != null) {
            String codeConfirm = genRandomCodeConfirm(6); // gen mã có 6 kí tự
            userInfo.setCodeResetPass(codeConfirm); // set vao thong tin tai khoan nguoi dung do
            userInfo.setTimeSetCode(new Date()); // set gia tri thời gian tạo mã để xác định thơi gian tồn tại của mã
            userRepo.save(userInfo);

            // gui ma code vua tao vao mail cho nguoi dung nhan dc de nhap mã xác nhận
            StringBuilder contentMail = new StringBuilder("Chào " + userInfo.getLastName() + "," + "\n");
            contentMail.append("Chúng tôi đã nhận được yêu cầu đặt lại mật khẩu tài khoản của bạn. Hãy nhập lại mã " +
                    "đặt lại mật khẩu sau đây:" + "\n");
            contentMail.append(codeConfirm + "\n");
            contentMail.append("Thời gian hiệu lực của mã trong vòng 10 phút." + "\n");
            contentMail.append("Nếu bạn đã không yêu cầu mật khẩu mới, hãy liên lạc lại cho chúng tôi biết.\n");
            contentMail.append("Chân thành cám ơn!");
            sendMail(email, contentMail.toString());

            flag = true;
        }
        return flag;
    }

    /**
     * hàm sinh auto mã code đổi mật khẩu
     *
     * @param number
     * @return
     */
    public String genRandomCodeConfirm(int number) {
        String ALPHAUPPERCASE = (Constants.GEN_CODE.ALPHA).toUpperCase();
        String ALPHA_NUMBERIC = Constants.GEN_CODE.ALPHA + ALPHAUPPERCASE + Constants.GEN_CODE.DIGITS;
        StringBuilder stringBuilder = new StringBuilder();
        for (int i = 0; i < number; i++) {
            int numRandom = randomNumber(0, ALPHA_NUMBERIC.length() - 1);
            char ch = ALPHA_NUMBERIC.charAt(numRandom);
            stringBuilder.append(ch);
        }
        return stringBuilder.toString();
    }

    public int randomNumber(int min, int max) {
        Random random = new Random();
        return random.nextInt((max - min) + 1) + min;
    }

    @Override
    public Long replacePassword(String email, String newPassword, String confirmCode) {
        Long number = 0L;
        TableUsersDomain usersDomain = userRepo.findByEmailAndIsActive(email, Constants.STATUS.ACTIVE);
        if (usersDomain != null) {
            if ((confirmCode).equals(usersDomain.getCodeResetPass())) {
                Date timeReset = usersDomain.getTimeSetCode();
                Long millisTimeReset = timeReset.getTime();
                Long millisCurrentTime = System.currentTimeMillis();
                Long millisTime = millisCurrentTime - millisTimeReset;
                if (millisTime < (10 * 60 * 1000)) {
                    usersDomain.setPassWord(cryptPassword.encode(newPassword)); // set password moi cho tai khoan
                    usersDomain.setCodeResetPass("");
                    usersDomain.setTimeSetCode(null);
                    userRepo.save(usersDomain); // luu lai thong tin
                    // gui mail thong bao da doi mat khau thanh cong
                    StringBuilder stringBuilder = new StringBuilder("Chào " + usersDomain.getLastName() + ",\n");
                    stringBuilder.append("Bạn đã đổi thành công mật khẩu tài khoản " + usersDomain.getUserName() + " của bạn.\n");
                    stringBuilder.append("Nếu bạn không thực hiện hành động trên, hãy liên lạc lại cho chúng tôi biết.\n");
                    stringBuilder.append("Chân thành cám ơn!");
                    sendMail(usersDomain.getEmail(), stringBuilder.toString());

                    number = 1L;
                } else {
                    number = 2L; // thoi gian hieu luc cua ma xac nhan da qua 10 phut
                }
            } else {
                number = 3L; // mã xác nhận không trùng khớp
            }
        }
        return number;
    }

    @Override
    public Long updateUserInfo(TableUsersDomain usersDomain) {
        Long num = null;
        if (usersDomain.getId() != null) {
            //get thong tin user dc luu trong database
            TableUsersDomain userInfo = userRepo.findByIdAndIsRoleAndIsActive(usersDomain.getId(), Constants.ROLE.USER_NORMAL, Constants.STATUS.ACTIVE);
            if (userInfo != null) {
                if (!(userInfo.getUserName()).equals(usersDomain.getUserName())) {
                    num = 1L; // dang co gang sua doi de lieu goc - username khac voi username cap nhat
                } else {
                    List<TableUsersDomain> lstUsers = userRepo.findByIsActiveAndIsRole(Constants.STATUS.ACTIVE, Constants.ROLE.USER_NORMAL);

                    // check email da duoc dang ky
                    TableUsersDomain checkEmail = lstUsers.stream().filter(d -> (d.getEmail()).equals(usersDomain.getEmail())).findAny().orElse(null);
                    if (checkEmail != null && !(checkEmail.getEmail()).equals(userInfo.getEmail())) {
                        num = 2L; // email da bi trung
                        return num;
                    }
                    //check so CNMD/CCCD da duoc dang ky
                    TableUsersDomain checkCmnd = lstUsers.stream().filter(d -> (d.getSoCmnd()).equals(usersDomain.getSoCmnd())).findAny().orElse(null);
                    if (checkCmnd != null && !(checkCmnd.getSoCmnd()).equals(userInfo.getSoCmnd())) {
                        num = 3L; // so cmnd da dc dang ki
                        return num;
                    }

                    //set lai cac gia tri co the dc thay doi truyen vao tu frontend
                    userInfo.setFirstName(usersDomain.getFirstName());
                    userInfo.setLastName(usersDomain.getLastName());
                    userInfo.setPosition(usersDomain.getPosition());
                    userInfo.setBirthday(usersDomain.getBirthday());
                    userInfo.setAddress(usersDomain.getAddress());
                    userInfo.setPhone(usersDomain.getPhone());
                    userInfo.setEmail(usersDomain.getEmail());
                    userInfo.setSoCmnd(usersDomain.getSoCmnd());
                    userInfo.setDateUpdated(new Date());// set ngay cap nhat
                    userRepo.save(userInfo); // luu lai thong tin user
                    num = 0L; // luu thong tin thanh cong;
                }
            } else {
                num = 1L; // dang co sua doi du lieu goc - khong ton tai tai khoan user binh thuong
            }
        } else {
            num = 1L; // khong phai chinh sua thong tin, ma la dang co gang them moi du lieu
        }
        return num;
    }

    @Override
    public TableUsersDomain getUserById(Long idUser) {
        return userRepo.findByIdAndIsActive(idUser, Constants.STATUS.ACTIVE);
    }

    @Override
    public Long replacePasswordApi(Long id, String password, String newPassword) {
        Long num = null;
        // get thong tin nguoi dung tu database
        TableUsersDomain userInfo = userRepo.findByIdAndIsRoleAndIsActive(id, Constants.ROLE.USER_NORMAL, Constants.STATUS.ACTIVE);
        if (userInfo != null) {
            if (cryptPassword.matches(password, userInfo.getPassWord())) {
                userInfo.setPassWord(cryptPassword.encode(newPassword)); // set lai password moi
                userInfo.setDateUpdated(new Date());
                userRepo.save(userInfo); // luu lai thong tin
                num = 0L; // cap nhat mat khau thanh cong
            } else {
                num = 2L; // mat khau cu khong trung khop
            }
        } else {
            num = 1L; // khong ton tai tai khoan cua user binh thuong nay
        }
        return num;
    }

    @Override
    public DataResponse createUserAdmin(TableUsersDomain users) {
        if (users.getIsRole() != Constants.ROLE.ADMIN && users.getIsRole() != Constants.ROLE.USER_MANAGER) {
            return new DataResponse(null, 0L, false, "Bạn đang cố tạo một tài khoản không hợp lệ.");
        }
        List<TableUsersDomain> lstUser = userRepo.findByIsActive(Constants.STATUS.ACTIVE);
        if (lstUser != null && lstUser.size() > 0) {
            TableUsersDomain userNameCheck = lstUser.stream().filter(d -> (d.getUserName()).equals(users.getUserName())).findAny().orElse(null);
            if (userNameCheck != null) {
                return new DataResponse(null, 0L, false, "Tên đăng nhập đã tồn tại. Nhập tên khác.");
            }
        }
        users.setPassWord(cryptPassword.encode(users.getPassWord()));
        users.setIsActive(Constants.STATUS.ACTIVE);
        users.setDateCreated(new Date());
        userRepo.save(users);
        return new DataResponse(users, 1L, true, "Tạo tài khoản quản trị hệ thống thành công.");
    }

    @Override
    public TableUsersDomain getInfoUserAdmin(String username, String password) {
        TableUsersDomain usersDomain = userRepo.findByUserNameAndIsActive(username, Constants.STATUS.ACTIVE);
        if (usersDomain != null && cryptPassword.matches(password, usersDomain.getPassWord())
                && (usersDomain.getIsRole() == Constants.ROLE.ADMIN || usersDomain.getIsRole() == Constants.ROLE.USER_MANAGER)) {
            usersDomain.setLastLogin(new Date());
            userRepo.save(usersDomain);
            return usersDomain;
        }
        return new TableUsersDomain();
    }
}
