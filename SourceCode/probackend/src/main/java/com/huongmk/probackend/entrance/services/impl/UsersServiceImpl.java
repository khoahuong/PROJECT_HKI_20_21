package com.huongmk.probackend.entrance.services.impl;

import com.huongmk.probackend.entrance.models.TableUsersDomain;
import com.huongmk.probackend.entrance.repositories.TableUsersRepository;
import com.huongmk.probackend.entrance.services.UsersService;
import com.huongmk.probackend.util.Constants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

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
        List<TableUsersDomain> lstUser = userRepo.findByIsActive(Constants.STATUS.ACTIVE);
        if (lstUser != null && lstUser.size() > 0) {
//            List<TableUsersDomain> lstUserCheck = lstUser.stream().filter(d -> d.getUserName() == users.getUserName()).collect(Collectors.toList());
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
        }

        users.setPassWord(cryptPassword.encode(users.getPassWord())); // ma hoa password
        users.setIsRole(Constants.ROLE.USER_NORMAL);
        users.setIsActive(Constants.STATUS.ACTIVE);
        users.setDateCreated(new Date());
        userRepo.save(users); //create tai khoan

        // send mail thong bao tao tai khoan thanh cong
        StringBuilder contentMail = new StringBuilder("Chào " + users.getLastName() + "!" +"\n");
        contentMail.append("Bạn đã tạo thành công tài khoản đăng kí hồ sơ dự thi THPT Quốc gia " +
                "và tuyển sinh đại học năm 2020 với tên đăng nhập là: " + users.getUserName()
                + " vào lúc " + new Date() + "." + "\n");
        contentMail.append("Cám ơn bạn đã tham gia.");

        sendMail(users.getEmail(), contentMail.toString());

        return num;
    }

    private void sendMail(String email, String contentMail) {
        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setFrom("teamuet.entrance@gmail.com");
        msg.setTo(email);
        msg.setSubject("[----- UET-SUCCESS -----]");
        msg.setText(contentMail);

        javaMailSender.send(msg);
    }
}
