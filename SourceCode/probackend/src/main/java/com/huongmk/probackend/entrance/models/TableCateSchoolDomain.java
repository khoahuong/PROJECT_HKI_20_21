package com.huongmk.probackend.entrance.models;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

/**
 * @author HuongMK
 */
@Entity
@Table(name = "TABLE_CATE_SCHOOL", schema = "ENTRANCE_REGIS")
public class TableCateSchoolDomain {
    @Id
    @Basic(optional = false)
    @NotNull
    @Column(name = "ID")
    private Long id;
    @Column(name = "DISTRICT_ID")
    private Long districtId;
    @Size(max = 255)
    @Column(name = "SCHOOL_CODE")
    private String schoolCode;
    @Size(max = 255)
    @Column(name = "SCHOOL_NAME")
    private String schoolName;
    @Size(max = 512)
    @Column(name = "FULL_ADDRESS")
    private String fullAddress;
    @Size(max = 255)
    @Column(name = "AREA")
    private String area;

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

    public String getSchoolCode() {
        return schoolCode;
    }

    public void setSchoolCode(String schoolCode) {
        this.schoolCode = schoolCode;
    }

    public String getSchoolName() {
        return schoolName;
    }

    public void setSchoolName(String schoolName) {
        this.schoolName = schoolName;
    }

    public String getFullAddress() {
        return fullAddress;
    }

    public void setFullAddress(String fullAddress) {
        this.fullAddress = fullAddress;
    }

    public String getArea() {
        return area;
    }

    public void setArea(String area) {
        this.area = area;
    }
}
