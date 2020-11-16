package com.huongmk.probackend.entrance.repositories;

import com.huongmk.probackend.entrance.models.TableRegisExamDomain;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author HuongMK
 */
@Repository
public interface TableRegisExamRepository extends JpaRepository<TableRegisExamDomain, Long> {
    List<TableRegisExamDomain> findByIdHosoAndHoatdong(Long idHoso, Long active);
}
