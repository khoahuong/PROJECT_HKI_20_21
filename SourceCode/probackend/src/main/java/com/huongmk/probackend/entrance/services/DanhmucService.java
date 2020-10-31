package com.huongmk.probackend.entrance.services;

import com.huongmk.probackend.entrance.models.TableCateStatusDomain;

import java.util.List;

/**
 * @author HuongMK
 */
public interface DanhmucService {
    List<TableCateStatusDomain> getAllStatus();
}
