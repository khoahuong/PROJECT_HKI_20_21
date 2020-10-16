export class API_CONSTANT {
  public static API_ROOT = "http://localhost:9999/probackend/";

  public static API_FILE = {
    DOWNLOAD: "file/fileStore/",
    UPLOAD_MULTI_FILES: "file/uploadMultipleFiles",
    UPLOAD_FILE: "file/uploadFile"
  };

  public static API_USER = {
    INFO: "api/users/getUserInfo",
    SEARCH: "api/users/searchUsersAdmin",
    SAVE: "users/saveOrUpdate",
    GET_INFO: "api/users/getInfo"
  };
}
