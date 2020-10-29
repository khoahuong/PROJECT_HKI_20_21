package com.huongmk.probackend.entrance.models;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

/**
 * @author HuongMK
 */
@Entity
@Table(name = "TABLE_CATE_WARDS", schema = "ENTRANCE_REGIS")
public class TableCateWardsDomain {
    @Id
    @Basic(optional = false)
    @NotNull
    @Column(name = "ID")
    private Long id;
    @Column(name = "DISTRICT_ID")
    private Long districtId;
    @Size(max = 255)
    @Column(name = "WARDS_CODE")
    private String wardsCode;
    @Size(max = 255)
    @Column(name = "WARDS_NAME")
    private String wardsName;
    @Size(max = 255)
    @Column(name = "TYPE_WARDS")
    private String typeWards;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getDistrictId() {
        return districtId;
    }

    public void setDistrictId(Long districtId) {
        this.districtId = districtId;
    }

    public String getWardsCode() {
        return wardsCode;
    }

    public void setWardsCode(String wardsCode) {
        this.wardsCode = wardsCode;
    }

    public String getWardsName() {
        return wardsName;
    }

    public void setWardsName(String wardsName) {
        this.wardsName = wardsName;
    }

    public String getTypeWards() {
        return typeWards;
    }

    public void setTypeWards(String typeWards) {
        this.typeWards = typeWards;
    }
}
