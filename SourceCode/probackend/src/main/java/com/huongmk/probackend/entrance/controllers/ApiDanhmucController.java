package com.huongmk.probackend.entrance.controllers;

import com.huongmk.probackend.entrance.models.TableCateDistrictDomain;
import com.huongmk.probackend.entrance.models.TableCateProvinceDomain;
import com.huongmk.probackend.entrance.models.TableCateStatusDomain;
import com.huongmk.probackend.entrance.services.DanhmucService;
import com.huongmk.probackend.helper.ExceptionLog;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.concurrent.ConcurrentHashMap;

/**
 * @author HuongMK
 */
@RestController
@RequestMapping("/api/danhmuc")
public class ApiDanhmucController {

    @Autowired
    private DanhmucService dmService;

    @RequestMapping(value = "/trangthai", method = RequestMethod.GET)
    public ResponseEntity<?> getStatus() {
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

    @RequestMapping(value = "/tinhthanh", method = RequestMethod.GET)
    public ResponseEntity<?> getDmTinhthanh() {
        ConcurrentHashMap<String, Object> value = new ConcurrentHashMap<>();
        List<TableCateProvinceDomain> lstTinhthanh;
        try {
            lstTinhthanh = dmService.getDmTinhthanh();
            value.put("list", lstTinhthanh);
        } catch (Exception e) {
            value.put("errors", ExceptionLog.createMessage(e));
            return new ResponseEntity<Object>(value, HttpStatus.EXPECTATION_FAILED);
        }
        return new ResponseEntity<Object>(value, HttpStatus.OK);
    }

    @RequestMapping(value = "/quanhuyen", method = RequestMethod.GET)
    public ResponseEntity<?> getDmQuanhuyen(@RequestParam Long idProvince) {
        ConcurrentHashMap<String, Object> value = new ConcurrentHashMap<>();
        List<TableCateDistrictDomain> lstQuanhuyen;
        try {
            lstQuanhuyen = dmService.getDmQuanhuyen(idProvince);
            value.put("list", lstQuanhuyen);
        } catch (Exception e) {
            value.put("errors", ExceptionLog.createMessage(e));
            return new ResponseEntity<Object>(value, HttpStatus.EXPECTATION_FAILED);
        }
        return new ResponseEntity<Object>(value, HttpStatus.OK);
    }
}
