package com.huongmk.probackend.entrance.services;

import com.huongmk.probackend.entrance.models.TableCateDistrictDomain;
import com.huongmk.probackend.entrance.models.TableCateProvinceDomain;
import com.huongmk.probackend.entrance.models.TableCateStatusDomain;

import java.util.List;

/**
 * @author HuongMK
 */
public interface DanhmucService {
    List<TableCateStatusDomain> getAllStatus();

    List<TableCateProvinceDomain> getDmTinhthanh();

    List<TableCateDistrictDomain> getDmQuanhuyen(Long idProvince);
}
