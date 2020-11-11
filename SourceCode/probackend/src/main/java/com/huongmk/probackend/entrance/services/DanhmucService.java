package com.huongmk.probackend.entrance.services;

import com.huongmk.probackend.entrance.models.*;

import java.util.List;

/**
 * @author HuongMK
 */
public interface DanhmucService {
    List<TableCateStatusDomain> getAllStatus();

    List<TableCateProvinceDomain> getDmTinhthanh();

    List<TableCateDistrictDomain> getDmQuanhuyen(Long idProvince);

    List<TableCateWardsDomain> getDmXaphuong(Long idDistrict);

    List<TableCateSchoolDomain> getDmTruongThpt(Long idDistrict);

    List<TableCateSoGddtDomain> getDmSogd();

    List<TableCateSubjectsDomain> getDmMonthiBaoluu();

    List<TableCateDoituongUutienDomain> getDmDoituongUutien();

    List<TableCateKhuvucTsDomain> getDmKhuvucTs();
}
