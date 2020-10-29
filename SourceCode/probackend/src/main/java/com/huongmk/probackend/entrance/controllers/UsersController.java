package com.huongmk.probackend.entrance.controllers;

import com.huongmk.probackend.entrance.models.TableUsersDomain;
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
        }
        return new ResponseEntity<Object>(value, HttpStatus.OK);
    }
}
