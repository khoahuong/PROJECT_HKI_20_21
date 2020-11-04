package com.huongmk.probackend.entrance.controllers;

import com.huongmk.probackend.entrance.models.TableUsersDomain;
import com.huongmk.probackend.entrance.models.dtos.EmailConfirm;
import com.huongmk.probackend.entrance.models.dtos.RePassword;
import com.huongmk.probackend.entrance.services.UsersService;
import com.huongmk.probackend.helper.ExceptionLog;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.concurrent.ConcurrentHashMap;

/**
 * @author HuongMK
 */
@RestController
@RequestMapping("/users")
public class UsersController {

    @Autowired
    private UsersService userSer;

    @RequestMapping(value = "/create/", method = RequestMethod.POST)
    public ResponseEntity<?> createUsers(@RequestBody TableUsersDomain users) {
        ConcurrentHashMap<String, Object> value = new ConcurrentHashMap<>();
        Long num = null;
        try {
            num = userSer.createUser(users);
            value.put("data", num);
        } catch (Exception e) {
            value.put("errors", ExceptionLog.createMessage(e));
            return new ResponseEntity<Object>(value, HttpStatus.EXPECTATION_FAILED);
        }
        return new ResponseEntity<Object>(value, HttpStatus.OK);
    }

    @RequestMapping(value = "/getCodeConfirm", method = RequestMethod.POST)
    public ResponseEntity<?> getCodeConfirm(@RequestBody EmailConfirm email) {
        ConcurrentHashMap<String, Object> value = new ConcurrentHashMap<>();
        Boolean isSucces = false;
        try {
            isSucces = userSer.getCodeConfirm(email.getEmail());
            value.put("success", isSucces);
        } catch (Exception e) {
            value.put("errors", ExceptionLog.createMessage(e));
            return new ResponseEntity<Object>(value, HttpStatus.EXPECTATION_FAILED);
        }
        return new ResponseEntity<Object>(value, HttpStatus.OK);
    }

    @RequestMapping(value = "/rePassword", method = RequestMethod.POST)
    public ResponseEntity<?> replacePassword(@RequestBody RePassword rePassword) {
        ConcurrentHashMap<String, Object> value = new ConcurrentHashMap<>();
        Long num = null;
        try {
            num = userSer.replacePassword(rePassword.getEmail(), rePassword.getNewPassword(), rePassword.getConfirmCode());
            value.put("data", num);
        } catch (Exception e) {
            value.put("errors", ExceptionLog.createMessage(e));
            return new ResponseEntity<Object>(value, HttpStatus.EXPECTATION_FAILED);
        }
        return new ResponseEntity<Object>(value, HttpStatus.OK);
    }
}
