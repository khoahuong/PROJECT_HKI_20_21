package com.huongmk.probackend.entrance.controllers;

import com.huongmk.probackend.entrance.models.TableUsersDomain;
import com.huongmk.probackend.entrance.models.dtos.RePassword;
import com.huongmk.probackend.entrance.services.UsersService;
import com.huongmk.probackend.helper.ExceptionLog;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.concurrent.ConcurrentHashMap;

/**
 * @author HuongMK
 */
@RestController
@RequestMapping("/api/users")
public class ApiUsersController {
    @Autowired
    private UsersService usersService;

    // ham check get data cua user nguoi dung dang ki ho so tuyen sinh
    @RequestMapping(value = "/getUserInfo", method = RequestMethod.GET)
    public ResponseEntity<?> getUserInfo(@RequestParam String username,
                                         @RequestParam String password) {
        ConcurrentHashMap<String, Object> value = new ConcurrentHashMap<>();
        TableUsersDomain usersDomain;
        try {
            usersDomain = usersService.getUserInfo(username, password);
            value.put("data", usersDomain);
        } catch (Exception e) {
            value.put("errors", ExceptionLog.createMessage(e));
            return new ResponseEntity<Object>(value, HttpStatus.EXPECTATION_FAILED);
        }
        return new ResponseEntity<Object>(value, HttpStatus.OK);
    }

    // get thong tin tai khoan admin
    @RequestMapping(value = "/getInfoUserAdmin", method = RequestMethod.GET)
    public ResponseEntity<?> getInfoUserAdmin(@RequestParam String username,
                                              @RequestParam String password) {
        ConcurrentHashMap<String, Object> value = new ConcurrentHashMap<>();
        TableUsersDomain user = new TableUsersDomain();
        try {
            if (!"".equals(username) && !"".equals(password)) {
                user = usersService.getInfoUserAdmin(username, password);
            }
            value.put("data", user);
        } catch (Exception e) {
            value.put("errors", ExceptionLog.createMessage(e));
            return new ResponseEntity<Object>(value, HttpStatus.EXPECTATION_FAILED);
        }
        return new ResponseEntity<Object>(value, HttpStatus.OK);
    }

    @RequestMapping(value = "/updateUser", method = RequestMethod.POST)
    public ResponseEntity<?> updateUserInfo(@RequestBody TableUsersDomain usersDomain) {
        ConcurrentHashMap<String, Object> value = new ConcurrentHashMap<>();
        Long num = null;
        try {
            num = usersService.updateUserInfo(usersDomain);
            value.put("data", num);
        } catch (Exception e) {
            value.put("errors", ExceptionLog.createMessage(e));
            return new ResponseEntity<Object>(value, HttpStatus.EXPECTATION_FAILED);
        }
        return new ResponseEntity<Object>(value, HttpStatus.OK);
    }

    @RequestMapping(value = "/getUserById", method = RequestMethod.GET)
    public ResponseEntity<?> getUserById(@RequestParam Long idUser) {
        ConcurrentHashMap<String, Object> value = new ConcurrentHashMap<>();
        TableUsersDomain usersDomain;
        try {
            usersDomain = usersService.getUserById(idUser);
            value.put("data", usersDomain);
        } catch (Exception e) {
            value.put("errors", ExceptionLog.createMessage(e));
            return new ResponseEntity<Object>(value, HttpStatus.EXPECTATION_FAILED);
        }
        return new ResponseEntity<Object>(value, HttpStatus.OK);
    }

    @RequestMapping(value = "/rePassword", method = RequestMethod.POST)
    public ResponseEntity<?> replacePasswordApi(@RequestBody RePassword passObject) {
        ConcurrentHashMap<String, Object> value = new ConcurrentHashMap<>();
        Long num = null;
        try {
            num = usersService.replacePasswordApi(passObject.getId(), passObject.getPassword(), passObject.getNewPassword());
            value.put("data", num);
        } catch (Exception e) {
            value.put("errors", ExceptionLog.createMessage(e));
            return new ResponseEntity<Object>(value, HttpStatus.EXPECTATION_FAILED);
        }
        return new ResponseEntity<Object>(value, HttpStatus.OK);
    }
}
