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

    public interface DONVI {
        public static final String BGDDT = "Bộ giáo dục và đào tạo";
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

    public interface REGIS_STATUS {
        Long TAO_MOI = 0L;
        String TAO_MOI_STR = "Mới tạo";
        String CAP_NHAT_STR = "Cập nhật";
        Long CHO_PHE_DUYET = 1L;
        String CHO_PHE_DUYET_STR = "Chờ phê duyệt";
        Long DA_DUYET = 2L;
        String DA_DUYET_STR = "Đã phê duyệt";
        Long YC_BOSUNG = 3L;
        String YC_BOSUNG_STR = "Yêu cầu bổ sung hồ sơ";
        Long DA_BOSUNG = 4L;
        String DA_BOSUNG_STR = "Đã bổ sung hồ sơ";
        Long TC_HOSO = 5L;
        String TC_HOSO_STR = "Từ chối hồ sơ";
        Long RUT_HS = 6L;
        String RUT_HS_STR = "Đã rút hồ sơ";
        Long XIN_RUT_HS = 7L;
        String XIN_RUT_HS_STR = "Xin rút hồ sơ";
        Long DONGY_XINRUT = 8L;
        String DONGY_XINRUT_STR = "Đồng ý yêu cầu xin rút hồ sơ";
        Long TC_XINRUT = 9L;
        String TC_XINRUT_STR = "Từ chối yêu cầu xin rút hồ sơ";
        Long XINSUA_HS = 10L;
        String XINSUA_HS_STR = "Xin sửa hồ sơ";
        Long DONGY_XINSUA = 11L;
        String DONGY_XINSUA_STR = "Đồng ý xin sửa hồ sơ";
        Long TC_XINSUA = 12L;
        String TC_XINSUA_STR = "Từ chối xin sửa hồ sơ";
    }

    public interface FOLDER_FILE {
        public static final String folderFile = "file.upload-dir";
    }
}
