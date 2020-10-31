package com.huongmk.probackend.config.oauth2;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.huongmk.probackend.common.RoleObject;
import com.huongmk.probackend.entrance.models.TableUsersDomain;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

/**
 * @author HuongMK
 */
public class UsersPrincipalOauth2 implements UserDetails {
    private String userName;

    @JsonIgnore
    private String passWord;

    private Collection<? extends GrantedAuthority> authorities;

    public UsersPrincipalOauth2(String userName, String passWord, Collection<? extends GrantedAuthority> authorities) {
        this.userName = userName;
        this.passWord = passWord;
        this.authorities = authorities;
    }

    public static UsersPrincipalOauth2 create(TableUsersDomain users) {

        ArrayList<RoleObject> lstRole = new ArrayList<RoleObject>();
        if (users.getIsRole() != null) {
            RoleObject role = new RoleObject(users.getIsRole());
            lstRole.add(role);
        }

        List<GrantedAuthority> authorities = lstRole.stream().map(role ->
                new SimpleGrantedAuthority(role.getId().toString())
        ).collect(Collectors.toList());

        return new UsersPrincipalOauth2(
                users.getUserName(),
                users.getPassWord(),
                authorities
        );
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.authorities;
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
