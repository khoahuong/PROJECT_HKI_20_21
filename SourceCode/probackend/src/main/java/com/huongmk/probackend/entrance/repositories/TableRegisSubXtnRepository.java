package com.huongmk.probackend.entrance.repositories;

import com.huongmk.probackend.entrance.models.TableRegisSubXtnDomain;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author HuongMK
 */
@Repository
public interface TableRegisSubXtnRepository extends JpaRepository<TableRegisSubXtnDomain, Long> {
    List<TableRegisSubXtnDomain> findByIdHosoAndHoatdong(Long idHoso, Long active);

    List<TableRegisSubXtnDomain> findByIdHosoAndHoatdongOrderByIdSubXtn(Long idHoso, Long active);
}
