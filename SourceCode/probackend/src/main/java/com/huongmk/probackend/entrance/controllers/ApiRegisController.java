package com.huongmk.probackend.entrance.controllers;

import com.google.gson.Gson;
import com.huongmk.probackend.entrance.models.TableRegisDomain;
import com.huongmk.probackend.entrance.models.dtos.SearchRegisDto;
import com.huongmk.probackend.entrance.services.RegistrationService;
import com.huongmk.probackend.helper.DataResponse;
import com.huongmk.probackend.helper.ExceptionLog;
import com.huongmk.probackend.helper.ListJson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
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
        TableRegisDomain hoso = new TableRegisDomain();
        try {
            if (regisDomain != null) {
                hoso = registrationService.createRegis(regisDomain);
            }
            value.put("data", hoso);
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

    @RequestMapping(value = "/getDataRegis", method = RequestMethod.GET)
    public ResponseEntity<?> getDataRegistration(@RequestParam Long idHoso) {
        ConcurrentHashMap<String, Object> value = new ConcurrentHashMap<>();
        TableRegisDomain regis;
        try {
            regis = registrationService.getDataRegistration(idHoso);
            value.put("data", regis);
        } catch (Exception e) {
            value.put("errors", ExceptionLog.createMessage(e));
            return new ResponseEntity<Object>(value, HttpStatus.EXPECTATION_FAILED);
        }
        return new ResponseEntity<Object>(value, HttpStatus.OK);
    }

    @RequestMapping(value = "/updateRegis", method = RequestMethod.POST)
    public ResponseEntity<?> updateRegis(@RequestBody TableRegisDomain regisDomain) {
        ConcurrentHashMap<String, Object> value = new ConcurrentHashMap<>();
        TableRegisDomain hoso = new TableRegisDomain();
        try {
            if (regisDomain.getIdHoso() != null) {
                hoso = registrationService.updateRegis(regisDomain);
            }
            value.put("data", hoso);
        } catch (Exception e) {
            value.put("errors", ExceptionLog.createMessage(e));
            return new ResponseEntity<Object>(value, HttpStatus.EXPECTATION_FAILED);
        }
        return new ResponseEntity<Object>(value, HttpStatus.OK);
    }

    @RequestMapping(value = "/sendRegis", method = RequestMethod.POST)
    public ResponseEntity<?> sendRegis(@RequestBody TableRegisDomain regisDomain) {
        ConcurrentHashMap<String, Object> value = new ConcurrentHashMap<>();
        DataResponse data = new DataResponse();
        try {
            if (regisDomain != null) {
                data = registrationService.sendDataRegis(regisDomain);
            }
            value.put("data", data);
        } catch (Exception e) {
            value.put("errors", ExceptionLog.createMessage(e));
            return new ResponseEntity<Object>(value, HttpStatus.EXPECTATION_FAILED);
        }
        return new ResponseEntity<Object>(value, HttpStatus.OK);
    }

    @RequestMapping(value = "/searchRegisForAdmin", method = RequestMethod.GET)
    public ResponseEntity<?> searchRegisForAdmin(@RequestParam String searchDTO) {
        ConcurrentHashMap<String, Object> value = new ConcurrentHashMap<>();
        SearchRegisDto searchRegisDto = gson.fromJson(searchDTO, SearchRegisDto.class);
        ListJson<TableRegisDomain> lstHoso = new ListJson<>();
        boolean success = false;
        try {
            if (searchRegisDto.getUserId() != null) {
                lstHoso = registrationService.searchRegisForAdmin(searchRegisDto);
                if (lstHoso != null) {
                    success = true;
                }
            }
            value.put("data", lstHoso);
            value.put("success", success);
        } catch (Exception e) {
            value.put("errors", ExceptionLog.createMessage(e));
            return new ResponseEntity<Object>(value, HttpStatus.EXPECTATION_FAILED);
        }
        return new ResponseEntity<Object>(value, HttpStatus.OK);
    }

    @RequestMapping(value = "/getAllData", method = RequestMethod.GET)
    public ResponseEntity<?> getAllData(@RequestParam Long userId) {
        ConcurrentHashMap<String, Object> value = new ConcurrentHashMap<>();
        List<TableRegisDomain> lstRegis = new ArrayList<>();
        try {
            if (userId != null) {
                lstRegis = registrationService.getAllData(userId);
            }
            value.put("list", lstRegis);
        } catch (Exception e) {
            value.put("errors", ExceptionLog.createMessage(e));
            return new ResponseEntity<Object>(value, HttpStatus.EXPECTATION_FAILED);
        }
        return new ResponseEntity<Object>(value, HttpStatus.OK);
    }

    @RequestMapping(value = "/getAllDataForAdmin", method = RequestMethod.GET)
    public ResponseEntity<?> getAllDataForAdmin() {
        ConcurrentHashMap<String, Object> value = new ConcurrentHashMap<>();
        List<TableRegisDomain> lstRegis;
        try {
            lstRegis = registrationService.getAllDataForAdmin();
            value.put("list", lstRegis);
        } catch (Exception e) {
            value.put("errors", ExceptionLog.createMessage(e));
            return new ResponseEntity<Object>(value, HttpStatus.EXPECTATION_FAILED);
        }
        return new ResponseEntity<Object>(value, HttpStatus.OK);
    }
}
