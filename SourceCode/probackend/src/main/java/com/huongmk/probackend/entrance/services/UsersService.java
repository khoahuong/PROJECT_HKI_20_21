package com.huongmk.probackend.entrance.services;

import com.huongmk.probackend.entrance.models.TableUsersDomain;

/**
 * @author HuongMK
 */
public interface UsersService {
    Long createUser(TableUsersDomain users);

    TableUsersDomain getUserInfo(String username, String password);

    Boolean getCodeConfirm(String email);

    Long replacePassword(String email, String newPassword, String confirmCode);

    Long updateUserInfo(TableUsersDomain usersDomain);

    TableUsersDomain getUserById(Long idUser);

    Long replacePasswordApi(Long id, String password, String newPassword);
}
