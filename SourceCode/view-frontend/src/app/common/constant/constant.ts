export class CONSTANT {
  public static STATUS = [
    { id: 0, name: "Không hoạt động" },
    { id: 1, name: "Hoạt động" }
  ];

  public static TYPE_STUDENT = [
    { id: 0, name: "Công an, quân nhân" },
    { id: 1, name: "Học ở nước ngoài" },
    { id: 2, name: "Học ở trong nước" }
  ];

  public static CLASS_NAME = [
    { idSchool: null, idHoso: null, maHoso: '', tenKhoilop: 'Năm lớp 10', loaiThisinh: '', idTinh: '', idHuyen: '', idThpt: '', lstHuyen: [], lstThpt: [] },
    { idSchool: null, idHoso: null, maHoso: '', tenKhoilop: 'Năm lớp 11', loaiThisinh: '', idTinh: '', idHuyen: '', idThpt: '', lstHuyen: [], lstThpt: [] },
    { idSchool: null, idHoso: null, maHoso: '', tenKhoilop: 'Năm lớp 12', loaiThisinh: '', idTinh: '', idHuyen: '', idThpt: '', lstHuyen: [], lstThpt: [] }
  ];

  public static MON_NGOAINGU = [
    { id: 0, code: "N1", name: "Tiếng Anh" },
    { id: 1, code: "N2", name: "Tiếng Nga" },
    { id: 2, code: "N3", name: "Tiếng Pháp" },
    { id: 3, code: "N4", name: "Tiếng Trung Quốc" },
    { id: 4, code: "N5", name: "Tiếng Đức" },
    { id: 5, code: "N6", name: "Tiếng Nhật" }
  ];

  public static DA_TOTNGHIEP = [
    { id: 0, name: "Đã tốt nghiệp trung cấp" },
    { id: 1, name: "Đã tốt nghiệp cao đẳng" },
    { id: 2, name: "Đã tốt nghiệp đại học" }
  ];

  public static GENDER = [
    { id: 0, name: "Nam" },
    { id: 1, name: "Nữ" }
  ]

  public static PAGE = {
    SIZE2: 2,
    SIZE5: 5,
    SIZE10: 10
  }
}
