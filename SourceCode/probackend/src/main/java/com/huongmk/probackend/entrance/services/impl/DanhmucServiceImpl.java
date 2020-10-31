package com.huongmk.probackend.entrance.services.impl;

import com.huongmk.probackend.entrance.models.TableCateStatusDomain;
import com.huongmk.probackend.entrance.repositories.TableCateStatusRepository;
import com.huongmk.probackend.entrance.services.DanhmucService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author HuongMK
 */
@Service
public class DanhmucServiceImpl implements DanhmucService {

    @Autowired
    private TableCateStatusRepository statusRepo;

    @Override
    public List<TableCateStatusDomain> getAllStatus() {
        return statusRepo.findByOrderById();
    }
}
