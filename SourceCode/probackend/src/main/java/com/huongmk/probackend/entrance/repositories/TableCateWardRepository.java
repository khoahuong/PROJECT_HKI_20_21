package com.huongmk.probackend.entrance.repositories;

import com.huongmk.probackend.entrance.models.TableCateWardsDomain;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * @author HuongMK
 */
public interface TableCateWardRepository extends JpaRepository<TableCateWardsDomain, Long> {
    List<TableCateWardsDomain> findByDistrictIdOrderByWardsName(Long idDistrict);
}
