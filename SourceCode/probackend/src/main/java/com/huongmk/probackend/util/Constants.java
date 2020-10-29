package com.huongmk.probackend.util;

/**
 * @author HuongMK
 */
public class Constants {
    public interface STATUS {
        public static final Long ACTIVE = 1L; // hoat dong
        public static final Long INACTIVE = 0L; // khong hoat dong
    }
    public interface DELETED {
        public static final String YES = "Y";
        public static final String NO = "N";
    }
    public interface ROLE {
        public static final Long ADMIN = 0L; // quyen ADMIN
        public static final Long USER_NORMAL = 1L; // nguoi dung binh thuong
        public static final Long USER_MANAGER = 2L; // chuyen vien xu li
    }
}
