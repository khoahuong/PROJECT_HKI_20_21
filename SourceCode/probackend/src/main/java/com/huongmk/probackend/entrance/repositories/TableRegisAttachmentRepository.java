package com.huongmk.probackend.entrance.repositories;

import com.huongmk.probackend.entrance.models.TableRegisAttachmentsDomain;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author HuongMK
 */
@Repository
public interface TableRegisAttachmentRepository extends JpaRepository<TableRegisAttachmentsDomain, Long> {
    List<TableRegisAttachmentsDomain> findByIdHosoAndHoatdong(Long idHoso, Long active);

    List<TableRegisAttachmentsDomain> findByIdHosoAndHoatdongOrderByIdAttachment(Long idHoso, Long active);
}
