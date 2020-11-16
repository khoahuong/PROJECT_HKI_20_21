package com.huongmk.probackend.entrance.repositories.impl;

import com.huongmk.probackend.entrance.models.TableRegisDomain;
import com.huongmk.probackend.entrance.models.dtos.SearchRegisDto;
import com.huongmk.probackend.entrance.repositories.custom.RegistrationRepoCustom;
import com.huongmk.probackend.util.Constants;
import com.huongmk.probackend.util.StringUtils;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.List;

/**
 * @author HuongMK
 */
public class RegistrationRepositoryImpl implements RegistrationRepoCustom {

    @PersistenceContext
    private EntityManager manager;

    @Override
    public Long countSearch(SearchRegisDto searchDto) {
        StringBuilder sql = new StringBuilder("SELECT COUNT(reg)");
        createQueryStr(sql, searchDto);
        Query query = manager.createQuery(sql.toString());
        createQuery(query, searchDto);
        return (Long) query.getSingleResult();
    }

    @Override
    public List<TableRegisDomain> searchRegis(SearchRegisDto searchDto) {
        int firstRecord = searchDto.getPage() * searchDto.getSize();
        StringBuilder sql = new StringBuilder("SELECT reg");
        createQueryStr(sql, searchDto);
        Query query = manager.createQuery(sql.toString());
        createQuery(query, searchDto);
        query.setFirstResult(firstRecord);
        query.setMaxResults(searchDto.getSize());
        return query.getResultList();
    }

    private void createQueryStr(StringBuilder sql, SearchRegisDto searchDto) {
        sql.append(" FROM TableRegisDomain reg");
        sql.append(" WHERE 1 = 1");
        if (searchDto.getUserId() != null) {
            sql.append(" AND reg.userId = :userId");
        }
        if (!StringUtils.isNullOrEmpty(searchDto.getFileCode())) {
            sql.append(" AND upper(reg.maHoso) like :fileCode");
        }
        if (searchDto.getStatus() != null) {
            sql.append(" AND reg.maTrangthai = :status");
        }
        if (searchDto.getDateFrom() != null) {
            sql.append(" AND TRUNC(reg.ngayTao) >= TRUNC(:dateFrom)");
        }
        if (searchDto.getDateTo() != null) {
            sql.append(" AND TRUNC(reg.ngayTao) <= TRUNC(:dateTo)");
        }
        sql.append(" AND reg.hoatdong = :hoatdong");
        sql.append(" ORDER BY reg.ngayTao DESC");
    }

    private void createQuery(Query query, SearchRegisDto searchDto) {
        if (searchDto.getUserId() != null) {
            query.setParameter("userId", searchDto.getUserId());
        }
        if (!StringUtils.isNullOrEmpty(searchDto.getFileCode())) {
            query.setParameter("fileCode", "%" + searchDto.getFileCode().trim().toUpperCase() + "%");
        }
        if (searchDto.getStatus() != null) {
            query.setParameter("status", searchDto.getStatus());
        }
        if (searchDto.getDateFrom() != null) {
            query.setParameter("dateFrom", searchDto.getDateFrom());
        }
        if (searchDto.getDateTo() != null) {
            query.setParameter("dateTo", searchDto.getDateTo());
        }
        query.setParameter("hoatdong", Constants.STATUS.ACTIVE);
    }
}
