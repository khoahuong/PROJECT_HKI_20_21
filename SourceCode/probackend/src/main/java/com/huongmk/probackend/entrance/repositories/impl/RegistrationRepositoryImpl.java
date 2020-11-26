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

    @Override
    public Long countSearchRegisForAdmin(SearchRegisDto searchRegisDto, Long idKhuvuc) {
        StringBuilder sql = new StringBuilder("SELECT COUNT(1)");
        createQueryStrForAdmin(sql, searchRegisDto);
        Query query = manager.createNativeQuery(sql.toString());
        createQueryForAdmin(query, searchRegisDto, idKhuvuc);
        return (long) query.getSingleResult();
    }

    @Override
    public List<TableRegisDomain> searchRegisForAdmin(SearchRegisDto searchRegisDto, Long idKhuvuc) {
        int firstRecord = searchRegisDto.getPage() * searchRegisDto.getSize();
        StringBuilder sql = new StringBuilder("SELECT reg.*");
        createQueryStrForAdmin(sql, searchRegisDto);
        Query query = manager.createNativeQuery(sql.toString());
        createQueryForAdmin(query, searchRegisDto, idKhuvuc);
        query.setFirstResult(firstRecord);
        query.setMaxResults(searchRegisDto.getSize());
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

    private void createQueryStrForAdmin(StringBuilder sql, SearchRegisDto searchRegisDto) {
        sql.append(" FROM TABLE_REGISTRATION reg");
        sql.append(" INNER JOIN TABLE_REGIS_AREA ra");
        sql.append(" ON reg.MA_SO_GDDT = ra.MA_SO_GDDT");
        sql.append(" WHERE 1 = 1");
        if (searchRegisDto.getUserId() != null) {
            sql.append(" AND reg.USER_ID = :userId");
        }
        if (!StringUtils.isNullOrEmpty(searchRegisDto.getFileCode())) {
            sql.append(" AND upper(reg.MA_HOSO) like :fileCode");
        }
        if (searchRegisDto.getStatus() != null) {
            sql.append(" AND reg.MA_TRANGTHAI = :status");
        }
        if (searchRegisDto.getDateFrom() != null) {
            sql.append(" AND TRUNC(reg.NGAY_GUI) >= TRUNC(:dateFrom)");
        }
        if (searchRegisDto.getDateTo() != null) {
            sql.append(" AND TRUNC(reg.NGAY_GUI) <= TRUNC(:dateTo)");
        }
        sql.append(" AND reg.MA_TRANGTHAI != :maTrangthai");
        sql.append(" AND ra.ID_KHUVUC = :idKhuvucQly");
        sql.append(" AND reg.HOATDONG = :hoatdong");
        sql.append(" ORDER BY reg.ID_HOSO DESC");
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

    private void createQueryForAdmin(Query query, SearchRegisDto searchRegisDto, Long idKhuvuc) {
        if (searchRegisDto.getUserId() != null) {
            query.setParameter("userId", searchRegisDto.getUserId());
        }
        if (!StringUtils.isNullOrEmpty(searchRegisDto.getFileCode())) {
            query.setParameter("fileCode", "%" + searchRegisDto.getFileCode().trim().toUpperCase() + "%");
        }
        if (searchRegisDto.getStatus() != null) {
            query.setParameter("status", searchRegisDto.getStatus());
        }
        if (searchRegisDto.getDateFrom() != null) {
            query.setParameter("dateFrom", searchRegisDto.getDateFrom());
        }
        if (searchRegisDto.getDateTo() != null) {
            query.setParameter("dateTo", searchRegisDto.getDateTo());
        }
        query.setParameter("maTrangthai", Constants.REGIS_STATUS.TAO_MOI);
        query.setParameter("idKhuvucQly", idKhuvuc);
        query.setParameter("hoatdong", Constants.STATUS.ACTIVE);
    }
}
