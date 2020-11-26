package com.huongmk.probackend.entrance.models;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.Date;

/**
 * @author HuongMK
 */
@Entity
@Table(name = "TABLE_HISTORY_ADMIN", schema = "ENTRANCE_REGIS")
public class TableHistoryUsersAdminDomain {
    @Id
    @NotNull
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "TABLE_HISTORY_ADMIN_SEQ")
    @SequenceGenerator(sequenceName = "TABLE_HISTORY_ADMIN_SEQ", schema = "ENTRANCE_REGIS", initialValue = 1, allocationSize = 1, name = "TABLE_HISTORY_ADMIN_SEQ")
    @Column(name = "ID")
    private Long id;
    @Column(name = "USER_ID")
    private Long userId;
    @Size(max = 2000)
    @Column(name = "NOI_DUNG")
    private String noiDung;
    @Column(name = "NGAY_TAO")
    @Temporal(TemporalType.DATE)
    private Date ngayTao;
    @Column(name = "HOATDONG")
    private Long hoatdong;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getNoiDung() {
        return noiDung;
    }

    public void setNoiDung(String noiDung) {
        this.noiDung = noiDung;
    }

    public Date getNgayTao() {
        return ngayTao;
    }

    public void setNgayTao(Date ngayTao) {
        this.ngayTao = ngayTao;
    }

    public Long getHoatdong() {
        return hoatdong;
    }

    public void setHoatdong(Long hoatdong) {
        this.hoatdong = hoatdong;
    }
}
