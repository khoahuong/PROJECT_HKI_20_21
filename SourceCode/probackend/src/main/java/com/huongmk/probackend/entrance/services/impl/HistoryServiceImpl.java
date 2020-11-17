package com.huongmk.probackend.entrance.services.impl;

import com.huongmk.probackend.entrance.models.TableHistoryDomain;
import com.huongmk.probackend.entrance.models.dtos.SearchHisDto;
import com.huongmk.probackend.entrance.repositories.TableHistoryRepository;
import com.huongmk.probackend.entrance.services.HistoryService;
import com.huongmk.probackend.helper.ListJson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

/**
 * @author HuongMK
 */
@Service
@Transactional
public class HistoryServiceImpl implements HistoryService {

    @Autowired
    private TableHistoryRepository hisRepo;

    @Override
    public ListJson<TableHistoryDomain> searchData(SearchHisDto searchDto) {
        List<TableHistoryDomain> lstHistory = new ArrayList<>();
        Long countTotal = hisRepo.countSearchHis(searchDto);
        if (countTotal > 0) {
            lstHistory = hisRepo.searchDataHistory(searchDto);
        }
        return new ListJson<TableHistoryDomain>(lstHistory, (Long) countTotal);
    }
}
