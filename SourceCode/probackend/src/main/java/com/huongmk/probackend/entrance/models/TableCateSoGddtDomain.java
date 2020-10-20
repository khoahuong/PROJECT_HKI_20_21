package com.huongmk.probackend.entrance.models;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

/**
 * @author HuongMK
 */
@Entity
@Table(name = "TABLE_CATE_SO_GDDT", schema = "ENTRANCE_REGIS")
public class TableCateSoGddtDomain {
    @Id
    @NotNull
    @Basic(optional = false)
    @Column(name = "ID")
    private Long id;
    @Size(max = 5)
    @Column(name = "MA_SO_GDDT")
    private String maSoGddt;
    @Size(max = 255)
    @Column(name = "TEN_SO_GDDT")
    private String tenSoGddt;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMaSoGddt() {
        return maSoGddt;
    }

    public void setMaSoGddt(String maSoGddt) {
        this.maSoGddt = maSoGddt;
    }

    public String getTenSoGddt() {
        return tenSoGddt;
    }

    public void setTenSoGddt(String tenSoGddt) {
        this.tenSoGddt = tenSoGddt;
    }
}
