package com.huongmk.probackend.entrance.models.dtos;

/**
 * @author HuongMK
 */
public class SearchHisDto {
    private Long idHoso;
    private int page;
    private int size;

    public Long getIdHoso() {
        return idHoso;
    }

    public void setIdHoso(Long idHoso) {
        this.idHoso = idHoso;
    }

    public int getPage() {
        return page;
    }

    public void setPage(int page) {
        this.page = page;
    }

    public int getSize() {
        return size;
    }

    public void setSize(int size) {
        this.size = size;
    }
}
