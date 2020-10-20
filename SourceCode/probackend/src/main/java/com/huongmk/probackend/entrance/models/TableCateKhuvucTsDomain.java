package com.huongmk.probackend.entrance.models;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

/**
 * @author HuongMK
 */
@Entity
@Table(name = "TABLE_CATE_KHUVUC_TS", schema = "ENTRANCE_REGIS")
public class TableCateKhuvucTsDomain {
    @Id
    @Basic(optional = false)
    @NotNull
    @Column(name = "ID")
    private Long id;
    @Size(max = 20)
    @Column(name = "MA_KHUVUC")
    private String maKhuvuc;
    @Size(max = 255)
    @Column(name = "TEN_KHUVUC")
    private String tenKhuvuc;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMaKhuvuc() {
        return maKhuvuc;
    }

    public void setMaKhuvuc(String maKhuvuc) {
        this.maKhuvuc = maKhuvuc;
    }

    public String getTenKhuvuc() {
        return tenKhuvuc;
    }

    public void setTenKhuvuc(String tenKhuvuc) {
        this.tenKhuvuc = tenKhuvuc;
    }
}
