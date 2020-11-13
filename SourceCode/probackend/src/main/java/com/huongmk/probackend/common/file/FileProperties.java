package com.huongmk.probackend.common.file;

import org.springframework.boot.context.properties.ConfigurationProperties;

/**
 * @author HuongMK
 */
@ConfigurationProperties(prefix = "file")
public class FileProperties {
    private String uploadDir;

    public String getUploadDir() {
        return uploadDir;
    }

    public void setUploadDir(String uploadDir) {
        this.uploadDir = uploadDir;
    }
}
