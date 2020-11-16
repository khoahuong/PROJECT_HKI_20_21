package com.huongmk.probackend.entrance.repositories.custom;

import com.huongmk.probackend.entrance.models.TableRegisDomain;
import com.huongmk.probackend.entrance.models.dtos.SearchRegisDto;

import java.util.List;

/**
 * @author HuongMK
 */
public interface RegistrationRepoCustom {
    Long countSearch(SearchRegisDto searchDto);

    List<TableRegisDomain> searchRegis(SearchRegisDto searchDto);
}
