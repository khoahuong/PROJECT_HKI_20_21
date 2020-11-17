package com.huongmk.probackend.entrance.services;

import com.huongmk.probackend.entrance.models.TableHistoryDomain;
import com.huongmk.probackend.entrance.models.dtos.SearchHisDto;
import com.huongmk.probackend.helper.ListJson;

/**
 * @author HuongMK
 */
public interface HistoryService {
    ListJson<TableHistoryDomain> searchData(SearchHisDto searchDto);
}
