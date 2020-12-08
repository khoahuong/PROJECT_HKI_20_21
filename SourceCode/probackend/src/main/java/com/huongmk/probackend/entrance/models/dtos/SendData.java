package com.huongmk.probackend.entrance.models.dtos;

import java.util.Date;

/**
 * @author HuongMK
 */
public class SendData {
    private Long idHoso;
    private String maHoso;
    private Date sendDate;
    private String content;
    private Long userId;
    private Long typeConfirm;

    public Long getIdHoso() {
        return idHoso;
    }

    public void setIdHoso(Long idHoso) {
        this.idHoso = idHoso;
    }

    public String getMaHoso() {
        return maHoso;
    }

    public void setMaHoso(String maHoso) {
        this.maHoso = maHoso;
    }

    public Date getSendDate() {
        return sendDate;
    }

    public void setSendDate(Date sendDate) {
        this.sendDate = sendDate;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getTypeConfirm() {
        return typeConfirm;
    }

    public void setTypeConfirm(Long typeConfirm) {
        this.typeConfirm = typeConfirm;
    }
}
