package com.huongmk.probackend.entrance.services;

import com.huongmk.probackend.entrance.models.TableRegisContentDomain;
import com.huongmk.probackend.entrance.models.dtos.SendData;

/**
 * @author HuongMK
 */
public interface TableRegisContentService {
    void sendYcbsHoso(SendData sendData);

    void sendTchoiHs(SendData sendData);

    void sendDuyetHoso(SendData sendData);

    void yeucauXinsua(SendData sendData);

    TableRegisContentDomain getDataByIdHoso(Long idHoso, Long maTrangthai);

    void phanhoiXinsua(SendData sendData);

    void yeucauXinrut(SendData sendData);
}
