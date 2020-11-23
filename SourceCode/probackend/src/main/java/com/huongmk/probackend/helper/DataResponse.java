package com.huongmk.probackend.helper;

/**
 * @author HuongMK
 */
public class DataResponse {
    private Object data;
    private Long total;
    private boolean success;
    private String message;

    public DataResponse() {
    }

    public DataResponse(Object data, Long total, boolean success, String message) {
        this.data = data;
        this.total = total;
        this.success = success;
        this.message = message;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }

    public Long getTotal() {
        return total;
    }

    public void setTotal(Long total) {
        this.total = total;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
