import { TableRegisAttachmentsDomain } from './TableRegisAttachmentsDomain';
import { TableRegisExamDomain } from './TableRegisExamDomain';
import { TableRegisSchoolDomain } from './TableRegisSchoolDomain';
import { TableRegisSubXtnDomain } from './TableRegisSubXtnDomain';

export class TableRegistrationDomain {
  idHoso: Number;
  chungchiNgoaingu: string;
  danToc: string;
  diemthiChungchiNn: string;
  emailThisinh: string;
  hkttDbkk: Number;
  hkttKvi: Number;
  hoatdong: Number;
  hotenThisinh: string;
  isNational: Number;
  maDtUutien: string;
  maGioitinh: Number;
  maHoso: string;
  maKhuvucTs: string;
  maLienthong: string;
  maNoiDkdt: string;
  maPhanloaiThisinh: Number;
  maQuanhuyenThpt: string;
  maQuanhuyenTt: string;
  maSoGddt: string;
  maThpt: string;
  maTinhthanhTt: string;
  maTinhtpThpt: string;
  maTrangthai: Number;
  maXaphuongTt: string;
  namTotnghiep: string;
  ngayGui: Date;
  ngayPheduyet: Date;
  ngaySinh: Date;
  ngayTao: Date;
  noiSinh: string;
  sdtThisinh: string;
  soCmnd: string;
  tenDtUutien: string;
  tenGioitinh: string;
  tenKhuvucTs: string;
  tenLienthong: string;
  tenLop12: string;
  tenNoiDkdt: string;
  tenPhanloaiThisinh: string;
  tenQuanhuyenThpt: string;
  tenQuanhuyenTt: string;
  tenSoGddt: string;
  tenThpt: string;
  tenTinhthanhTt: string;
  tenTinhtpThpt: string;
  tenTrangthai: string;
  tenXaphuongTt: string;
  thongtinLienhe: string;
  userId: Number;
  xettuyenDhcd: Number;
  maNoisinh: string;
  tenXaphuongTtKhac: string;
  chuongtrinhHocthisinh: Number;
  thisinhTudoTn: Number;
  monDialy: Number;
  monGdcd: Number;
  monHoahoc: Number;
  monKhtn: Number;
  monKhxh: Number;
  monLichsu: Number;
  monNgoaingu: Number;
  monNgoainguChitiet: string;
  monNguvan: Number;
  monSinhhoc: Number;
  monToan: Number;
  monVatly: Number;
  ngayCapnhat: Date;
  lstShool: Array<TableRegisSchoolDomain>;
  lstMonhocXtn: Array<TableRegisSubXtnDomain>;
  lstExam: Array<TableRegisExamDomain>;
  lstDinhkem: Array<TableRegisAttachmentsDomain>;
}
