package com.huongmk.probackend.entrance.repositories;

import com.huongmk.probackend.entrance.models.TableUsersDomain;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author HuongMK
 */
public interface TableUsersRepository extends JpaRepository<TableUsersDomain, Long> {
    TableUsersDomain findByUserNameAndIsActive(String userName, Long status);
}
