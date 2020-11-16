package com.huongmk.probackend.entrance.repositories;

import com.huongmk.probackend.entrance.models.TableRegisSchoolDomain;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author HuongMK
 */
@Repository
public interface TableRegisSchoolRepository extends JpaRepository<TableRegisSchoolDomain, Long> {
    List<TableRegisSchoolDomain> findByIdHosoAndHoatDong(Long idHoso, Long active);
}
