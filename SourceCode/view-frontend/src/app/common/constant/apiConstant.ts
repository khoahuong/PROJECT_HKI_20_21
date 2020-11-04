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
    SEARCH: "api/users/searchUsersAdmin"
  };

  public static STATUS = {
    GET_DATA_STATUS: "api/danhmuc/trangthai"
  }
}
