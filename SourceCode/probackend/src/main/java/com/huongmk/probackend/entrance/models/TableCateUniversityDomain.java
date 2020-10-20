package com.huongmk.probackend.entrance.models;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

/**
 * @author HuongMK
 */
@Entity
@Table(name = "TABLE_CATE_UNIVERSITY", schema = "ENTRANCE_REGIS")
public class TableCateUniversityDomain {
    @Id
    @Basic(optional = false)
    @NotNull
    @Column(name = "ID")
    private Long id;
    @Size(max = 50)
    @Column(name = "MA_TRUONG_DHCD")
    private String maTruongDhcd;
    @Size(max = 255)
    @Column(name = "TEN_TRUONG_DHCD")
    private String tenTruongDhcd;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMaTruongDhcd() {
        return maTruongDhcd;
    }

    public void setMaTruongDhcd(String maTruongDhcd) {
        this.maTruongDhcd = maTruongDhcd;
    }

    public String getTenTruongDhcd() {
        return tenTruongDhcd;
    }

    public void setTenTruongDhcd(String tenTruongDhcd) {
        this.tenTruongDhcd = tenTruongDhcd;
    }
}
