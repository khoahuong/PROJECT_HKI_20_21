package com.huongmk.probackend.entrance.repositories;

import com.huongmk.probackend.entrance.models.TableCateProvinceDomain;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * @author HuongMK
 */
public interface TableCateProvinceRepository extends JpaRepository<TableCateProvinceDomain, Long> {
    List<TableCateProvinceDomain> findByOrderByProvinceName();
}
