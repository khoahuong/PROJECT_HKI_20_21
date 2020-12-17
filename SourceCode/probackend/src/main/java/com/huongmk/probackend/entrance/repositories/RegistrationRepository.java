package com.huongmk.probackend.entrance.repositories;

import com.huongmk.probackend.entrance.models.TableRegisDomain;
import com.huongmk.probackend.entrance.repositories.custom.RegistrationRepoCustom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author HuongMK
 */
@Repository
public interface RegistrationRepository extends JpaRepository<TableRegisDomain, Long>, RegistrationRepoCustom {
    TableRegisDomain findByIdHosoAndUserIdAndHoatdong(Long idRegis, Long userId, Long active);

    TableRegisDomain findByIdHosoAndHoatdong(Long idHoso, Long active);

    List<TableRegisDomain> findByUserIdAndHoatdong(Long userId, Long active);

    List<TableRegisDomain> findByHoatdong(Long active);
}
