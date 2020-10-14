package com.huongmk.probackend.helper;

import java.util.Collections;
import java.util.List;

/**
 * @author HuongMK
 * @param <T>
 */
public class ListJson<T> {

    @SuppressWarnings({"rawtypes"})
    public static final ListJson EMPTY_LIST = new ListJson<Object>(
            Collections.emptyList(), 0l);

    @SuppressWarnings("unchecked")
    public static final <T> ListJson<T> emptyList() {
        return EMPTY_LIST;
    }

    private List<T> list;
    private Long count;


    public ListJson() {
        this(null, null);
    }

    public ListJson(List<T> list, Long count) {
        this.list = list;
        this.count = count;
    }

    public ListJson(List<T> list, Long count, Long unreadCount) {
        this.list = list;
        this.count = count;
    }

    public List<T> getList() {
        return list;
    }

    public void setList(List<T> list) {
        this.list = list;
    }

    public Long getCount() {
        return count;
    }

    public void setCount(Long count) {
        this.count = count;
    }

}
