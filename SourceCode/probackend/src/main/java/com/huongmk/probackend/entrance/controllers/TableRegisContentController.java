package com.huongmk.probackend.entrance.controllers;

import com.huongmk.probackend.entrance.models.TableRegisContentDomain;
import com.huongmk.probackend.entrance.services.TableRegisContentService;
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
@RequestMapping("/regisContent")
public class TableRegisContentController {

    @Autowired
    private TableRegisContentService regisContentService;

    @RequestMapping(value = "/getData", method = RequestMethod.GET)
    public ResponseEntity<?> getDataContent(@RequestParam Long idHoso,
                                            @RequestParam Long maTrangthai) {
        ConcurrentHashMap<String, Object> value = new ConcurrentHashMap<>();
        TableRegisContentDomain regisContent = new TableRegisContentDomain();
        try {
            if (idHoso != null && maTrangthai != null) {
                regisContent = regisContentService.getDataByIdHoso(idHoso, maTrangthai);
            }
            value.put("data", regisContent);
        } catch (Exception e) {
            value.put("errors", ExceptionLog.createMessage(e));
            return new ResponseEntity<Object>(value, HttpStatus.EXPECTATION_FAILED);
        }
        return new ResponseEntity<Object>(value, HttpStatus.OK);
    }
}
