package com.huongmk.probackend.entrance.controllers;

import com.google.gson.Gson;
import com.huongmk.probackend.entrance.models.TableHistoryDomain;
import com.huongmk.probackend.entrance.models.dtos.SearchHisDto;
import com.huongmk.probackend.entrance.services.HistoryService;
import com.huongmk.probackend.helper.ExceptionLog;
import com.huongmk.probackend.helper.ListJson;
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
@RequestMapping("/api/history")
public class ApiHistoryController {
    Gson gson = new Gson();

    @Autowired
    private HistoryService hisService;

    @RequestMapping(value = "/search", method = RequestMethod.GET)
    public ResponseEntity<?> searchHis(@RequestParam String searchHisDto) {
        ConcurrentHashMap<String, Object> value = new ConcurrentHashMap<>();
        SearchHisDto searchDto = gson.fromJson(searchHisDto, SearchHisDto.class);
        ListJson<TableHistoryDomain> lstHistory = new ListJson<>();
        boolean isSuccess = false;
        try {
            if (searchDto.getIdHoso() != null) {
                lstHistory = hisService.searchData(searchDto);
                if (lstHistory != null) {
                    isSuccess = true;
                    value.put("data", lstHistory);
                }
            }
            value.put("success", isSuccess);
        } catch (Exception e) {
            value.put("errors", ExceptionLog.createMessage(e));
            return new ResponseEntity<Object>(value, HttpStatus.EXPECTATION_FAILED);
        }
        return new ResponseEntity<Object>(value, HttpStatus.OK);
    }
}
