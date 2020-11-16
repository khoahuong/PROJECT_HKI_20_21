package com.huongmk.probackend.entrance.repositories;

import com.huongmk.probackend.entrance.models.TableHistoryDomain;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @author HuongMK
 */
@Repository
public interface TableHistoryRepository extends JpaRepository<TableHistoryDomain, Long> {
}
