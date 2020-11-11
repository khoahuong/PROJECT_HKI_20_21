package com.huongmk.probackend.entrance.controllers;

import com.huongmk.probackend.entrance.models.*;
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

    @RequestMapping(value = "/xaphuong", method = RequestMethod.GET)
    public ResponseEntity<?> getDmXaphuong(@RequestParam Long idDistrict) {
        ConcurrentHashMap<String, Object> value = new ConcurrentHashMap<>();
        List<TableCateWardsDomain> lstXaphuong;
        try {
            lstXaphuong = dmService.getDmXaphuong(idDistrict);
            value.put("list", lstXaphuong);
        } catch (Exception e) {
            value.put("errors", ExceptionLog.createMessage(e));
            return new ResponseEntity<Object>(value, HttpStatus.EXPECTATION_FAILED);
        }
        return new ResponseEntity<Object>(value, HttpStatus.OK);
    }

    @RequestMapping(value = "/truongThpt", method = RequestMethod.GET)
    public ResponseEntity<?> getDmTruongThpt(@RequestParam Long idDistrict) {
        ConcurrentHashMap<String, Object> value = new ConcurrentHashMap<>();
        List<TableCateSchoolDomain> lstTruongThpt;
        try {
            lstTruongThpt = dmService.getDmTruongThpt(idDistrict);
            value.put("list", lstTruongThpt);
        } catch (Exception e) {
            value.put("errors", ExceptionLog.createMessage(e));
            return new ResponseEntity<Object>(value, HttpStatus.EXPECTATION_FAILED);
        }
        return new ResponseEntity<Object>(value, HttpStatus.OK);
    }

    @RequestMapping(value = "/sogd", method = RequestMethod.GET)
    public ResponseEntity<?> getDmSoGD() {
        ConcurrentHashMap<String, Object> value = new ConcurrentHashMap<>();
        List<TableCateSoGddtDomain> lstSoGd;
        try {
            lstSoGd = dmService.getDmSogd();
            value.put("list", lstSoGd);
        } catch (Exception e) {
            value.put("errors", ExceptionLog.createMessage(e));
            return new ResponseEntity<Object>(value, HttpStatus.EXPECTATION_FAILED);
        }
        return new ResponseEntity<Object>(value, HttpStatus.OK);
    }

    @RequestMapping(value = "/dmMonthiBaoluu", method = RequestMethod.GET)
    public ResponseEntity<?> getDmMonthiBaoluu() {
        ConcurrentHashMap<String, Object> value = new ConcurrentHashMap<>();
        List<TableCateSubjectsDomain> lstMonhoc;
        try {
            lstMonhoc = dmService.getDmMonthiBaoluu();
            value.put("list", lstMonhoc);
        } catch (Exception e) {
            value.put("errors", ExceptionLog.createMessage(e));
            return new ResponseEntity<Object>(value, HttpStatus.EXPECTATION_FAILED);
        }
        return new ResponseEntity<Object>(value, HttpStatus.OK);
    }

    @RequestMapping(value = "/dmDoituongUutien", method = RequestMethod.GET)
    public ResponseEntity<?> getDmDoituongUutien() {
        ConcurrentHashMap<String, Object> value = new ConcurrentHashMap<>();
        List<TableCateDoituongUutienDomain> lstDoituong;
        try {
            lstDoituong = dmService.getDmDoituongUutien();
            value.put("list", lstDoituong);
        } catch (Exception e) {
            value.put("errors", ExceptionLog.createMessage(e));
            return new ResponseEntity<Object>(value, HttpStatus.EXPECTATION_FAILED);
        }
        return new ResponseEntity<Object>(value, HttpStatus.OK);
    }

    @RequestMapping(value = "/dmKhuvucTs", method = RequestMethod.GET)
    public ResponseEntity<?> getDmKhuvucTs() {
        ConcurrentHashMap<String, Object> value = new ConcurrentHashMap<>();
        List<TableCateKhuvucTsDomain> lstKhuvuc;
        try {
            lstKhuvuc = dmService.getDmKhuvucTs();
            value.put("list", lstKhuvuc);
        } catch (Exception e) {
            value.put("errors", ExceptionLog.createMessage(e));
            return new ResponseEntity<Object>(value, HttpStatus.EXPECTATION_FAILED);
        }
        return new ResponseEntity<Object>(value, HttpStatus.OK);
    }
}
