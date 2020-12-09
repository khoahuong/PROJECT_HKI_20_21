export class API_CONSTANT {
  public static API_ROOT = "http://localhost:9999/";
  // public static API_ROOT = "http://27.72.89.79:9768/probackend/";

  public static API_FILE = {
    UPLOAD_FILE: "file/uploadFile",
    UPLOAD_MULTI_FILES: "file/uploadMultiFile",
    DOWNLOAD: "file/downloadFile"
  };

  public static ATTACHMENT_REGIS = {
    VIEW_FILE: "attachments/downloadFile/"
  };

  public static USERS = {
    CREATE_USER: "users/createUserAdmin",
    GET_INFO_USER: "api/users/getInfoUserAdmin"
  };

  public static REGIS = {
    SEARCH: "api/regis/searchRegisForAdmin",
    GET_DATA: "api/regis/getDataRegis"
  };

  public static STATUS = {
    GET_DATA_PROVINCE: "api/danhmuc/tinhthanh",
    GET_DATA_DISTRICT: "api/danhmuc/quanhuyen",
    GET_DATA_WARD: "api/danhmuc/xaphuong"
  };

  public static SEND_DATA = {
    YCBS_HS: "sendData/yeucauBosung",
    TUCHOI_HS: "sendData/tuchoiHoso",
    DUYET_HS: "sendData/duyetHoso",
    PHANHOI_XINSUA: "sendData/phanhoiXinsua",
    PHANHOI_XINRUT: "sendData/phanhoiXinrut"
  };

  public static REGIS_CONTENT = {
    GET_DATA: "regisContent/getData"
  }

  public static HISTORY = {
    SEARCH: "api/history/searchForAdmin"
  }
}
