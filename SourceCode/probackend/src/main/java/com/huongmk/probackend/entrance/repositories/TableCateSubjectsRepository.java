package com.huongmk.probackend.entrance.repositories;

import com.huongmk.probackend.entrance.models.TableCateSubjectsDomain;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * @author HuongMK
 */
public interface TableCateSubjectsRepository extends JpaRepository<TableCateSubjectsDomain, Long> {
    List<TableCateSubjectsDomain> findByOrderByTenMonthi();
}
