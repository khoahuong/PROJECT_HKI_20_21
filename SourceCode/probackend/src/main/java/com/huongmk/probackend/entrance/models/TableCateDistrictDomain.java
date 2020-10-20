package com.huongmk.probackend.entrance.models;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

/**
 * @author HuongMK
 */
@Entity
@Table(name = "TABLE_CATE_DISTRICT", schema = "ENTRANCE_REGIS")
public class TableCateDistrictDomain {
    @Id
    @NotNull
    @Basic(optional = false)
    @Column(name = "ID")
    private Long id;
    @Column(name = "PROVINCE_ID")
    private Long provinceId;
    @Size(max = 255)
    @Column(name = "DISTRICT_CODE")
    private String districtCode;
    @Size(max = 255)
    @Column(name = "DISTRICT_NAME")
    private String districtName;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getProvinceId() {
        return provinceId;
    }

    public void setProvinceId(Long provinceId) {
        this.provinceId = provinceId;
    }

    public String getDistrictCode() {
        return districtCode;
    }

    public void setDistrictCode(String districtCode) {
        this.districtCode = districtCode;
    }

    public String getDistrictName() {
        return districtName;
    }

    public void setDistrictName(String districtName) {
        this.districtName = districtName;
    }
}
