package com.huongmk.probackend.entrance.models;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.Date;

/**
 * @author HuongMK
 */
@Entity
@Table(name = "TABLE_HISTORY", schema = "ENTRANCE_REGIS")
public class TableHistoryDomain {
    @Id
    @NotNull
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "TABLE_HISTORY_SEQ")
    @SequenceGenerator(sequenceName = "TABLE_HISTORY_SEQ", schema = "ENTRANCE_REGIS", initialValue = 1, allocationSize = 1, name = "TABLE_HISTORY_SEQ")
    @Column(name = "ID")
    private Long id;
    @Column(name = "ID_HOSO")
    private Long idHoso;
    @Size(max = 100)
    @Column(name = "MA_HOSO")
    private String maHoso;
    @Size(max = 255)
    @Column(name = "NGUOI_GUI")
    private String nguoiGui;
    @Size(max = 255)
    @Column(name = "NGUOI_NHAN")
    private String nguoiNhan;
    @Size(max = 2000)
    @Column(name = "NOI_DUNG")
    private String noiDung;
    @Column(name = "MA_TRANGTHAI")
    private Long maTrangthai;
    @Size(max = 255)
    @Column(name = "TEN_TRANGTHAI")
    private String tenTrangthai;
    @Column(name = "NGAY_TAO")
    @Temporal(TemporalType.DATE)
    private Date ngayTao;
    @Column(name = "HOATDONG")
    private Long hoatdong;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public String getNguoiGui() {
        return nguoiGui;
    }

    public void setNguoiGui(String nguoiGui) {
        this.nguoiGui = nguoiGui;
    }

    public String getNguoiNhan() {
        return nguoiNhan;
    }

    public void setNguoiNhan(String nguoiNhan) {
        this.nguoiNhan = nguoiNhan;
    }

    public String getNoiDung() {
        return noiDung;
    }

    public void setNoiDung(String noiDung) {
        this.noiDung = noiDung;
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

    public Long getHoatdong() {
        return hoatdong;
    }

    public void setHoatdong(Long hoatdong) {
        this.hoatdong = hoatdong;
    }
}
