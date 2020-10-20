package com.huongmk.probackend.entrance.models;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.Date;

/**
 * @author HuongMK
 */
@Entity
@Table(name = "TABLE_REGIS_SUB_XTN", schema = "ENTRANCE_REGIS")
public class TableRegisSubXtnDomain {
    @Id
    @NotNull
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "TABLE_REGIS_SUB_XTN_SEQ")
    @SequenceGenerator(sequenceName = "TABLE_REGIS_SUB_XTN_SEQ", schema = "ENTRANCE_REGIS", initialValue = 1, allocationSize = 1, name = "TABLE_REGIS_SUB_XTN_SEQ")
    @Column(name = "ID_SUB_XTN")
    private Long idSubXtn;
    @Column(name = "ID_HOSO")
    private Long idHoso;
    @Size(max = 100)
    @Column(name = "MA_HOSO")
    private String maHoso;
    @Size(max = 20)
    @Column(name = "MA_MONTHI")
    private String maMonthi;
    @Size(max = 255)
    @Column(name = "TEN_MONTHI")
    private String tenMonthi;
    @Size(max = 255)
    @Column(name = "NOI_DUNG")
    private String noiDung;
    @Size(max = 5)
    @Column(name = "DIEM_MONTHI")
    private String diemMonthi;
    @Column(name = "NGAY_TAO")
    @Temporal(TemporalType.DATE)
    private Date ngayTao;
    @Column(name = "HOATDONG")
    private Long hoatdong;

    public Long getIdSubXtn() {
        return idSubXtn;
    }

    public void setIdSubXtn(Long idSubXtn) {
        this.idSubXtn = idSubXtn;
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

    public String getDiemMonthi() {
        return diemMonthi;
    }

    public void setDiemMonthi(String diemMonthi) {
        this.diemMonthi = diemMonthi;
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
