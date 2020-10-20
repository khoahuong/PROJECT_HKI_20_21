package com.huongmk.probackend.entrance.models;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

/**
 * @author HuongMK
 */
@Entity
@Table(name = "TABLE_CATE_DT_UUTIEN", schema = "ENTRANCE_REGIS")
public class TableCateDoituongUutienDomain {
    @Id
    @Basic(optional = false)
    @NotNull
    @Column(name = "ID")
    private Long id;
    @Size(max = 10)
    @Column(name = "MA_DOITUONG")
    private String maDoituong;
    @Size(max = 255)
    @Column(name = "TEN_DOITUONG")
    private String tenDoituong;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMaDoituong() {
        return maDoituong;
    }

    public void setMaDoituong(String maDoituong) {
        this.maDoituong = maDoituong;
    }

    public String getTenDoituong() {
        return tenDoituong;
    }

    public void setTenDoituong(String tenDoituong) {
        this.tenDoituong = tenDoituong;
    }
}
