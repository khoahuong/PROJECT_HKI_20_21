package com.huongmk.probackend.entrance.repositories;

import com.huongmk.probackend.entrance.models.TableCateStatusDomain;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * @author HuongMK
 */
public interface TableCateStatusRepository extends JpaRepository<TableCateStatusDomain, Long> {
    List<TableCateStatusDomain> findByOrderById();
}
