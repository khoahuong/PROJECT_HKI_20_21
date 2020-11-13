package com.huongmk.probackend.util;

/**
 * @author HuongMK
 */
public class Constants {
    public interface STATUS {
        public static final Long ACTIVE = 1L; // hoat dong
        public static final Long INACTIVE = 0L; // khong hoat dong
    }
    public interface MAIL_CONFIG {
        public static final String FROM = "teamuet.entrance@gmail.com";
        public static final String SUBJECT = "[-----UET_SUPPORT_TEAM-----]";
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
    public interface GEN_CODE {
        public static final String ALPHA = "abcdefghijklmnopqrstuvwxyz";
        public static final String DIGITS = "0123456789";
    }

    public interface INFO {
        String SUCCESS_FILE = "Tải tệp đính kèm thành công";
    }
}
