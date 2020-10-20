package com.huongmk.probackend.entrance.models;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

/**
 * @author HuongMK
 */
@Entity
@Table(name = "TABLE_CATE_MAJORS", schema = "ENTRANCE_REGIS")
public class TableCateMajorsDomain {
    @Id
    @Basic(optional = false)
    @NotNull
    @Column(name = "ID")
    private Long id;
    @Column(name = "UNIVERSITY_ID")
    private Long universityId;
    @Size(max = 50)
    @Column(name = "MA_NHOMNGANH")
    private String maNhomnganh;
    @Size(max = 255)
    @Column(name = "TEN_NHOMNGANH")
    private String tenNhomnganh;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUniversityId() {
        return universityId;
    }

    public void setUniversityId(Long universityId) {
        this.universityId = universityId;
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
}
