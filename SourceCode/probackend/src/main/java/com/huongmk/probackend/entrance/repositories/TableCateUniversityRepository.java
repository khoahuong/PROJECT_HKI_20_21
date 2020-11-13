package com.huongmk.probackend.entrance.repositories;

import com.huongmk.probackend.entrance.models.TableCateUniversityDomain;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * @author HuongMK
 */
public interface TableCateUniversityRepository extends JpaRepository<TableCateUniversityDomain, Long> {
    List<TableCateUniversityDomain> findByOrderByTenTruongDhcd();
}
