package com.huongmk.probackend.common.file;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

/**
 * @author HuongMK
 */
public interface FileService {
    FileResponse saveFile(MultipartFile file);

    Resource downloadFile(String filePath);
}
