package com.huongmk.probackend.entrance.services.impl;

import com.huongmk.probackend.entrance.models.TableCateDistrictDomain;
import com.huongmk.probackend.entrance.models.TableCateProvinceDomain;
import com.huongmk.probackend.entrance.models.TableCateStatusDomain;
import com.huongmk.probackend.entrance.repositories.TableCateDistrictRepository;
import com.huongmk.probackend.entrance.repositories.TableCateProvinceRepository;
import com.huongmk.probackend.entrance.repositories.TableCateStatusRepository;
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
}
