package com.huongmk.probackend.entrance.repositories;

import com.huongmk.probackend.entrance.models.TableCateSchoolDomain;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * @author HuongMK
 */
public interface TableCateSchoolRepository extends JpaRepository<TableCateSchoolDomain, Long> {
    List<TableCateSchoolDomain> findByDistrictIdOrderBySchoolName(Long idDistrict);
}
