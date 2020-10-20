package com.huongmk.probackend.entrance.models;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.Date;

/**
 * @author HuongMK
 */
@Entity
@Table(name = "TABLE_REGIS_EXAM", schema = "ENTRANCE_REGIS")
public class TableRegisExamDomain {
    @Id
    @NotNull
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "TABLE_REGIS_EXAM_SEQ")
    @SequenceGenerator(sequenceName = "TABLE_REGIS_EXAM_SEQ", schema = "ENTRANCE_REGIS", initialValue = 1, allocationSize = 1, name = "TABLE_REGIS_EXAM_SEQ")
    @Column(name = "ID_EXAM")
    private Long idExam;
    @Column(name = "ID_HOSO")
    private Long idHoso;
    @Size(max = 100)
    @Column(name = "MA_HOSO")
    private String maHoso;
    @Column(name = "THUTU_NV")
    private Long thutuNv;
    @Size(max = 50)
    @Column(name = "MA_TRUONG")
    private String maTruong;
    @Size(max = 255)
    @Column(name = "TEN_TRUONG")
    private String tenTruong;
    @Size(max = 50)
    @Column(name = "MA_NHOMNGANH")
    private String maNhomnganh;
    @Size(max = 255)
    @Column(name = "TEN_NHOMNGANH")
    private String tenNhomnganh;
    @Size(max = 50)
    @Column(name = "MA_TOHOP_MONXT")
    private String maTohopMonxt;
    @Size(max = 255)
    @Column(name = "TEN_TOHOP_MONXT")
    private String tenTohopMonxt;
    @Column(name = "HOATDONG")
    private Long hoatdong;
    @Column(name = "NGAY_TAO")
    @Temporal(TemporalType.DATE)
    private Date ngayTao;

    public Long getIdExam() {
        return idExam;
    }

    public void setIdExam(Long idExam) {
        this.idExam = idExam;
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

    public Long getThutuNv() {
        return thutuNv;
    }

    public void setThutuNv(Long thutuNv) {
        this.thutuNv = thutuNv;
    }

    public String getMaTruong() {
        return maTruong;
    }

    public void setMaTruong(String maTruong) {
        this.maTruong = maTruong;
    }

    public String getTenTruong() {
        return tenTruong;
    }

    public void setTenTruong(String tenTruong) {
        this.tenTruong = tenTruong;
    }

    public String getMaNhomnganh() {
        return maNhomnganh;
    }

    public void setMaNhomnganh(String maNhomnganh) {
        this.maNhomnganh = maNhomnganh;
    }

    public String getTenNhomnganh() {
        return tenNhomnganh;
    }

    public void setTenNhomnganh(String tenNhomnganh) {
        this.tenNhomnganh = tenNhomnganh;
    }

    public String getMaTohopMonxt() {
        return maTohopMonxt;
    }

    public void setMaTohopMonxt(String maTohopMonxt) {
        this.maTohopMonxt = maTohopMonxt;
    }

    public String getTenTohopMonxt() {
        return tenTohopMonxt;
    }

    public void setTenTohopMonxt(String tenTohopMonxt) {
        this.tenTohopMonxt = tenTohopMonxt;
    }

    public Long getHoatdong() {
        return hoatdong;
    }

    public void setHoatdong(Long hoatdong) {
        this.hoatdong = hoatdong;
    }

    public Date getNgayTao() {
        return ngayTao;
    }

    public void setNgayTao(Date ngayTao) {
        this.ngayTao = ngayTao;
    }
}
