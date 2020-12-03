export class API_CONSTANT {
  public static API_ROOT = "http://localhost:9999/";
  // public static API_ROOT = "http://27.72.89.79:9768/probackend/";

  public static API_FILE = {
    UPLOAD_FILE: "file/uploadFile",
    UPLOAD_MULTI_FILES: "file/uploadMultiFile",
    DOWNLOAD: "file/downloadFile"
  };

  public static USERS = {
    CREATE_USER: "users/createUserAdmin",
    GET_INFO_USER: "api/users/getInfoUserAdmin"
  }

  public static REGIS = {
    SEARCH: "api/regis/searchRegisForAdmin",
    GET_DATA: "api/regis/getDataRegis"
  }

  public static STATUS = {
    GET_DATA_PROVINCE: "api/danhmuc/tinhthanh",
    GET_DATA_DISTRICT: "api/danhmuc/quanhuyen",
    GET_DATA_WARD: "api/danhmuc/xaphuong"
  };

}
