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
@Table(name = "TABLE_REGIS_SCHOOL", schema = "ENTRANCE_REGIS")
public class TableRegisSchoolDomain {
    @Id
    @NotNull
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "TABLE_REGIS_SCHOOL_SEQ")
    @SequenceGenerator(sequenceName = "TABLE_REGIS_SCHOOL_SEQ", schema = "ENTRANCE_REGIS", initialValue = 1, allocationSize = 1, name = "TABLE_REGIS_SCHOOL_SEQ")
    @Column(name = "ID_SCHOOL")
    private Long idSchool;
    @Column(name = "ID_HOSO")
    private Long idHoso;
    @Size(max = 100)
    @Column(name = "MA_HOSO")
    private String maHoso;
    @Size(max = 100)
    @Column(name = "TEN_KHOILOP")
    private String tenKhoilop;
    @Column(name = "LOAI_THISinh")
    private Long loaiThisinh;
    @Column(name = "ID_TINH")
    private Long idTinh;
    @Column(name = "ID_HUYEN")
    private Long idHuyen;
    @Column(name = "ID_THPT")
    private Long idThpt;
    @Column(name = "HOAT_DONG")
    private Long hoatDong;
    @Column(name = "NGAY_TAO")
    @Temporal(TemporalType.DATE)
    private Date ngayTao;
    @Transient
    private List<TableCateDistrictDomain> lstHuyen;
    @Transient
    private List<TableCateSchoolDomain> lstThpt;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "ID_TINH", referencedColumnName = "ID", insertable = false, updatable = false)
    private TableCateProvinceDomain province;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "ID_HUYEN", referencedColumnName = "ID", insertable = false, updatable = false)
    private TableCateDistrictDomain district;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "ID_THPT", referencedColumnName = "ID", insertable = false, updatable = false)
    private TableCateSchoolDomain school;

    public Long getIdSchool() {
        return idSchool;
    }

    public void setIdSchool(Long idSchool) {
        this.idSchool = idSchool;
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

    public String getTenKhoilop() {
        return tenKhoilop;
    }

    public void setTenKhoilop(String tenKhoilop) {
        this.tenKhoilop = tenKhoilop;
    }

    public Long getLoaiThisinh() {
        return loaiThisinh;
    }

    public void setLoaiThisinh(Long loaiThisinh) {
        this.loaiThisinh = loaiThisinh;
    }

    public Long getIdTinh() {
        return idTinh;
    }

    public void setIdTinh(Long idTinh) {
        this.idTinh = idTinh;
    }

    public Long getIdHuyen() {
        return idHuyen;
    }

    public void setIdHuyen(Long idHuyen) {
        this.idHuyen = idHuyen;
    }

    public Long getIdThpt() {
        return idThpt;
    }

    public void setIdThpt(Long idThpt) {
        this.idThpt = idThpt;
    }

    public Long getHoatDong() {
        return hoatDong;
    }

    public void setHoatDong(Long hoatDong) {
        this.hoatDong = hoatDong;
    }

    public Date getNgayTao() {
        return ngayTao;
    }

    public void setNgayTao(Date ngayTao) {
        this.ngayTao = ngayTao;
    }

    public List<TableCateDistrictDomain> getLstHuyen() {
        return lstHuyen;
    }

    public void setLstHuyen(List<TableCateDistrictDomain> lstHuyen) {
        this.lstHuyen = lstHuyen;
    }

    public List<TableCateSchoolDomain> getLstThpt() {
        return lstThpt;
    }

    public void setLstThpt(List<TableCateSchoolDomain> lstThpt) {
        this.lstThpt = lstThpt;
    }

    public TableCateProvinceDomain getProvince() {
        return province;
    }

    public void setProvince(TableCateProvinceDomain province) {
        this.province = province;
    }

    public TableCateDistrictDomain getDistrict() {
        return district;
    }

    public void setDistrict(TableCateDistrictDomain district) {
        this.district = district;
    }

    public TableCateSchoolDomain getSchool() {
        return school;
    }

    public void setSchool(TableCateSchoolDomain school) {
        this.school = school;
    }
}
