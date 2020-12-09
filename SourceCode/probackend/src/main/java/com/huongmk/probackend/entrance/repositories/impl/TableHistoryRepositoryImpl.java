package com.huongmk.probackend.entrance.repositories.impl;

import com.huongmk.probackend.entrance.models.TableHistoryDomain;
import com.huongmk.probackend.entrance.models.dtos.SearchHisDto;
import com.huongmk.probackend.entrance.repositories.custom.TableHistoryRepoCustom;
import com.huongmk.probackend.util.Constants;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.List;

/**
 * @author HuongMK
 */
public class TableHistoryRepositoryImpl implements TableHistoryRepoCustom {

    @PersistenceContext
    private EntityManager manager;

    @Override
    public Long countSearchHis(SearchHisDto searchDto) {
        StringBuilder sql = new StringBuilder("SELECT COUNT(h)");
        createQueryStr(sql, searchDto);
        Query query = manager.createQuery(sql.toString());
        createQuery(query, searchDto);
        return (Long) query.getSingleResult();
    }

    @Override
    public List<TableHistoryDomain> searchDataHistory(SearchHisDto searchDto) {
        int firstRecord = searchDto.getPage() * searchDto.getSize();
        StringBuilder sql = new StringBuilder("SELECT h");
        createQueryStr(sql, searchDto);
        sql.append(" ORDER BY h.id DESC");
        Query query = manager.createQuery(sql.toString());
        createQuery(query, searchDto);
        query.setFirstResult(firstRecord);
        query.setMaxResults(searchDto.getSize());
        return query.getResultList();
    }

    @Override
    public List<TableHistoryDomain> searchHis(SearchHisDto searchDto) {
        int firstRe = searchDto.getPage() * searchDto.getSize();
        StringBuilder sql = new StringBuilder("SELECT h");
        createQueryStr(sql, searchDto);
        sql.append(" AND h.maTrangthai != :maTrangthai");
        sql.append(" ORDER BY h.id DESC");
        Query query = manager.createQuery(sql.toString());
        createQuery(query, searchDto);
        query.setParameter("maTrangthai", Constants.REGIS_STATUS.TAO_MOI);
        query.setFirstResult(firstRe);
        query.setMaxResults(searchDto.getSize());
        return query.getResultList();
    }

    @Override
    public Long countHis(SearchHisDto searchDto) {
        StringBuilder sql = new StringBuilder("SELECT COUNT(h)");
        createQueryStr(sql, searchDto);
        sql.append(" AND h.maTrangthai != :maTrangthai");
        Query query = manager.createQuery(sql.toString());
        createQuery(query, searchDto);
        query.setParameter("maTrangthai", Constants.REGIS_STATUS.TAO_MOI);
        return (Long) query.getSingleResult();
    }

    private void createQueryStr(StringBuilder sql, SearchHisDto searchDto) {
        sql.append(" FROM TableHistoryDomain h");
        sql.append(" WHERE 1 = 1");
        if (searchDto.getIdHoso() != null) {
            sql.append(" AND h.idHoso = :idHoso");
        }
        sql.append(" AND h.hoatdong = :hoatdong");

    }

    private void createQuery(Query query, SearchHisDto searchDto) {
        if (searchDto.getIdHoso() != null) {
            query.setParameter("idHoso", searchDto.getIdHoso());
        }
        query.setParameter("hoatdong", Constants.STATUS.ACTIVE);
    }
}
