package com.huongmk.probackend.entrance.models.dtos;

/**
 * @author HuongMK
 */
public class EmailConfirm {
    private String email;

    public EmailConfirm() {
    }

    public EmailConfirm(String email) {
        this.email = email;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
