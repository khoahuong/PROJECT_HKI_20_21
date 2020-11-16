package com.huongmk.probackend.entrance.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

/**
 * @author HuongMK
 */
@Entity
@Table(name = "TABLE_CATE_ATTACHMENTS", schema = "ENTRANCE_REGIS")
public class TableCateAttachmentsDomain {
    @Id
    @NotNull
    @Column(name = "ID")
    private Long id;
    @Size(max = 512)
    @Column(name = "FILE_TYPE_NAME")
    private String fileTypeName;
    @Column(name = "FILE_TYPE_CODE")
    private Long fileTypeCode;
    @Column(name = "IS_REQUIRED")
    private Long isRequired;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFileTypeName() {
        return fileTypeName;
    }

    public void setFileTypeName(String fileTypeName) {
        this.fileTypeName = fileTypeName;
    }

    public Long getFileTypeCode() {
        return fileTypeCode;
    }

    public void setFileTypeCode(Long fileTypeCode) {
        this.fileTypeCode = fileTypeCode;
    }

    public Long getIsRequired() {
        return isRequired;
    }

    public void setIsRequired(Long isRequired) {
        this.isRequired = isRequired;
    }
}
