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
    GET_DATA_WARD: "api/danhmuc/xaphuong",
    GET_DATA_SCHOOL: "api/danhmuc/truongThpt",
    GET_DATA_GDDT: "api/danhmuc/sogd",
    GET_DATA_SUBJECTS: "api/danhmuc/dmMonthiBaoluu",
    GET_DATA_DOITUONG_UUTIEN: "api/danhmuc/dmDoituongUutien",
    GET_DATA_KHUVUC_TS: "api/danhmuc/dmKhuvucTs",
    GET_DATA_DHCD: "api/danhmuc/dmTruongDh",
    GET_DATA_DINHKEM: "api/danhmuc/dmDinhkem"
  };

}
