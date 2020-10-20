package com.huongmk.probackend.entrance.models;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.math.BigDecimal;
import java.util.Date;

/**
 * @author HuongMK
 */
@Entity
@Table(name = "TABLE_REGIS_ATTACHMENTS", schema = "ENTRANCE_REGIS")
public class TableRegisAttachmentsDomain {
    @Id
    @NotNull
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "TABLE_REGIS_ATTACHMENTS_SEQ")
    @SequenceGenerator(sequenceName = "TABLE_REGIS_ATTACHMENTS_SEQ", schema = "ENTRANCE_REGIS", initialValue = 1, allocationSize = 1, name = "TABLE_REGIS_ATTACHMENTS_SEQ")
    @Column(name = "ID_ATTACHMENT")
    private Long idAttachment;
    @Column(name = "ID_HOSO")
    private Long idHoso;
    @Size(max = 100)
    @Column(name = "MA_HOSO")
    private String maHoso;
    @Size(max = 255)
    @Column(name = "FILE_NAME")
    private String fileName;
    @Size(max = 512)
    @Column(name = "FILE_TYPE_NAME")
    private String fileTypeName;
    @Size(max = 255)
    @Column(name = "FILE_GUIID")
    private String fileGuiid;
    @Size(max = 512)
    @Column(name = "FILE_URL")
    private String fileUrl;
    @Column(name = "FILE_SIZE")
    private BigDecimal fileSize;
    @Column(name = "NGAY_TAO")
    @Temporal(TemporalType.DATE)
    private Date ngayTao;
    @Column(name = "HOATDONG")
    private Long hoatdong;

    public Long getIdAttachment() {
        return idAttachment;
    }

    public void setIdAttachment(Long idAttachment) {
        this.idAttachment = idAttachment;
    }

    public Long getIdHoso() {
        return idHoso;
    }

    public void setIdHoso(Long idHoso) {
        this.idHoso = idHoso;
    }

    public String getMaHoso() {
        return maHoso;
    }

    public void setMaHoso(String maHoso) {
        this.maHoso = maHoso;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getFileTypeName() {
        return fileTypeName;
    }

    public void setFileTypeName(String fileTypeName) {
        this.fileTypeName = fileTypeName;
    }

    public String getFileGuiid() {
        return fileGuiid;
    }

    public void setFileGuiid(String fileGuiid) {
        this.fileGuiid = fileGuiid;
    }

    public String getFileUrl() {
        return fileUrl;
    }

    public void setFileUrl(String fileUrl) {
        this.fileUrl = fileUrl;
    }

    public BigDecimal getFileSize() {
        return fileSize;
    }

    public void setFileSize(BigDecimal fileSize) {
        this.fileSize = fileSize;
    }

    public Date getNgayTao() {
        return ngayTao;
    }

    public void setNgayTao(Date ngayTao) {
        this.ngayTao = ngayTao;
    }

    public Long getHoatdong() {
        return hoatdong;
    }

    public void setHoatdong(Long hoatdong) {
        this.hoatdong = hoatdong;
    }
}
