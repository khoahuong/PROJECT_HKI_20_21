package com.huongmk.probackend.entrance.models;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

/**
 * @author HuongMK
 */
@Entity
@Table(name = "TABLE_CATE_TOHOP_XT", schema = "ENTRANCE_REGIS")
public class TableCateToHopXtDomain {
    @Id
    @Basic(optional = false)
    @NotNull
    @Column(name = "ID")
    private Long id;
    @Size(max = 50)
    @Column(name = "MA_TOHOP_MON")
    private String maTohopMon;
    @Size(max = 255)
    @Column(name = "TEN_TOHOP_MON")
    private String tenTohopMon;
    @Size(max = 255)
    @Column(name = "MON_THI")
    private String monThi;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMaTohopMon() {
        return maTohopMon;
    }

    public void setMaTohopMon(String maTohopMon) {
        this.maTohopMon = maTohopMon;
    }

    public String getTenTohopMon() {
        return tenTohopMon;
    }

    public void setTenTohopMon(String tenTohopMon) {
        this.tenTohopMon = tenTohopMon;
    }

    public String getMonThi() {
        return monThi;
    }

    public void setMonThi(String monThi) {
        this.monThi = monThi;
    }
}
