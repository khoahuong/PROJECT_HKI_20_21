package com.huongmk.probackend.entrance.controllers;

import com.huongmk.probackend.entrance.models.dtos.SendData;
import com.huongmk.probackend.entrance.services.TableRegisContentService;
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
@RequestMapping("/sendData")
public class SendController {

    @Autowired
    private TableRegisContentService regisContentService;

    @RequestMapping(value = "/yeucauBosung", method = RequestMethod.POST)
    public ResponseEntity<?> yeucauBosung(@RequestBody SendData sendData) {
        ConcurrentHashMap<String, Object> value = new ConcurrentHashMap<>();
        Boolean success = false;
        try {
            if (!"".equals(sendData.getContent())) {
                regisContentService.sendYcbsHoso(sendData);
                success = true;
            }
            value.put("success", success);
        } catch (Exception e) {
            value.put("errors", ExceptionLog.createMessage(e));
            return new ResponseEntity<Object>(value, HttpStatus.EXPECTATION_FAILED);
        }
        return new ResponseEntity<Object>(value, HttpStatus.OK);
    }

    @RequestMapping(value = "/tuchoiHoso", method = RequestMethod.POST)
    public ResponseEntity<?> tuchoiHoso(@RequestBody SendData sendData) {
        ConcurrentHashMap<String, Object> value = new ConcurrentHashMap<>();
        Boolean success = false;
        try {
            if (!"".equals(sendData.getContent())) {
                regisContentService.sendTchoiHs(sendData);
                success = true;
            }
            value.put("success", success);
        } catch (Exception e) {
            value.put("errors", ExceptionLog.createMessage(e));
            return new ResponseEntity<Object>(value, HttpStatus.EXPECTATION_FAILED);
        }
        return new ResponseEntity<Object>(value, HttpStatus.OK);
    }

    @RequestMapping(value = "/duyetHoso", method = RequestMethod.POST)
    public ResponseEntity<?> duyetHoso(@RequestBody SendData sendData) {
        ConcurrentHashMap<String, Object> value = new ConcurrentHashMap<>();
        Boolean success = false;
        try {
            if (sendData != null) {
                regisContentService.sendDuyetHoso(sendData);
                success = true;
            }
            value.put("success", success);
        } catch (Exception e) {
            value.put("errors", ExceptionLog.createMessage(e));
            return new ResponseEntity<Object>(value, HttpStatus.EXPECTATION_FAILED);
        }
        return new ResponseEntity<Object>(value, HttpStatus.OK);
    }

    @RequestMapping(value = "/ycXinsua", method = RequestMethod.POST)
    public ResponseEntity<?> ycXinsua(@RequestBody SendData sendData) {
        ConcurrentHashMap<String, Object> value = new ConcurrentHashMap<>();
        Boolean success = false;
        try {
            if (!"".equals(sendData.getContent())) {
                regisContentService.yeucauXinsua(sendData);
                success = true;
            }
            value.put("success", success);
        } catch (Exception e) {
            value.put("errors", ExceptionLog.createMessage(e));
            return new ResponseEntity<Object>(value, HttpStatus.EXPECTATION_FAILED);
        }
        return new ResponseEntity<Object>(value, HttpStatus.OK);
    }

    @RequestMapping(value = "/phanhoiXinsua", method = RequestMethod.POST)
    public ResponseEntity<?> phanhoiXinsua(@RequestBody SendData sendData) {
        ConcurrentHashMap<String, Object> value = new ConcurrentHashMap<>();
        Boolean success = false;
        try {
            if (sendData != null) {
                regisContentService.phanhoiXinsua(sendData);
                success = true;
            }
            value.put("success", success);
        } catch (Exception e) {
            value.put("errors", ExceptionLog.createMessage(e));
            return new ResponseEntity<Object>(value, HttpStatus.EXPECTATION_FAILED);
        }
        return new ResponseEntity<Object>(value, HttpStatus.OK);
    }

    @RequestMapping(value = "/ycXinrut", method = RequestMethod.POST)
    public ResponseEntity<?> ycXinrut(@RequestBody SendData sendData) {
        ConcurrentHashMap<String, Object> value = new ConcurrentHashMap<>();
        Boolean success = false;
        try {
            if (sendData != null) {
                regisContentService.yeucauXinrut(sendData);
                success = true;
            }
            value.put("success", success);
        } catch (Exception e) {
            value.put("errors", ExceptionLog.createMessage(e));
            return new ResponseEntity<Object>(value, HttpStatus.EXPECTATION_FAILED);
        }
        return new ResponseEntity<Object>(value, HttpStatus.OK);
    }
}
