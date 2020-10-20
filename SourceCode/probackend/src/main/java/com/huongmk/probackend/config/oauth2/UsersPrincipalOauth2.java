package com.huongmk.probackend.config.oauth2;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.huongmk.probackend.entrance.models.TableUsersDomain;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

/**
 * @author HuongMK
 */
public class UsersPrincipalOauth2 implements UserDetails {
    private String userName;

    @JsonIgnore
    private String passWord;

    private Long isRole;

    public UsersPrincipalOauth2(String userName, String passWord, Long isRole) {
        this.userName = userName;
        this.passWord = passWord;
        this.isRole = isRole;
    }

    public static UsersPrincipalOauth2 create(TableUsersDomain users) {
        return new UsersPrincipalOauth2(
                users.getUserName(),
                users.getPassWord(),
                users.getIsRole()
        );
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public String getPassword() {
        return this.passWord;
    }

    @Override
    public String getUsername() {
        return this.userName;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
