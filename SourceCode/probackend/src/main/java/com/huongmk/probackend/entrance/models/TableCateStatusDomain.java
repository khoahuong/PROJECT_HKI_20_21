package com.huongmk.probackend.entrance.models;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;

/**
 * @author HuongMK
 */
@Entity
@Table(name = "TABLE_CATE_STATUS", schema = "ENTRANCE_REGIS")
public class TableCateStatusDomain implements Serializable {
    @Id
    @Basic(optional = false)
    @NotNull
    @Column(name = "ID")
    private Long id;
    @Size(max = 50)
    @Column(name = "CODE_STATUS")
    private String codeStatus;
    @Size(max = 255)
    @Column(name = "NAME_STATUS")
    private String nameStatus;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCodeStatus() {
        return codeStatus;
    }

    public void setCodeStatus(String codeStatus) {
        this.codeStatus = codeStatus;
    }

    public String getNameStatus() {
        return nameStatus;
    }

    public void setNameStatus(String nameStatus) {
        this.nameStatus = nameStatus;
    }
}
