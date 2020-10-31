package com.huongmk.probackend.entrance.controllers;

import com.huongmk.probackend.entrance.models.TableUsersDomain;
import com.huongmk.probackend.entrance.services.UsersService;
import com.huongmk.probackend.helper.ExceptionLog;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.concurrent.ConcurrentHashMap;

/**
 * @author HuongMK
 */
@RestController
@RequestMapping("/api/users")
public class ApiUsersController {
    @Autowired
    private UsersService usersService;

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
}
