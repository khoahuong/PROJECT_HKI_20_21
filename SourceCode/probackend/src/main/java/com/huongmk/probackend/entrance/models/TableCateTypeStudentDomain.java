package com.huongmk.probackend.entrance.models;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

/**
 * @author HuongMK
 */
@Entity
@Table(name = "TABLE_CATE_TYPE_STUDENT", schema = "ENTRANCE_REGIS")
public class TableCateTypeStudentDomain {
    @Id
    @Basic(optional = false)
    @NotNull
    @Column(name = "ID")
    private Long id;
    @Column(name = "MA_LOAI_THISINH")
    private Long maLoaiThisinh;
    @Size(max = 255)
    @Column(name = "TEN_LOAI_THISINH")
    private String tenLoaiThisinh;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getMaLoaiThisinh() {
        return maLoaiThisinh;
    }

    public void setMaLoaiThisinh(Long maLoaiThisinh) {
        this.maLoaiThisinh = maLoaiThisinh;
    }

    public String getTenLoaiThisinh() {
        return tenLoaiThisinh;
    }

    public void setTenLoaiThisinh(String tenLoaiThisinh) {
        this.tenLoaiThisinh = tenLoaiThisinh;
    }
}
