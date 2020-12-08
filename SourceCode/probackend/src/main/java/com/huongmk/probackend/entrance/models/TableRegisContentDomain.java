package com.huongmk.probackend.entrance.models;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.Date;

/**
 * @author HuongMK
 */
@Entity
@Table(name = "TABLE_REGIS_CONTENT", schema = "ENTRANCE_REGIS")
public class TableRegisContentDomain {
    @Id
    @NotNull
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "TABLE_REGIS_CONTENT_SEQ")
    @SequenceGenerator(sequenceName = "TABLE_REGIS_CONTENT_SEQ", schema = "ENTRANCE_REGIS", initialValue = 1, allocationSize = 1, name = "TABLE_REGIS_CONTENT_SEQ")
    @Column(name = "ID")
    private Long id;
    @Column(name = "ID_HOSO")
    private Long idHoso;
    @Size(max = 100)
    @Column(name = "MA_HOSO")
    private String maHoso;
    @Size(max = 2000)
    @Column(name = "NOIDUNG_YEUCAU")
    private String noidungYeucau; // noi dung tu thi sinh dang ký du tuyen gui di
    @Size(max = 2000)
    @Column(name = "NOIDUNG_PHANHOI")
    private String noidungPhanhoi; // noi dung tu bo giao duc gui ve
    @Column(name = "MA_TRANGTHAI")
    private Long maTrangthai;
    @Size(max = 255)
    @Column(name = "TEN_TRANGTHAI")
    private String tenTrangthai;
    @Column(name = "HOATDONG")
    private Long hoatdong;
    @Column(name = "NGAY_TAO")
    @Temporal(TemporalType.DATE)
    private Date ngayTao;

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

    public String getNoidungYeucau() {
        return noidungYeucau;
    }

    public void setNoidungYeucau(String noidungYeucau) {
        this.noidungYeucau = noidungYeucau;
    }

    public String getNoidungPhanhoi() {
        return noidungPhanhoi;
    }

    public void setNoidungPhanhoi(String noidungPhanhoi) {
        this.noidungPhanhoi = noidungPhanhoi;
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
