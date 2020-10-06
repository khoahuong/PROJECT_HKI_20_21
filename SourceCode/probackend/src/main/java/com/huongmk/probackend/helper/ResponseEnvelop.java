package com.huongmk.probackend.helper;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.HashMap;

/**
 * @author HuongMK
 */
public class ResponseEnvelop extends HashMap<String, Object> {
    public ResponseEnvelop() {
        super();
    }

    public ResponseEnvelop(Object data) {
        this(Meta.OK, data);
    }

    public ResponseEnvelop(Meta meta, Object data) {
        super();
        this.setMeta(meta);
        this.setData(data);
    }

    public ResponseEnvelop(Meta meta) {
        this(meta, null);
    }

    public Meta getMeta() {
        return (Meta) this.get("meta");
    }

    public void setMeta(Meta meta) {
        if (meta == null) {
            if (containsKey("meta")) {
                remove("meta");
            }
            return;
        }
        this.put("meta", meta);
    }

    public Object getData() {
        return this.get("data");
    }

    public void setData(Object data) {
        if (data == null) {
            if (containsKey("data")) {
                remove("data");
            }
            return;
        }
        this.put("data", data);
    }

    public ResponseEntity<?> toResponseEntity() {
        Object data = getData();
        if (data == null) {
            data = getMeta();
        }
        return new ResponseEntity<Object>(data, HttpStatus.OK);
    }

    public ResponseEntity<?> toResponseEntity(HttpStatus status) {
        Object data = getData();
        if (data == null) {
            data = getMeta();
        }
        return new ResponseEntity<Object>(data, status);
    }
}
