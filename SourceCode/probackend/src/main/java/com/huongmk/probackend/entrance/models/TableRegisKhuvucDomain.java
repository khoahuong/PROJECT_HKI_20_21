package com.huongmk.probackend.entrance.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

/**
 * @author HuongMK
 */
@Entity
@Table(name = "TABLE_REGIS_AREA", schema = "ENTRANCE_REGIS")
public class TableRegisKhuvucDomain {
    @Id
    @NotNull
    @Column(name = "ID")
    private Long id;
    @Size(max = 50)
    @Column(name = "MA_SO_GDDT")
    private String maSoGddt;
    @Column(name = "ID_KHUVUC")
    private Long idKhuvuc;

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

    public Long getIdKhuvuc() {
        return idKhuvuc;
    }

    public void setIdKhuvuc(Long idKhuvuc) {
        this.idKhuvuc = idKhuvuc;
    }
}
