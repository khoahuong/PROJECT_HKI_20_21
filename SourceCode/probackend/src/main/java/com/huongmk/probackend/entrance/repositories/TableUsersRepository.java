package com.huongmk.probackend.entrance.repositories;

import com.huongmk.probackend.entrance.models.TableUsersDomain;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * @author HuongMK
 */
public interface TableUsersRepository extends JpaRepository<TableUsersDomain, Long> {
    TableUsersDomain findByUserNameAndIsActive(String userName, Long status);

    List<TableUsersDomain> findByIsActive(Long active);

    TableUsersDomain findByUserNameAndIsActiveAndIsRole(String username, Long active, Long userNormal);

    TableUsersDomain findByEmailAndIsActive(String email, Long active);
}
