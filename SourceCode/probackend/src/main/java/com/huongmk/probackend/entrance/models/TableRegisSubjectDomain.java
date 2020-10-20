package com.huongmk.probackend.entrance.models;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.Date;

/**
 * @author HuongMK
 */
@Entity
@Table(name = "TABLE_REGIS_SUBJECTS", schema = "ENTRANCE_REGIS")
public class TableRegisSubjectDomain {
    @Id
    @NotNull
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "TABLE_REGIS_SUBJECTS_SEQ")
    @SequenceGenerator(sequenceName = "TABLE_REGIS_SUBJECTS_SEQ", schema = "ENTRANCE_REGIS", initialValue = 1, allocationSize = 1, name = "TABLE_REGIS_SUBJECTS_SEQ")
    @Column(name = "ID_SUBJECT")
    private Long idSubject;
    @Column(name = "ID_HOSO")
    private Long idHoso;
    @Size(max = 100)
    @Column(name = "MA_HOSO")
    private String maHoso;
    @Size(max = 20)
    @Column(name = "MA_DK_LOAITHI")
    private String maDkLoaithi;
    @Size(max = 255)
    @Column(name = "TEN_DK_LOAITHI")
    private String tenDkLoaithi;
    @Size(max = 20)
    @Column(name = "MA_MONTHI")
    private String maMonthi;
    @Size(max = 255)
    @Column(name = "TEN_MONTHI")
    private String tenMonthi;
    @Size(max = 255)
    @Column(name = "NOI_DUNG")
    private String noiDung;
    @Column(name = "NGAY_TAO")
    @Temporal(TemporalType.DATE)
    private Date ngayTao;
    @Column(name = "HOATDONG")
    private Long hoatdong;

    public Long getIdSubject() {
        return idSubject;
    }

    public void setIdSubject(Long idSubject) {
        this.idSubject = idSubject;
    }

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

    public String getMaDkLoaithi() {
        return maDkLoaithi;
    }

    public void setMaDkLoaithi(String maDkLoaithi) {
        this.maDkLoaithi = maDkLoaithi;
    }

    public String getTenDkLoaithi() {
        return tenDkLoaithi;
    }

    public void setTenDkLoaithi(String tenDkLoaithi) {
        this.tenDkLoaithi = tenDkLoaithi;
    }

    public String getMaMonthi() {
        return maMonthi;
    }

    public void setMaMonthi(String maMonthi) {
        this.maMonthi = maMonthi;
    }

    public String getTenMonthi() {
        return tenMonthi;
    }

    public void setTenMonthi(String tenMonthi) {
        this.tenMonthi = tenMonthi;
    }

    public String getNoiDung() {
        return noiDung;
    }

    public void setNoiDung(String noiDung) {
        this.noiDung = noiDung;
    }

    public Date getNgayTao() {
        return ngayTao;
    }

    public void setNgayTao(Date ngayTao) {
        this.ngayTao = ngayTao;
    }

    public Long getHoatdong() {
        return hoatdong;
    }

    public void setHoatdong(Long hoatdong) {
        this.hoatdong = hoatdong;
    }
}
