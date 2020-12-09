package com.huongmk.probackend.entrance.repositories.custom;

import com.huongmk.probackend.entrance.models.TableHistoryDomain;
import com.huongmk.probackend.entrance.models.dtos.SearchHisDto;

import java.util.List;

/**
 * @author HuongMK
 */
public interface TableHistoryRepoCustom {
    Long countSearchHis(SearchHisDto searchDto);

    List<TableHistoryDomain> searchDataHistory(SearchHisDto searchDto);

    List<TableHistoryDomain> searchHis(SearchHisDto searchDto);

    Long countHis(SearchHisDto searchDto);
}
