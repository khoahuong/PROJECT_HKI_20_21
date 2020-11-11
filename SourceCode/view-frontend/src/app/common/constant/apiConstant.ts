export class API_CONSTANT {
  public static API_ROOT = "http://localhost:9999/";
  // public static API_ROOT = "http://localhost:9999/probackend/";

  public static API_FILE = {
    DOWNLOAD: "file/fileStore/",
    UPLOAD_MULTI_FILES: "file/uploadMultipleFiles",
    UPLOAD_FILE: "file/uploadFile"
  };

  public static API_USER = {
    CREATE_USER: "users/create/",
    INFO: "api/users/getUserInfo",
    GET_CODE_CONFIRM: "users/getCodeConfirm",
    RE_PASSWORD: "users/rePassword",
    UPDATE_USER: "api/users/updateUser",
    GET_USER_BY_ID: "api/users/getUserById",
    API_RE_PASS: "api/users/rePassword",
    SEARCH: "api/users/searchUsersAdmin"
  };

  public static STATUS = {
    GET_DATA_STATUS: "api/danhmuc/trangthai",
    GET_DATA_PROVINCE: "api/danhmuc/tinhthanh",
    GET_DATA_DISTRICT: "api/danhmuc/quanhuyen",
    GET_DATA_WARD: "api/danhmuc/xaphuong",
    GET_DATA_SCHOOL: "api/danhmuc/truongThpt",
    GET_DATA_GDDT: "api/danhmuc/sogd",
    GET_DATA_SUBJECTS: "api/danhmuc/dmMonthiBaoluu",
    GET_DATA_DOITUONG_UUTIEN: "api/danhmuc/dmDoituongUutien",
    GET_DATA_KHUVUC_TS: "api/danhmuc/dmKhuvucTs"
  }
}
