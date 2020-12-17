package com.huongmk.probackend.entrance.services;

import com.huongmk.probackend.entrance.models.TableRegisDomain;
import com.huongmk.probackend.entrance.models.dtos.SearchRegisDto;
import com.huongmk.probackend.helper.DataResponse;
import com.huongmk.probackend.helper.ListJson;

import java.util.List;

/**
 * @author HuongMK
 */
public interface RegistrationService {
    TableRegisDomain createRegis(TableRegisDomain regisDomain);

    ListJson<TableRegisDomain> searchRegistration(SearchRegisDto searchDto);

    void deleteRegis(Long idRegis, Long userId);

    TableRegisDomain getDataRegistration(Long idHoso);

    TableRegisDomain updateRegis(TableRegisDomain regisDomain);

    DataResponse sendDataRegis(TableRegisDomain regisDomain);

    ListJson<TableRegisDomain> searchRegisForAdmin(SearchRegisDto searchRegisDto);

    List<TableRegisDomain> getAllData(Long userId);

    List<TableRegisDomain> getAllDataForAdmin();
}
