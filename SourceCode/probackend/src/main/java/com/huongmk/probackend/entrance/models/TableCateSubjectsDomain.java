package com.huongmk.probackend.entrance.models;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

/**
 * @author HuongMK
 */
@Entity
@Table(name = "TABLE_CATE_SUBJECTS", schema = "ENTRANCE_REGIS")
public class TableCateSubjectsDomain {
    @Id
    @Basic(optional = false)
    @NotNull
    @Column(name = "ID")
    private Long id;
    @Column(name = "MA_MONTHI")
    private Long maMonthi;
    @Size(max = 255)
    @Column(name = "TEN_MONTHI")
    private String tenMonthi;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getMaMonthi() {
        return maMonthi;
    }

    public void setMaMonthi(Long maMonthi) {
        this.maMonthi = maMonthi;
    }

    public String getTenMonthi() {
        return tenMonthi;
    }

    public void setTenMonthi(String tenMonthi) {
        this.tenMonthi = tenMonthi;
    }
}
