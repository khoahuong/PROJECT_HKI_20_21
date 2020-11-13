package com.huongmk.probackend.common.file;

/**
 * @author HuongMK
 */
public class FileResponse {
    private String fileName;
    private String fileCode;
    private String filePath;
    private String fileType;
    private Long fileSize;
    private String message;
    private boolean success;

    public FileResponse() {
    }

    public FileResponse(String message, boolean success) {
        this.message = message;
        this.success = success;
    }

    public FileResponse(String fileName, String fileCode, String filePath, String fileType, Long fileSize, String message, boolean success) {
        this.fileName = fileName;
        this.fileCode = fileCode;
        this.filePath = filePath;
        this.fileType = fileType;
        this.fileSize = fileSize;
        this.message = message;
        this.success = success;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getFileCode() {
        return fileCode;
    }

    public void setFileCode(String fileCode) {
        this.fileCode = fileCode;
    }

    public String getFilePath() {
        return filePath;
    }

    public void setFilePath(String filePath) {
        this.filePath = filePath;
    }

    public String getFileType() {
        return fileType;
    }

    public void setFileType(String fileType) {
        this.fileType = fileType;
    }

    public Long getFileSize() {
        return fileSize;
    }

    public void setFileSize(Long fileSize) {
        this.fileSize = fileSize;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }
}
