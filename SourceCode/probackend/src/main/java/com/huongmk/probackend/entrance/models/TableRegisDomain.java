package com.huongmk.probackend.entrance.models;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.Date;
import java.util.List;

/**
 * @author HuongMK
 */
@Entity
@Table(name = "TABLE_REGISTRATION", schema = "ENTRANCE_REGIS")
public class TableRegisDomain {
    @Id
    @NotNull
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "TABLE_REGISTRATION_SEQ")
    @SequenceGenerator(sequenceName = "TABLE_REGISTRATION_SEQ", schema = "ENTRANCE_REGIS", initialValue = 1, allocationSize = 1, name = "TABLE_REGISTRATION_SEQ")
    @Column(name = "ID_HOSO")
    private Long idHoso;
    @Size(max = 100)
    @Column(name = "MA_HOSO")
    private String maHoso;
    @Column(name = "USER_ID")
    private Long userId; // id cua thi sinh tao ho so
    @Column(name = "MA_TRANGTHAI")
    private Long maTrangthai;
    @Size(max = 255)
    @Column(name = "TEN_TRANGTHAI")
    private String tenTrangthai;
    @Column(name = "NGAY_TAO")
    @Temporal(TemporalType.DATE)
    private Date ngayTao;
    @Column(name = "NGAY_GUI")
    @Temporal(TemporalType.DATE)
    private Date ngayGui;
    @Column(name = "NGAY_PHEDUYET")
    @Temporal(TemporalType.DATE)
    private Date ngayPheduyet;
    @Column(name = "HOATDONG")
    private Long hoatdong;

    //thong tin form ho so
    //thong tin ca nhan thi sinh
    @Size(max = 512)
    @Column(name = "TEN_SO_GDDT")
    private String tenSoGddt;
    @Size(max = 10)
    @Column(name = "MA_SO_GDDT")
    private String maSoGddt;
    @Size(max = 255)
    @Column(name = "HOTEN_THISINH")
    private String hotenThisinh;
    @Column(name = "MA_GIOITINH")
    private Long maGioitinh; // Nu: 1, Nam: 0
    @Size(max = 255)
    @Column(name = "TEN_GIOITINH")
    private String tenGioitinh;
    @Column(name = "NGAY_SINH")
    @Temporal(TemporalType.DATE)
    private Date ngaySinh;
    @Size(max = 512)
    @Column(name = "NOI_SINH")
    private String noiSinh;
    @Size(max = 255)
    @Column(name = "DAN_TOC")
    private String danToc;
    @Column(name = "IS_NATIONAL")
    private Long isNational; // check quoc tich nuoc ngoai
    @Size(max = 15)
    @Column(name = "SO_CMND")
    private String soCmnd; // so cmnd, cccd
    @Size(max = 50)
    @Column(name = "MA_TINHTHANH_TT")
    private String maTinhthanhTt;
    @Size(max = 255)
    @Column(name = "TEN_TINHTHANH_TT")
    private String tenTinhthanhTt;
    @Size(max = 50)
    @Column(name = "MA_QUANHUYEN_TT")
    private String maQuanhuyenTt;
    @Size(max = 255)
    @Column(name = "TEN_QUANHUYEN_TT")
    private String tenQuanhuyenTt;
    @Size(max = 50)
    @Column(name = "MA_XAPHUONG_TT")
    private String maXaphuongTt;
    @Size(max = 255)
    @Column(name = "TEN_XAPHUONG_TT")
    private String tenXaphuongTt;
    @Column(name = "HKTT_KVI")
    private Long hkttKvi; // check ho khau thuong tru KVI tren 18 thang: 0: Không, 1: Có
    @Column(name = "HKTT_DBKK")
    private Long hkttDbkk; // check HKTT tai cac xa dac biet kho khan tren 18 thang: 0: Không; 1: Có
    @Size(max = 50)
    @Column(name = "MA_TINHTP_THPT")
    private String maTinhtpThpt;
    @Size(max = 255)
    @Column(name = "TEN_TINHTP_THPT")
    private String tenTinhtpThpt;
    @Size(max = 50)
    @Column(name = "MA_QUANHUYEN_THPT")
    private String maQuanhuyenThpt;
    @Size(max = 255)
    @Column(name = "TEN_QUANHUYEN_THPT")
    private String tenQuanhuyenThpt;
    @Size(max = 50)
    @Column(name = "MA_THPT")
    private String maThpt;
    @Size(max = 255)
    @Column(name = "TEN_THPT")
    private String tenThpt;
    @Size(max = 255)
    @Column(name = "TEN_LOP12")
    private String tenLop12;
    @Size(max = 50)
    @Column(name = "SDT_THISINH")
    private String sdtThisinh;
    @Size(max = 100)
    @Column(name = "EMAIL_THISINH")
    private String emailThisinh;
    @Size(max = 512)
    @Column(name = "THONGTIN_LIENHE")
    private String thongtinLienhe;

    // thong tin dang ky
    @Column(name = "XETTUYEN_DHCD")
    private Long xettuyenDhcd; // Có: 1; Không: 0
    @Column(name = "MA_PHANLOAI_THISINH")
    private Long maPhanloaiThisinh;
    @Size(max = 125)
    @Column(name = "TEN_PHANLOAI_THISINH")
    private String tenPhanloaiThisinh;
    @Size(max = 50)
    @Column(name = "MA_NOI_DKDT")
    private String maNoiDkdt;
    @Size(max = 255)
    @Column(name = "TEN_NOI_DKDT")
    private String tenNoiDkdt;
    @Transient
    private List<TableRegisSubjectDomain> lstSubjects; // list dang ky bai thi, mon thi
    @Size(max = 255)
    @Column(name = "CHUNGCHI_NGOAINGU")
    private String chungchiNgoaingu;
    @Size(max = 30)
    @Column(name = "DIEMTHI_CHUNGCHI_NN")
    private String diemthiChungchiNn; // neu chung chi co diem thi thi ghi diem

    // thong tin xet cong nhan tot nghiep
    @Transient
    private List<TableRegisSubXtnDomain> lstMonhocXtn; // list bai thi bao luu xet tot nghiep THPT

    //thong tin xet tuyen dai hoc, cao dang
    @Size(max = 5)
    @Column(name = "MA_DT_UUTIEN")
    private String maDtUutien;
    @Size(max = 255)
    @Column(name = "TEN_DT_UUTIEN")
    private String tenDtUutien;
    @Size(max = 15)
    @Column(name = "MA_KHUVUC_TS")
    private String maKhuvucTs;
    @Size(max = 255)
    @Column(name = "TEN_KHUVUC_TS")
    private String tenKhuvucTs;
    @Size(max = 4)
    @Column(name = "NAM_TOTNGHIEP")
    private String namTotnghiep;
    @Size(max = 15)
    @Column(name = "MA_LIENTHONG")
    private String maLienthong;
    @Size(max = 255)
    @Column(name = "TEN_LIENTHONG")
    private String tenLienthong;
    @Transient
    private List<TableRegisExamDomain> lstExam;

    @Transient
    private List<TableRegisAttachmentsDomain> lstDinhkem;

    public Long getIdHoso() {
        return idHoso;
    }

    public void setIdHoso(Long idHoso) {
        this.idHoso = idHoso;
    }

    public String getMaHoso() {
        return maHoso;
    }

    public void setMaHoso(String maHoso) {
        this.maHoso = maHoso;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getMaTrangthai() {
        return maTrangthai;
    }

    public void setMaTrangthai(Long maTrangthai) {
        this.maTrangthai = maTrangthai;
    }

    public String getTenTrangthai() {
        return tenTrangthai;
    }

    public void setTenTrangthai(String tenTrangthai) {
        this.tenTrangthai = tenTrangthai;
    }

    public Date getNgayTao() {
        return ngayTao;
    }

    public void setNgayTao(Date ngayTao) {
        this.ngayTao = ngayTao;
    }

    public Date getNgayGui() {
        return ngayGui;
    }

    public void setNgayGui(Date ngayGui) {
        this.ngayGui = ngayGui;
    }

    public Date getNgayPheduyet() {
        return ngayPheduyet;
    }

    public void setNgayPheduyet(Date ngayPheduyet) {
        this.ngayPheduyet = ngayPheduyet;
    }

    public Long getHoatdong() {
        return hoatdong;
    }

    public void setHoatdong(Long hoatdong) {
        this.hoatdong = hoatdong;
    }

    public String getTenSoGddt() {
        return tenSoGddt;
    }

    public void setTenSoGddt(String tenSoGddt) {
        this.tenSoGddt = tenSoGddt;
    }

    public String getMaSoGddt() {
        return maSoGddt;
    }

    public void setMaSoGddt(String maSoGddt) {
        this.maSoGddt = maSoGddt;
    }

    public String getHotenThisinh() {
        return hotenThisinh;
    }

    public void setHotenThisinh(String hotenThisinh) {
        this.hotenThisinh = hotenThisinh;
    }

    public Long getMaGioitinh() {
        return maGioitinh;
    }

    public void setMaGioitinh(Long maGioitinh) {
        this.maGioitinh = maGioitinh;
    }

    public String getTenGioitinh() {
        return tenGioitinh;
    }

    public void setTenGioitinh(String tenGioitinh) {
        this.tenGioitinh = tenGioitinh;
    }

    public Date getNgaySinh() {
        return ngaySinh;
    }

    public void setNgaySinh(Date ngaySinh) {
        this.ngaySinh = ngaySinh;
    }

    public String getNoiSinh() {
        return noiSinh;
    }

    public void setNoiSinh(String noiSinh) {
        this.noiSinh = noiSinh;
    }

    public String getDanToc() {
        return danToc;
    }

    public void setDanToc(String danToc) {
        this.danToc = danToc;
    }

    public Long getIsNational() {
        return isNational;
    }

    public void setIsNational(Long isNational) {
        this.isNational = isNational;
    }

    public String getSoCmnd() {
        return soCmnd;
    }

    public void setSoCmnd(String soCmnd) {
        this.soCmnd = soCmnd;
    }

    public String getMaTinhthanhTt() {
        return maTinhthanhTt;
    }

    public void setMaTinhthanhTt(String maTinhthanhTt) {
        this.maTinhthanhTt = maTinhthanhTt;
    }

    public String getTenTinhthanhTt() {
        return tenTinhthanhTt;
    }

    public void setTenTinhthanhTt(String tenTinhthanhTt) {
        this.tenTinhthanhTt = tenTinhthanhTt;
    }

    public String getMaQuanhuyenTt() {
        return maQuanhuyenTt;
    }

    public void setMaQuanhuyenTt(String maQuanhuyenTt) {
        this.maQuanhuyenTt = maQuanhuyenTt;
    }

    public String getTenQuanhuyenTt() {
        return tenQuanhuyenTt;
    }

    public void setTenQuanhuyenTt(String tenQuanhuyenTt) {
        this.tenQuanhuyenTt = tenQuanhuyenTt;
    }

    public String getMaXaphuongTt() {
        return maXaphuongTt;
    }

    public void setMaXaphuongTt(String maXaphuongTt) {
        this.maXaphuongTt = maXaphuongTt;
    }

    public String getTenXaphuongTt() {
        return tenXaphuongTt;
    }

    public void setTenXaphuongTt(String tenXaphuongTt) {
        this.tenXaphuongTt = tenXaphuongTt;
    }

    public Long getHkttKvi() {
        return hkttKvi;
    }

    public void setHkttKvi(Long hkttKvi) {
        this.hkttKvi = hkttKvi;
    }

    public Long getHkttDbkk() {
        return hkttDbkk;
    }

    public void setHkttDbkk(Long hkttDbkk) {
        this.hkttDbkk = hkttDbkk;
    }

    public String getMaTinhtpThpt() {
        return maTinhtpThpt;
    }

    public void setMaTinhtpThpt(String maTinhtpThpt) {
        this.maTinhtpThpt = maTinhtpThpt;
    }

    public String getTenTinhtpThpt() {
        return tenTinhtpThpt;
    }

    public void setTenTinhtpThpt(String tenTinhtpThpt) {
        this.tenTinhtpThpt = tenTinhtpThpt;
    }

    public String getMaQuanhuyenThpt() {
        return maQuanhuyenThpt;
    }

    public void setMaQuanhuyenThpt(String maQuanhuyenThpt) {
        this.maQuanhuyenThpt = maQuanhuyenThpt;
    }

    public String getTenQuanhuyenThpt() {
        return tenQuanhuyenThpt;
    }

    public void setTenQuanhuyenThpt(String tenQuanhuyenThpt) {
        this.tenQuanhuyenThpt = tenQuanhuyenThpt;
    }

    public String getMaThpt() {
        return maThpt;
    }

    public void setMaThpt(String maThpt) {
        this.maThpt = maThpt;
    }

    public String getTenThpt() {
        return tenThpt;
    }

    public void setTenThpt(String tenThpt) {
        this.tenThpt = tenThpt;
    }

    public String getTenLop12() {
        return tenLop12;
    }

    public void setTenLop12(String tenLop12) {
        this.tenLop12 = tenLop12;
    }

    public String getSdtThisinh() {
        return sdtThisinh;
    }

    public void setSdtThisinh(String sdtThisinh) {
        this.sdtThisinh = sdtThisinh;
    }

    public String getEmailThisinh() {
        return emailThisinh;
    }

    public void setEmailThisinh(String emailThisinh) {
        this.emailThisinh = emailThisinh;
    }

    public String getThongtinLienhe() {
        return thongtinLienhe;
    }

    public void setThongtinLienhe(String thongtinLienhe) {
        this.thongtinLienhe = thongtinLienhe;
    }

    public Long getXettuyenDhcd() {
        return xettuyenDhcd;
    }

    public void setXettuyenDhcd(Long xettuyenDhcd) {
        this.xettuyenDhcd = xettuyenDhcd;
    }

    public Long getMaPhanloaiThisinh() {
        return maPhanloaiThisinh;
    }

    public void setMaPhanloaiThisinh(Long maPhanloaiThisinh) {
        this.maPhanloaiThisinh = maPhanloaiThisinh;
    }

    public String getTenPhanloaiThisinh() {
        return tenPhanloaiThisinh;
    }

    public void setTenPhanloaiThisinh(String tenPhanloaiThisinh) {
        this.tenPhanloaiThisinh = tenPhanloaiThisinh;
    }

    public String getMaNoiDkdt() {
        return maNoiDkdt;
    }

    public void setMaNoiDkdt(String maNoiDkdt) {
        this.maNoiDkdt = maNoiDkdt;
    }

    public String getTenNoiDkdt() {
        return tenNoiDkdt;
    }

    public void setTenNoiDkdt(String tenNoiDkdt) {
        this.tenNoiDkdt = tenNoiDkdt;
    }

    public List<TableRegisSubjectDomain> getLstSubjects() {
        return lstSubjects;
    }

    public void setLstSubjects(List<TableRegisSubjectDomain> lstSubjects) {
        this.lstSubjects = lstSubjects;
    }

    public String getChungchiNgoaingu() {
        return chungchiNgoaingu;
    }

    public void setChungchiNgoaingu(String chungchiNgoaingu) {
        this.chungchiNgoaingu = chungchiNgoaingu;
    }

    public String getDiemthiChungchiNn() {
        return diemthiChungchiNn;
    }

    public void setDiemthiChungchiNn(String diemthiChungchiNn) {
        this.diemthiChungchiNn = diemthiChungchiNn;
    }

    public List<TableRegisSubXtnDomain> getLstMonhocXtn() {
        return lstMonhocXtn;
    }

    public void setLstMonhocXtn(List<TableRegisSubXtnDomain> lstMonhocXtn) {
        this.lstMonhocXtn = lstMonhocXtn;
    }

    public String getMaDtUutien() {
        return maDtUutien;
    }

    public void setMaDtUutien(String maDtUutien) {
        this.maDtUutien = maDtUutien;
    }

    public String getTenDtUutien() {
        return tenDtUutien;
    }

    public void setTenDtUutien(String tenDtUutien) {
        this.tenDtUutien = tenDtUutien;
    }

    public String getMaKhuvucTs() {
        return maKhuvucTs;
    }

    public void setMaKhuvucTs(String maKhuvucTs) {
        this.maKhuvucTs = maKhuvucTs;
    }

    public String getTenKhuvucTs() {
        return tenKhuvucTs;
    }

    public void setTenKhuvucTs(String tenKhuvucTs) {
        this.tenKhuvucTs = tenKhuvucTs;
    }

    public String getNamTotnghiep() {
        return namTotnghiep;
    }

    public void setNamTotnghiep(String namTotnghiep) {
        this.namTotnghiep = namTotnghiep;
    }

    public String getMaLienthong() {
        return maLienthong;
    }

    public void setMaLienthong(String maLienthong) {
        this.maLienthong = maLienthong;
    }

    public String getTenLienthong() {
        return tenLienthong;
    }

    public void setTenLienthong(String tenLienthong) {
        this.tenLienthong = tenLienthong;
    }

    public List<TableRegisExamDomain> getLstExam() {
        return lstExam;
    }

    public void setLstExam(List<TableRegisExamDomain> lstExam) {
        this.lstExam = lstExam;
    }

    public List<TableRegisAttachmentsDomain> getLstDinhkem() {
        return lstDinhkem;
    }

    public void setLstDinhkem(List<TableRegisAttachmentsDomain> lstDinhkem) {
        this.lstDinhkem = lstDinhkem;
    }
}
