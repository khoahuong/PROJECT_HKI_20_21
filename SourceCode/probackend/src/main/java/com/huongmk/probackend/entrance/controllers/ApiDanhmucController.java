package com.huongmk.probackend.entrance.controllers;

import com.huongmk.probackend.entrance.models.TableCateStatusDomain;
import com.huongmk.probackend.entrance.services.DanhmucService;
import com.huongmk.probackend.helper.ExceptionLog;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.concurrent.ConcurrentHashMap;

/**
 * @author HuongMK
 */
@RestController
@RequestMapping("api/danhmuc")
public class ApiDanhmucController {

    @Autowired
    private DanhmucService dmService;

    @RequestMapping(value = "/trangthai", method = RequestMethod.GET)
    public ResponseEntity<?> getStatus(){
        ConcurrentHashMap<String, Object> value = new ConcurrentHashMap<>();
        List<TableCateStatusDomain> listStatus;
        try {
            listStatus = dmService.getAllStatus();
            value.put("list", listStatus);
        } catch (Exception e) {
            value.put("errors", ExceptionLog.createMessage(e));
            return new ResponseEntity<Object>(value, HttpStatus.EXPECTATION_FAILED);
        }
        return new ResponseEntity<Object>(value, HttpStatus.OK);
    }
}
