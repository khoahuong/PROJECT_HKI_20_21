package com.huongmk.probackend.entrance.repositories;

import com.huongmk.probackend.entrance.models.TableRegisContentDomain;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author HuongMK
 */
@Repository
public interface TableRegisContentRepository extends JpaRepository<TableRegisContentDomain, Long> {
    List<TableRegisContentDomain> findByIdHosoAndMaTrangthaiAndHoatdongOrderByNgayTaoDesc(Long idHoso, Long maTrangthai, Long active);
}
