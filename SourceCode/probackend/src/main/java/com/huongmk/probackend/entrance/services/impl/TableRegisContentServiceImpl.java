package com.huongmk.probackend.entrance.services.impl;

import com.huongmk.probackend.entrance.models.TableHistoryDomain;
import com.huongmk.probackend.entrance.models.TableRegisContentDomain;
import com.huongmk.probackend.entrance.models.TableRegisDomain;
import com.huongmk.probackend.entrance.models.dtos.SendData;
import com.huongmk.probackend.entrance.repositories.RegistrationRepository;
import com.huongmk.probackend.entrance.repositories.TableHistoryRepository;
import com.huongmk.probackend.entrance.repositories.TableRegisContentRepository;
import com.huongmk.probackend.entrance.services.TableRegisContentService;
import com.huongmk.probackend.util.Constants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

/**
 * @author HuongMK
 */
@Service
@Transactional
public class TableRegisContentServiceImpl implements TableRegisContentService {

    @Autowired
    private RegistrationRepository hosoRepo;

    @Autowired
    private TableRegisContentRepository regisContentRepo;

    @Autowired
    private TableHistoryRepository lichsuHsRepo;

    @Override
    public void sendYcbsHoso(SendData sendData) {
        if (sendData.getIdHoso() != null) {
            TableRegisDomain hoso = hosoRepo.findByIdHosoAndHoatdong(sendData.getIdHoso(), Constants.STATUS.ACTIVE);
            if (hoso != null) {
                if (hoso.getMaTrangthai() == Constants.REGIS_STATUS.CHO_PHE_DUYET || hoso.getMaTrangthai() == Constants.REGIS_STATUS.YC_BOSUNG
                        || hoso.getMaTrangthai() == Constants.REGIS_STATUS.DA_BOSUNG || hoso.getMaTrangthai() == Constants.REGIS_STATUS.DA_DUYET
                        || hoso.getMaTrangthai() == Constants.REGIS_STATUS.TC_XINSUA || hoso.getMaTrangthai() == Constants.REGIS_STATUS.TC_XINRUT) {
                    hoso.setMaTrangthai(Constants.REGIS_STATUS.YC_BOSUNG);
                    hoso.setTenTrangthai(Constants.REGIS_STATUS.YC_BOSUNG_STR);
                    hoso.setNgayCapnhat(new Date());
                    hoso.setNgayPheduyet(null);
                    hosoRepo.save(hoso); // cap nhat thong tin ho so
                    // luu noi dung yeu cau bo sung ho so
                    createContentRegisEdu(hoso, sendData);
                    // luu lich su ho so
                    createLichsuHoso(hoso, sendData);
                }
            }
        }
    }

    @Override
    public void sendTchoiHs(SendData sendData) {
        if (sendData.getIdHoso() != null) {
            TableRegisDomain hoso = hosoRepo.findByIdHosoAndHoatdong(sendData.getIdHoso(), Constants.STATUS.ACTIVE);
            if (hoso != null) {
                if (hoso.getMaTrangthai() != Constants.REGIS_STATUS.TAO_MOI && hoso.getMaTrangthai() != Constants.REGIS_STATUS.TC_HOSO
                        && hoso.getMaTrangthai() != Constants.REGIS_STATUS.RUT_HS && hoso.getMaTrangthai() != Constants.REGIS_STATUS.DONGY_XINRUT) {
                    hoso.setMaTrangthai(Constants.REGIS_STATUS.TC_HOSO);
                    hoso.setTenTrangthai(Constants.REGIS_STATUS.TC_HOSO_STR);
                    hoso.setNgayCapnhat(new Date());
                    hoso.setNgayPheduyet(null);
                    hosoRepo.save(hoso); // cap nhat thong tin ho so
                    // luu lai noi dung tu choi ho so
                    createContentRegisEdu(hoso, sendData);
                    //luu lai lich su ho so
                    createLichsuHoso(hoso, sendData);
                }
            }
        }
    }

    @Override
    public void sendDuyetHoso(SendData sendData) {
        if (sendData.getIdHoso() != null) {
            TableRegisDomain hoso = hosoRepo.findByIdHosoAndHoatdong(sendData.getIdHoso(), Constants.STATUS.ACTIVE);
            if (hoso != null) {
                if (hoso.getMaTrangthai() == Constants.REGIS_STATUS.CHO_PHE_DUYET || hoso.getMaTrangthai() == Constants.REGIS_STATUS.YC_BOSUNG
                        || hoso.getMaTrangthai() == Constants.REGIS_STATUS.DA_BOSUNG || hoso.getMaTrangthai() == Constants.REGIS_STATUS.TC_XINRUT
                        || hoso.getMaTrangthai() == Constants.REGIS_STATUS.DONGY_XINSUA || hoso.getMaTrangthai() == Constants.REGIS_STATUS.TC_XINSUA) {
                    hoso.setMaTrangthai(Constants.REGIS_STATUS.DA_DUYET);
                    hoso.setTenTrangthai(Constants.REGIS_STATUS.DA_DUYET_STR);
                    hoso.setNgayCapnhat(new Date());
                    hoso.setNgayPheduyet(new Date());
                    hosoRepo.save(hoso);
                    // luu lai noi dung phe duyet ho so
                    createContentRegisEdu(hoso, sendData);
                    // luu lai lich su ho so
                    createLichsuHoso(hoso, sendData);
                }
            }
        }
    }

    @Override
    public void yeucauXinsua(SendData sendData) {
        if (sendData.getIdHoso() != null) {
            TableRegisDomain hoso = hosoRepo.findByIdHosoAndHoatdong(sendData.getIdHoso(), Constants.STATUS.ACTIVE);
            if (hoso != null) {
                if (hoso.getMaTrangthai() == Constants.REGIS_STATUS.DA_DUYET || hoso.getMaTrangthai() == Constants.REGIS_STATUS.TC_XINRUT
                        || hoso.getMaTrangthai() == Constants.REGIS_STATUS.TC_XINSUA) {
                    hoso.setMaTrangthai(Constants.REGIS_STATUS.XINSUA_HS);
                    hoso.setTenTrangthai(Constants.REGIS_STATUS.XINSUA_HS_STR);
                    hoso.setNgayCapnhat(new Date());
                    hoso.setNgayPheduyet(null);
                    hosoRepo.save(hoso);
                    // luu noi dung xin sua
                    createNoidungClient(hoso, sendData);
                    // luu lich su xin sua ho so
                    createLichsuHosoClient(hoso, sendData);
                }
            }
        }
    }

    @Override
    public TableRegisContentDomain getDataByIdHoso(Long idHoso, Long maTrangthai) {
        List<TableRegisContentDomain> lstData = regisContentRepo.findByIdHosoAndMaTrangthaiAndHoatdongOrderByNgayTaoDesc(idHoso, maTrangthai, Constants.STATUS.ACTIVE);
        if (lstData != null && lstData.size() > 0) {
            return lstData.get(0);
        }
        return null;
    }

    @Override
    public void phanhoiXinsua(SendData sendData) {
        if (sendData.getIdHoso() != null) {
            TableRegisDomain hoso = hosoRepo.findByIdHosoAndHoatdong(sendData.getIdHoso(), Constants.STATUS.ACTIVE);
            if (hoso != null) {
                if (hoso.getMaTrangthai() == Constants.REGIS_STATUS.XINSUA_HS) {
                    if (sendData.getTypeConfirm() == Constants.CONFIRM_OK.OK) {
                        hoso.setMaTrangthai(Constants.REGIS_STATUS.DONGY_XINSUA);
                        hoso.setTenTrangthai(Constants.REGIS_STATUS.DONGY_XINSUA_STR);
                    } else if (sendData.getTypeConfirm() == Constants.CONFIRM_OK.NOT_OK) {
                        hoso.setMaTrangthai(Constants.REGIS_STATUS.TC_XINSUA);
                        hoso.setTenTrangthai(Constants.REGIS_STATUS.TC_XINSUA_STR);
                    }
                    hoso.setNgayPheduyet(null);
                    hoso.setNgayCapnhat(new Date());
                    hosoRepo.save(hoso);
                    // luu noi dung phan hoi xin sua
                    createContentRegisEdu(hoso, sendData);
                    // luu lich su ho so
                    createLichsuHoso(hoso, sendData);
                }
            }
        }
    }

    @Override
    public void yeucauXinrut(SendData sendData) {
        if (sendData.getIdHoso() != null) {
            TableRegisDomain hoso = hosoRepo.findByIdHosoAndHoatdong(sendData.getIdHoso(), Constants.STATUS.ACTIVE);
            if (hoso != null) {
                if (hoso.getMaTrangthai() != Constants.REGIS_STATUS.TAO_MOI && hoso.getMaTrangthai() != Constants.REGIS_STATUS.TC_HOSO
                        && hoso.getMaTrangthai() != Constants.REGIS_STATUS.RUT_HS && hoso.getMaTrangthai() != Constants.REGIS_STATUS.XIN_RUT_HS
                        && hoso.getMaTrangthai() != Constants.REGIS_STATUS.DONGY_XINRUT && hoso.getMaTrangthai() != Constants.REGIS_STATUS.XINSUA_HS) {
                    if (hoso.getMaTrangthai() == Constants.REGIS_STATUS.CHO_PHE_DUYET || hoso.getMaTrangthai() == Constants.REGIS_STATUS.YC_BOSUNG
                            || hoso.getMaTrangthai() == Constants.REGIS_STATUS.DA_BOSUNG) {
                        hoso.setMaTrangthai(Constants.REGIS_STATUS.RUT_HS);
                        hoso.setTenTrangthai(Constants.REGIS_STATUS.RUT_HS_STR);
                    } else {
                        hoso.setMaTrangthai(Constants.REGIS_STATUS.XIN_RUT_HS);
                        hoso.setTenTrangthai(Constants.REGIS_STATUS.XIN_RUT_HS_STR);
                    }
                    hoso.setNgayPheduyet(null);
                    hoso.setNgayCapnhat(new Date());
                    hosoRepo.save(hoso);
                    // luu noi dung xin rut ho so
                    createNoidungClient(hoso, sendData);
                    // luu lich su ho so
                    createLichsuHosoClient(hoso, sendData);
                }
            }
        }
    }

    @Override
    public void phanhoiXinrut(SendData sendData) {
        if (sendData.getIdHoso() != null) {
            TableRegisDomain hoso = hosoRepo.findByIdHosoAndHoatdong(sendData.getIdHoso(), Constants.STATUS.ACTIVE);
            if (hoso != null) {
                if (hoso.getMaTrangthai() == Constants.REGIS_STATUS.XIN_RUT_HS) {
                    if (sendData.getTypeConfirm() == Constants.CONFIRM_OK.OK) {
                        hoso.setMaTrangthai(Constants.REGIS_STATUS.DONGY_XINRUT);
                        hoso.setTenTrangthai(Constants.REGIS_STATUS.DONGY_XINRUT_STR);
                    } else if (sendData.getTypeConfirm() == Constants.CONFIRM_OK.NOT_OK) {
                        hoso.setMaTrangthai(Constants.REGIS_STATUS.TC_XINRUT);
                        hoso.setTenTrangthai(Constants.REGIS_STATUS.TC_XINRUT_STR);
                    }
                    hoso.setNgayPheduyet(null);
                    hoso.setNgayCapnhat(new Date());
                    hosoRepo.save(hoso);
                    // luu noi dung phan hoi yeu cau xin rut
                    createContentRegisEdu(hoso, sendData);
                    // luu lai lich su ho so
                    createLichsuHoso(hoso, sendData);
                }
            }
        }
    }

    private void createLichsuHosoClient(TableRegisDomain hoso, SendData sendData) {
        TableHistoryDomain lichsu = new TableHistoryDomain();
        lichsu.setIdHoso(hoso.getIdHoso());
        lichsu.setMaHoso(hoso.getMaHoso());
        lichsu.setNguoiGui(hoso.getHotenThisinh());
        lichsu.setNguoiNhan(Constants.DONVI.BGDDT);
        lichsu.setNoiDung(sendData.getContent());
        lichsu.setMaTrangthai(hoso.getMaTrangthai());
        lichsu.setTenTrangthai(hoso.getTenTrangthai());
        lichsu.setNgayTao(new Date());
        lichsu.setHoatdong(Constants.STATUS.ACTIVE);
        lichsuHsRepo.save(lichsu);
    }

    private void createNoidungClient(TableRegisDomain hoso, SendData sendData) {
        TableRegisContentDomain contentDomain = new TableRegisContentDomain();
        contentDomain.setIdHoso(hoso.getIdHoso());
        contentDomain.setMaHoso(hoso.getMaHoso());
        contentDomain.setNoidungYeucau(sendData.getContent());
        contentDomain.setMaTrangthai(hoso.getMaTrangthai());
        contentDomain.setTenTrangthai(hoso.getTenTrangthai());
        contentDomain.setHoatdong(Constants.STATUS.ACTIVE);
        contentDomain.setNgayTao(new Date());
        regisContentRepo.save(contentDomain);
    }

    private void createLichsuHoso(TableRegisDomain hoso, SendData sendData) {
        TableHistoryDomain lichsu = new TableHistoryDomain();
        lichsu.setIdHoso(hoso.getIdHoso());
        lichsu.setMaHoso(hoso.getMaHoso());
        lichsu.setNguoiGui(Constants.DONVI.BGDDT);
        lichsu.setNguoiNhan(hoso.getHotenThisinh());
        if (sendData.getContent() != "") {
            lichsu.setNoiDung(sendData.getContent());
        } else {
            lichsu.setNoiDung(hoso.getTenTrangthai());
        }
        lichsu.setMaTrangthai(hoso.getMaTrangthai());
        lichsu.setTenTrangthai(hoso.getTenTrangthai());
        lichsu.setHoatdong(Constants.STATUS.ACTIVE);
        lichsu.setNgayTao(new Date());
        lichsuHsRepo.save(lichsu);
    }

    private void createContentRegisEdu(TableRegisDomain hoso, SendData sendData) {
        TableRegisContentDomain content = new TableRegisContentDomain();
        content.setIdHoso(sendData.getIdHoso());
        content.setMaHoso(hoso.getMaHoso());
        if (sendData.getContent() != "") {
            content.setNoidungPhanhoi(sendData.getContent());
        } else {
            content.setNoidungPhanhoi(hoso.getTenTrangthai());
        }
        content.setMaTrangthai(hoso.getMaTrangthai());
        content.setTenTrangthai(hoso.getTenTrangthai());
        content.setHoatdong(Constants.STATUS.ACTIVE);
        content.setNgayTao(new Date());
        regisContentRepo.save(content);
    }
}
