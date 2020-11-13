package com.huongmk.probackend.entrance.services.impl;

import com.huongmk.probackend.entrance.models.*;
import com.huongmk.probackend.entrance.repositories.*;
import com.huongmk.probackend.entrance.services.DanhmucService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author HuongMK
 */
@Service
public class DanhmucServiceImpl implements DanhmucService {

    @Autowired
    private TableCateStatusRepository statusRepo;

    @Autowired
    private TableCateProvinceRepository dmTinhthanhRepo;

    @Autowired
    private TableCateDistrictRepository dmQuanhuyenRepo;

    @Autowired
    private TableCateWardRepository dmXaphuongRepo;

    @Autowired
    private TableCateSchoolRepository dmTruongThptRepo;

    @Autowired
    private TableCateSoGddtRepository dmSogdRepo;

    @Autowired
    private TableCateSubjectsRepository dmSubjectRepo;

    @Autowired
    private TableCateDoituongUutienRepository dmDoituongRepo;

    @Autowired
    private TableCateKhuvucTsRepository dmKhuvucRepo;

    @Autowired
    private TableCateUniversityRepository dmDaihocRepo;

    @Override
    public List<TableCateStatusDomain> getAllStatus() {
        return statusRepo.findByOrderById();
    }

    @Override
    public List<TableCateProvinceDomain> getDmTinhthanh() {
        return dmTinhthanhRepo.findByOrderByProvinceName();
    }

    @Override
    public List<TableCateDistrictDomain> getDmQuanhuyen(Long idProvince) {
        return dmQuanhuyenRepo.findByProvinceIdOrderByDistrictName(idProvince);
    }

    @Override
    public List<TableCateWardsDomain> getDmXaphuong(Long idDistrict) {
        return dmXaphuongRepo.findByDistrictIdOrderByWardsName(idDistrict);
    }

    @Override
    public List<TableCateSchoolDomain> getDmTruongThpt(Long idDistrict) {
        return dmTruongThptRepo.findByDistrictIdOrderBySchoolName(idDistrict);
    }

    @Override
    public List<TableCateSoGddtDomain> getDmSogd() {
        return dmSogdRepo.findByOrderByTenSoGddt();
    }

    @Override
    public List<TableCateSubjectsDomain> getDmMonthiBaoluu() {
        return dmSubjectRepo.findByOrderByTenMonthi();
    }

    @Override
    public List<TableCateDoituongUutienDomain> getDmDoituongUutien() {
        return dmDoituongRepo.findAll();
    }

    @Override
    public List<TableCateKhuvucTsDomain> getDmKhuvucTs() {
        return dmKhuvucRepo.findAll();
    }

    @Override
    public List<TableCateUniversityDomain> getDmTruongDaihoc() {
        return dmDaihocRepo.findByOrderByTenTruongDhcd();
    }
}
