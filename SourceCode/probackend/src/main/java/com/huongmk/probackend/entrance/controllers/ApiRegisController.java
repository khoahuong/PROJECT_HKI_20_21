package com.huongmk.probackend.entrance.controllers;

import com.google.gson.Gson;
import com.huongmk.probackend.entrance.models.TableRegisDomain;
import com.huongmk.probackend.entrance.models.dtos.SearchRegisDto;
import com.huongmk.probackend.entrance.services.RegistrationService;
import com.huongmk.probackend.helper.ExceptionLog;
import com.huongmk.probackend.helper.ListJson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.concurrent.ConcurrentHashMap;

/**
 * @author HuongMK
 */
@RestController
@RequestMapping("/api/regis")
public class ApiRegisController {

    Gson gson = new Gson();

    @Autowired
    private RegistrationService registrationService;

    @RequestMapping(value = "/createRegis", method = RequestMethod.POST)
    public ResponseEntity<?> createRegis(@RequestBody TableRegisDomain regisDomain) {
        ConcurrentHashMap<String, Object> value = new ConcurrentHashMap<>();
        boolean isSuccess = false;
        try {
            if (regisDomain != null) {
                registrationService.createRegis(regisDomain);
                isSuccess = true;
            }
            value.put("success", isSuccess);
        } catch (Exception e) {
            value.put("errors", ExceptionLog.createMessage(e));
            return new ResponseEntity<Object>(value, HttpStatus.EXPECTATION_FAILED);
        }
        return new ResponseEntity<Object>(value, HttpStatus.OK);
    }

    @RequestMapping(value = "/searchRegis", method = RequestMethod.GET)
    public ResponseEntity<?> searchRegis(@RequestParam String searchRegisDto) {
        ConcurrentHashMap<String, Object> value = new ConcurrentHashMap<>();
        SearchRegisDto searchDto = gson.fromJson(searchRegisDto, SearchRegisDto.class);
        ListJson<TableRegisDomain> lstRegis = new ListJson<>();
        boolean isSuccess = false;
        try {
            if (searchDto.getUserId() != null) {
                lstRegis = registrationService.searchRegistration(searchDto);
                if (lstRegis != null) {
                    isSuccess = true;
                    value.put("data", lstRegis);
                }
            }
            value.put("success", isSuccess);
        } catch (Exception e) {
            value.put("errors", ExceptionLog.createMessage(e));
            return new ResponseEntity<Object>(value, HttpStatus.EXPECTATION_FAILED);
        }
        return new ResponseEntity<Object>(value, HttpStatus.OK);
    }

    @RequestMapping(value = "/deleteRegis", method = RequestMethod.POST)
    public ResponseEntity<?> deleteRegis(@RequestParam Long idRegis,
                                         @RequestParam Long userId) {
        ConcurrentHashMap<String, Object> value = new ConcurrentHashMap<>();
        boolean isSuccess = false;
        try {
            if (idRegis != null) {
                registrationService.deleteRegis(idRegis, userId);
                isSuccess = true;
            }
            value.put("success", isSuccess);
        } catch (Exception e) {
            value.put("errors", ExceptionLog.createMessage(e));
            return new ResponseEntity<Object>(value, HttpStatus.EXPECTATION_FAILED);
        }
        return new ResponseEntity<Object>(value, HttpStatus.OK);
    }
}
