package com.huongmk.probackend.entrance.services.impl;

import com.huongmk.probackend.entrance.models.TableRegisAttachmentsDomain;
import com.huongmk.probackend.entrance.repositories.TableRegisAttachmentRepository;
import com.huongmk.probackend.entrance.services.RegisAttachmentsService;
import com.huongmk.probackend.util.Constants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * @author HuongMK
 */
@Service
@Transactional
public class RegisAttachmentsServiceImpl implements RegisAttachmentsService {

    @Autowired
    private TableRegisAttachmentRepository regisAttachmentRepository;

    @Override
    public TableRegisAttachmentsDomain getDataDinhkem(Long idDinhkem) {
        return regisAttachmentRepository.findByIdAttachmentAndHoatdong(idDinhkem, Constants.STATUS.ACTIVE);
    }
}
