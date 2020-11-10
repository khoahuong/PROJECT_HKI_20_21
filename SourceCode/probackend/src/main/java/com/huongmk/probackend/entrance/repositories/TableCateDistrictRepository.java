package com.huongmk.probackend.entrance.repositories;

import com.huongmk.probackend.entrance.models.TableCateDistrictDomain;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * @author HuongMK
 */
public interface TableCateDistrictRepository extends JpaRepository<TableCateDistrictDomain, Long> {
    List<TableCateDistrictDomain> findByProvinceIdOrderByDistrictName(Long idProvince);
}
