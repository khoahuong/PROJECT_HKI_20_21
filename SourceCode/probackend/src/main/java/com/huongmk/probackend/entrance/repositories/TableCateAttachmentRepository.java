package com.huongmk.probackend.entrance.repositories;

import com.huongmk.probackend.entrance.models.TableCateAttachmentsDomain;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author HuongMK
 */
@Repository
public interface TableCateAttachmentRepository extends JpaRepository<TableCateAttachmentsDomain, Long> {
    List<TableCateAttachmentsDomain> findByOrderById();
}
