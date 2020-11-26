package com.huongmk.probackend.entrance.services.impl;

import com.huongmk.probackend.entrance.models.*;
import com.huongmk.probackend.entrance.models.dtos.SearchRegisDto;
import com.huongmk.probackend.entrance.repositories.*;
import com.huongmk.probackend.entrance.services.RegistrationService;
import com.huongmk.probackend.helper.DataResponse;
import com.huongmk.probackend.helper.ListJson;
import com.huongmk.probackend.util.Constants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

/**
 * @author HuongMK
 */
@Service
@Transactional
public class RegistrationServiceImpl implements RegistrationService {

    @Autowired
    private RegistrationRepository regisRepo;

    @Autowired
    private TableRegisSchoolRepository regisSchoolRepo;

    @Autowired
    private TableRegisSubXtnRepository regisSubXtnRepo;

    @Autowired
    private TableRegisExamRepository regisExamRepo;

    @Autowired
    private TableRegisAttachmentRepository regisAttachRepo;

    @Autowired
    private TableHistoryRepository historyRepository;

    @Autowired
    private TableUsersRepository usersRepository;

    @Override
    public TableRegisDomain createRegis(TableRegisDomain regisDomain) {
        if (regisDomain.getUserId() != null) {
            regisDomain.setMaTrangthai(Constants.REGIS_STATUS.TAO_MOI);
            regisDomain.setTenTrangthai(Constants.REGIS_STATUS.TAO_MOI_STR);
            regisDomain.setNgayTao(new Date());
            regisDomain.setHoatdong(Constants.STATUS.ACTIVE);
            regisRepo.save(regisDomain); //lưu lại để set id cho hồ sơ
            if (regisDomain.getMaHoso() == null || "".equals(regisDomain.getMaHoso())) {
                String maHs = getAutoMaHoso(regisDomain.getIdHoso());
                regisDomain.setMaHoso(maHs);
                regisRepo.save(regisDomain);
            }
            if (regisDomain.getLstShool() != null && regisDomain.getLstShool().size() > 0) {
                createDanhsachLopThpt(regisDomain);
            }
            if (regisDomain.getLstMonhocXtn() != null && regisDomain.getLstMonhocXtn().size() > 0) {
                createDsMonBaoluu(regisDomain);
            }
            if (regisDomain.getLstExam() != null && regisDomain.getLstExam().size() > 0) {
                createNguyenvongXettuyen(regisDomain);
            }
            if (regisDomain.getLstDinhkem() != null && regisDomain.getLstDinhkem().size() > 0) {
                createDinhkem(regisDomain);
            }
            createLichsu(regisDomain, Constants.REGIS_STATUS.TAO_MOI_STR);

            return regisDomain;
        }
        return null;
    }

    @Override
    public ListJson<TableRegisDomain> searchRegistration(SearchRegisDto searchDto) {
        List<TableRegisDomain> lstHoso = new ArrayList<>();
        Long countTotal = regisRepo.countSearch(searchDto);
        if (countTotal > 0) {
            lstHoso = regisRepo.searchRegis(searchDto);
        }
        return new ListJson<TableRegisDomain>(lstHoso, countTotal);
    }

    @Override
    public void deleteRegis(Long idRegis, Long userId) {
        TableRegisDomain hoso = regisRepo.findByIdHosoAndUserIdAndHoatdong(idRegis, userId, Constants.STATUS.ACTIVE);
        if (hoso != null) {
            hoso.setHoatdong(Constants.STATUS.INACTIVE);
            regisRepo.save(hoso); // xoa ho so
            List<TableRegisSchoolDomain> lstClass = regisSchoolRepo.findByIdHosoAndHoatDongOrderByIdSchool(hoso.getIdHoso(), Constants.STATUS.ACTIVE);
            if (lstClass != null && lstClass.size() > 0) {
                for (TableRegisSchoolDomain lop : lstClass) {
                    lop.setHoatDong(Constants.STATUS.INACTIVE);
                    regisSchoolRepo.save(lop);
                }
            }
            List<TableRegisSubXtnDomain> lstSubject = regisSubXtnRepo.findByIdHosoAndHoatdong(hoso.getIdHoso(), Constants.STATUS.ACTIVE);
            if (lstSubject != null && lstSubject.size() > 0) {
                for (TableRegisSubXtnDomain monhoc : lstSubject) {
                    monhoc.setHoatdong(Constants.STATUS.INACTIVE);
                    regisSubXtnRepo.save(monhoc);
                }
            }
            List<TableRegisExamDomain> lstNguyenvong = regisExamRepo.findByIdHosoAndHoatdong(hoso.getIdHoso(), Constants.STATUS.ACTIVE);
            if (lstNguyenvong != null && lstNguyenvong.size() > 0) {
                for (TableRegisExamDomain ngVong : lstNguyenvong) {
                    ngVong.setHoatdong(Constants.STATUS.INACTIVE);
                    regisExamRepo.save(ngVong);
                }
            }
            List<TableRegisAttachmentsDomain> lstDinhkem = regisAttachRepo.findByIdHosoAndHoatdong(hoso.getIdHoso(), Constants.STATUS.ACTIVE);
            if (lstDinhkem != null && lstDinhkem.size() > 0) {
                for (TableRegisAttachmentsDomain dk : lstDinhkem) {
                    dk.setHoatdong(Constants.STATUS.INACTIVE);
                    regisAttachRepo.save(dk);
                }
            }
        }
    }

    @Override
    public TableRegisDomain getDataRegistration(Long idHoso) {
        TableRegisDomain hoso = regisRepo.findByIdHosoAndHoatdong(idHoso, Constants.STATUS.ACTIVE);
        if (hoso != null) {
            List<TableRegisSchoolDomain> lstLopThpt = regisSchoolRepo.findByIdHosoAndHoatDongOrderByIdSchool(idHoso, Constants.STATUS.ACTIVE);
            hoso.setLstShool(lstLopThpt);
            List<TableRegisSubXtnDomain> lstMonThiXtn = regisSubXtnRepo.findByIdHosoAndHoatdongOrderByIdSubXtn(idHoso, Constants.STATUS.ACTIVE);
            hoso.setLstMonhocXtn(lstMonThiXtn);
            List<TableRegisExamDomain> lstngVong = regisExamRepo.findByIdHosoAndHoatdongOrderByIdExam(idHoso, Constants.STATUS.ACTIVE);
            hoso.setLstExam(lstngVong);
            List<TableRegisAttachmentsDomain> lstDinhkem = regisAttachRepo.findByIdHosoAndHoatdongOrderByIdAttachment(idHoso, Constants.STATUS.ACTIVE);
            hoso.setLstDinhkem(lstDinhkem);
        }
        return hoso;
    }

    @Override
    public TableRegisDomain updateRegis(TableRegisDomain regisDomain) {
        TableRegisDomain hosoDb = regisRepo.findByIdHosoAndHoatdong(regisDomain.getIdHoso(), Constants.STATUS.ACTIVE);
        if (hosoDb != null && hosoDb.getUserId() == regisDomain.getUserId()) {
            regisDomain.setMaHoso(hosoDb.getMaHoso());
            regisDomain.setUserId(hosoDb.getUserId());
            regisDomain.setMaTrangthai(hosoDb.getMaTrangthai());
            regisDomain.setTenTrangthai(hosoDb.getTenTrangthai());
            regisDomain.setNgayTao(hosoDb.getNgayTao());
            regisDomain.setNgayGui(hosoDb.getNgayGui());
            regisDomain.setNgayPheduyet(hosoDb.getNgayPheduyet());
            regisDomain.setHoatdong(hosoDb.getHoatdong());
            regisRepo.save(regisDomain);
            if (regisDomain.getLstShool() != null && regisDomain.getLstShool().size() > 0) {
                updateDanhsachLopThpt(regisDomain);
            }
            if (regisDomain.getLstMonhocXtn() != null && regisDomain.getLstMonhocXtn().size() > 0) {
                updateDsMonBaoluu(regisDomain);
            }
            if (regisDomain.getLstExam() != null && regisDomain.getLstExam().size() > 0) {
                updateNgVongXt(regisDomain);
            }
            if (regisDomain.getLstDinhkem() != null && regisDomain.getLstDinhkem().size() > 0) {
                updateDinhkem(regisDomain);
            }
            createLichsu(regisDomain, Constants.REGIS_STATUS.CAP_NHAT_STR);
            return regisDomain;
        }
        return null;
    }

    @Override
    public DataResponse sendDataRegis(TableRegisDomain regisDomain) {
        TableRegisDomain hosoDuthi = new TableRegisDomain();
        if (regisDomain.getUserId() == null) {
            return new DataResponse(null, 0L, false, "Tài khoản người dùng để khai báo hồ sơ không hợp lệ.");
        }
        if (regisDomain.getIdHoso() == null) {
            hosoDuthi = createRegis(regisDomain);
        } else {
            hosoDuthi = updateRegis(regisDomain);
            if (hosoDuthi == null) {
                return new DataResponse(null, 0L, false, "Có lỗi trong quá trình cập nhật hồ sơ.");
            }
        }
        List<TableRegisDomain> lstHoso = regisRepo.findByUserIdAndHoatdong(regisDomain.getUserId(), Constants.STATUS.ACTIVE);
        if (lstHoso != null && lstHoso.size() > 0) {
            TableRegisDomain checkHoso = lstHoso.stream().filter(d -> (d.getMaTrangthai() != Constants.REGIS_STATUS.TAO_MOI
                    && d.getMaTrangthai() != Constants.REGIS_STATUS.TC_HOSO && d.getMaTrangthai() != Constants.REGIS_STATUS.RUT_HS
                    && d.getMaTrangthai() != Constants.REGIS_STATUS.DONGY_XINRUT)).findAny().orElse(null);
            if (checkHoso != null && hosoDuthi.getIdHoso() != checkHoso.getIdHoso()) {
                return new DataResponse(null, 0L, false, "Hiện tại đang tồn tại hồ sơ đã được gửi đi và xử lý trong tài khoản này. Vui lòng kiểm tra lại.");
            }
        }
        // cap nhat trang thai cho ho so
        if (hosoDuthi.getMaTrangthai() == Constants.REGIS_STATUS.TAO_MOI || hosoDuthi.getMaTrangthai() == Constants.REGIS_STATUS.CHO_PHE_DUYET
                || hosoDuthi.getMaTrangthai() == Constants.REGIS_STATUS.DONGY_XINSUA) {
            hosoDuthi.setMaTrangthai(Constants.REGIS_STATUS.CHO_PHE_DUYET);
            hosoDuthi.setTenTrangthai(Constants.REGIS_STATUS.CHO_PHE_DUYET_STR);
            hosoDuthi.setNgayGui(new Date());
            regisRepo.save(hosoDuthi);
            createLichsu(hosoDuthi, Constants.REGIS_STATUS.CHO_PHE_DUYET_STR);
            return new DataResponse(hosoDuthi, 1L, true, "Gửi hồ sơ thành công");
        } else if (hosoDuthi.getMaTrangthai() == Constants.REGIS_STATUS.YC_BOSUNG || hosoDuthi.getMaTrangthai() == Constants.REGIS_STATUS.DA_BOSUNG) {
            hosoDuthi.setMaTrangthai(Constants.REGIS_STATUS.DA_BOSUNG);
            hosoDuthi.setTenTrangthai(Constants.REGIS_STATUS.DA_BOSUNG_STR);
            hosoDuthi.setNgayGui(new Date());
            regisRepo.save(hosoDuthi);
            createLichsu(hosoDuthi, Constants.REGIS_STATUS.DA_BOSUNG_STR);
            return new DataResponse(hosoDuthi, 1L, true, "Gửi hồ sơ thành công");
        }
        return new DataResponse(null, 0L, false, "Gửi hồ sơ không thành công. Hồ sơ đang không đúng trạng thái để gửi hồ sơ");
    }

    @Override
    public ListJson<TableRegisDomain> searchRegisForAdmin(SearchRegisDto searchRegisDto) {
        List<TableRegisDomain> lstHoso = new ArrayList<>();
        Long countTotal = 0L;
        TableUsersDomain userInfo = usersRepository.findByIdAndIsRoleAndIsActive(searchRegisDto.getUserId(), Constants.ROLE.USER_MANAGER, Constants.STATUS.ACTIVE);
        if (userInfo != null) {
            countTotal = regisRepo.countSearchRegisForAdmin(searchRegisDto, userInfo.getKhuvucQuanly());
            if (countTotal > 0L) {
                lstHoso = regisRepo.searchRegisForAdmin(searchRegisDto, userInfo.getKhuvucQuanly());
            }
        }
        return new ListJson<TableRegisDomain>(lstHoso, countTotal);
    }

    private void updateDinhkem(TableRegisDomain regisDomain) {
        List<TableRegisAttachmentsDomain> lstDinhkemOld = regisAttachRepo.findByIdHosoAndHoatdong(regisDomain.getIdHoso(), Constants.STATUS.ACTIVE);
        if (lstDinhkemOld != null && lstDinhkemOld.size() > 0) {
            for (TableRegisAttachmentsDomain dk : lstDinhkemOld) {
                dk.setHoatdong(Constants.STATUS.INACTIVE);
                regisAttachRepo.save(dk);
            }
        }
        for (TableRegisAttachmentsDomain dkNew : regisDomain.getLstDinhkem()) {
            dkNew.setIdAttachment(null);
            dkNew.setIdHoso(regisDomain.getIdHoso());
            dkNew.setMaHoso(regisDomain.getMaHoso());
            dkNew.setNgayTao(new Date());
            dkNew.setHoatdong(Constants.STATUS.ACTIVE);
            regisAttachRepo.save(dkNew);
        }
    }

    private void updateNgVongXt(TableRegisDomain regisDomain) {
        List<TableRegisExamDomain> lstNgvongOld = regisExamRepo.findByIdHosoAndHoatdong(regisDomain.getIdHoso(), Constants.STATUS.ACTIVE);
        if (lstNgvongOld != null && lstNgvongOld.size() > 0) {
            for (TableRegisExamDomain ngVong : lstNgvongOld) {
                ngVong.setHoatdong(Constants.STATUS.INACTIVE);
                regisExamRepo.save(ngVong);
            }
        }
        for (TableRegisExamDomain ngVongNew : regisDomain.getLstExam()) {
            ngVongNew.setIdExam(null);
            ngVongNew.setIdHoso(regisDomain.getIdHoso());
            ngVongNew.setMaHoso(regisDomain.getMaHoso());
            ngVongNew.setNgayTao(new Date());
            ngVongNew.setHoatdong(Constants.STATUS.ACTIVE);
            regisExamRepo.save(ngVongNew);
        }
    }

    private void updateDsMonBaoluu(TableRegisDomain regisDomain) {
        List<TableRegisSubXtnDomain> lstMonBaoluuOld = regisSubXtnRepo.findByIdHosoAndHoatdong(regisDomain.getIdHoso(), Constants.STATUS.ACTIVE);
        if (lstMonBaoluuOld != null && lstMonBaoluuOld.size() > 0) {
            for (TableRegisSubXtnDomain monBlOld : lstMonBaoluuOld) {
                monBlOld.setHoatdong(Constants.STATUS.INACTIVE);
                regisSubXtnRepo.save(monBlOld);
            }
        }
        for (TableRegisSubXtnDomain monBlNew : regisDomain.getLstMonhocXtn()) {
            monBlNew.setIdSubXtn(null);
            monBlNew.setIdHoso(regisDomain.getIdHoso());
            monBlNew.setMaHoso(regisDomain.getMaHoso());
            monBlNew.setNgayTao(new Date());
            monBlNew.setHoatdong(Constants.STATUS.ACTIVE);
            regisSubXtnRepo.save(monBlNew);
        }
    }

    private void updateDanhsachLopThpt(TableRegisDomain regisDomain) {
        List<TableRegisSchoolDomain> lstLopThptOld = regisSchoolRepo.findByIdHosoAndHoatDongOrderByIdSchool(regisDomain.getIdHoso(), Constants.STATUS.ACTIVE);
        if (lstLopThptOld != null && lstLopThptOld.size() > 0) {
            for (TableRegisSchoolDomain lopOld : lstLopThptOld) {
                lopOld.setHoatDong(Constants.STATUS.INACTIVE);
                regisSchoolRepo.save(lopOld);
            }
        }
        for (TableRegisSchoolDomain lopNew : regisDomain.getLstShool()) {
            lopNew.setIdSchool(null);
            lopNew.setIdHoso(regisDomain.getIdHoso());
            lopNew.setMaHoso(regisDomain.getMaHoso());
            lopNew.setHoatDong(Constants.STATUS.ACTIVE);
            lopNew.setNgayTao(new Date());
            regisSchoolRepo.save(lopNew);
        }
    }


    /**
     * Lưu lại lịch sử hồ sơ
     *
     * @param regisDomain
     */
    private void createLichsu(TableRegisDomain regisDomain, String noidung) {
        TableHistoryDomain lichsu = new TableHistoryDomain();
        lichsu.setIdHoso(regisDomain.getIdHoso());
        lichsu.setMaHoso(regisDomain.getMaHoso());
        lichsu.setNguoiGui(regisDomain.getHotenThisinh());
        lichsu.setNguoiNhan(Constants.DONVI.BGDDT);
        lichsu.setNoiDung(noidung);
        lichsu.setMaTrangthai(regisDomain.getMaTrangthai());
        lichsu.setTenTrangthai(regisDomain.getTenTrangthai());
        lichsu.setNgayTao(new Date());
        lichsu.setHoatdong(Constants.STATUS.ACTIVE);
        historyRepository.save(lichsu);
    }

    /**
     * hàm tạo mới danh sách đinh kèm
     *
     * @param regisDomain
     */
    private void createDinhkem(TableRegisDomain regisDomain) {
        List<TableRegisAttachmentsDomain> lstDinhkem = regisDomain.getLstDinhkem();
        for (TableRegisAttachmentsDomain dk : lstDinhkem) {
            dk.setIdAttachment(null);
            dk.setIdHoso(regisDomain.getIdHoso());
            dk.setMaHoso(regisDomain.getMaHoso());
            dk.setNgayTao(new Date());
            dk.setHoatdong(Constants.STATUS.ACTIVE);
            regisAttachRepo.save(dk);
        }
    }

    /**
     * hàm tạo mới danh sách các nguyện vọng xét tuyển đại học
     *
     * @param regisDomain
     */
    private void createNguyenvongXettuyen(TableRegisDomain regisDomain) {
        List<TableRegisExamDomain> lstNguyenvong = regisDomain.getLstExam();
        for (TableRegisExamDomain nv : lstNguyenvong) {
            nv.setIdExam(null);
            nv.setIdHoso(regisDomain.getIdHoso());
            nv.setMaHoso(regisDomain.getMaHoso());
            nv.setHoatdong(Constants.STATUS.ACTIVE);
            nv.setNgayTao(new Date());
            regisExamRepo.save(nv);
        }
    }

    /**
     * hàm tạo mới danh sách các môn thi được bảo lưu để xet tốt nghiệp
     *
     * @param regisDomain
     */
    private void createDsMonBaoluu(TableRegisDomain regisDomain) {
        List<TableRegisSubXtnDomain> lstMonthi = regisDomain.getLstMonhocXtn();
        for (TableRegisSubXtnDomain monthi : lstMonthi) {
            monthi.setIdSubXtn(null);
            monthi.setIdHoso(regisDomain.getIdHoso());
            monthi.setMaHoso(regisDomain.getMaHoso());
            monthi.setNgayTao(new Date());
            monthi.setHoatdong(Constants.STATUS.ACTIVE);
            regisSubXtnRepo.save(monthi);
        }
    }

    /**
     * hàm tạo mới danh sách lớp học THPT
     *
     * @param regisDomain
     */
    private void createDanhsachLopThpt(TableRegisDomain regisDomain) {
        List<TableRegisSchoolDomain> lstLopThpt = regisDomain.getLstShool();
        for (TableRegisSchoolDomain lop : lstLopThpt) {
            lop.setIdSchool(null);
            lop.setIdHoso(regisDomain.getIdHoso());
            lop.setMaHoso(regisDomain.getMaHoso());
            lop.setHoatDong(Constants.STATUS.ACTIVE);
            lop.setNgayTao(new Date());
            regisSchoolRepo.save(lop);
        }
    }

    /**
     * hàm get auto mã hồ sơ
     *
     * @param idHoso
     * @return
     */
    private String getAutoMaHoso(Long idHoso) {
        Integer year = Integer.valueOf(Calendar.getInstance().get(Calendar.YEAR));
        Integer month = Integer.valueOf(Calendar.getInstance().get(Calendar.MONTH) + 1);
        Integer day = Integer.valueOf(Calendar.getInstance().get(Calendar.DATE));
        if (idHoso.longValue() >= 10000000L) {
            idHoso = Long.valueOf(idHoso.longValue() - 10000000L + 1L);
        }
        return String.format("%d%02d%02d%07d", year, month, day, idHoso);
    }
}
