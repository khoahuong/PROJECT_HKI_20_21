export class API_CONSTANT {
  public static API_ROOT = "http://localhost:9999/";
  // public static API_ROOT = "http://27.72.89.79:9768/probackend/";

  public static API_FILE = {
    UPLOAD_FILE: "file/uploadFile",
    UPLOAD_MULTI_FILES: "file/uploadMultiFile",
    DOWNLOAD: "file/downloadFile"
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
    GET_DATA_KHUVUC_TS: "api/danhmuc/dmKhuvucTs",
    GET_DATA_DHCD: "api/danhmuc/dmTruongDh",
    GET_DATA_DINHKEM: "api/danhmuc/dmDinhkem"
  };

  public static REGISTRATION = {
    CREATE: "api/regis/createRegis",
    SEARCH: "api/regis/searchRegis",
    UPDATE: "api/regis/updateRegis",
    DELETE: "api/regis/deleteRegis",
    GET_DATA: "api/regis/getDataRegis",
    SEND_REGIS: "api/regis/sendRegis"
  };

  public static HISTORY = {
    SEARCH: "api/history/search"
  };

  public static SEND_DATA = {
    YC_XIN_SUA: "sendData/ycXinsua",
    YC_XIN_RUT: "sendData/ycXinrut"
  };
}
