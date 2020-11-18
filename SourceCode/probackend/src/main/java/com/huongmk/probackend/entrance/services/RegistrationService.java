package com.huongmk.probackend.entrance.services;

import com.huongmk.probackend.entrance.models.TableRegisDomain;
import com.huongmk.probackend.entrance.models.dtos.SearchRegisDto;
import com.huongmk.probackend.helper.ListJson;

/**
 * @author HuongMK
 */
public interface RegistrationService {
    void createRegis(TableRegisDomain regisDomain);

    ListJson<TableRegisDomain> searchRegistration(SearchRegisDto searchDto);

    void deleteRegis(Long idRegis, Long userId);

    TableRegisDomain getDataRegistration(Long idHoso);

    boolean updateRegis(TableRegisDomain regisDomain);
}
