package com.huongmk.probackend.entrance.services;

import com.huongmk.probackend.entrance.models.TableUsersDomain;

/**
 * @author HuongMK
 */
public interface UsersService {
    Long createUser(TableUsersDomain users);

    TableUsersDomain getUserInfo(String username, String password);
}
