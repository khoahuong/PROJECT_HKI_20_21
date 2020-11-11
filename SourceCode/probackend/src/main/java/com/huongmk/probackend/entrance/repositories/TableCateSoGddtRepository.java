package com.huongmk.probackend.entrance.repositories;

import com.huongmk.probackend.entrance.models.TableCateSoGddtDomain;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * @author HuongMK
 */
public interface TableCateSoGddtRepository extends JpaRepository<TableCateSoGddtDomain, Long> {
    List<TableCateSoGddtDomain> findByOrderByTenSoGddt();
}
