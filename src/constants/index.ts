import { HttpException, HttpStatus } from '@nestjs/common';

export enum ResponseCode {
  Success = 0,
  Unexpected = 10000,
  ValidationError = 10001,
  IdValidationError = 10002,
  PasswordNotMatch = 20001,
  InvalidToken = 20002,
  ExpiredToken = 20003,
  UserNotFound = 20004,
  UserExisted = 20005,
  UserNotActive = 20006,
  ItemNotFound = 30000,
  SignatureNotFound = 30001,
  PermissionDenied = 50000,
  DigiSignQueueExisted = 30002,
  TemplateExportNotFound = 40000,
  NotEnoughKeyI18n = 40001,
  DataInUse = 50001,
}

export enum Lang {
  Vi = 'vi',
  En = 'en',
}

type MessageMap = Record<ResponseCode, Record<Lang, string>>;

export const messageMap: MessageMap = {
  [ResponseCode.Success]: {
    en: 'Success',
    vi: 'Thành công',
  },
  [ResponseCode.Unexpected]: {
    en: 'Unexpected exception',
    vi: 'Lỗi không xác định',
  },
  [ResponseCode.ValidationError]: {
    en: 'Validation error',
    vi: 'Dữ liệu không đúng định dạng cho phép',
  },
  [ResponseCode.IdValidationError]: {
    en: 'Id validation error',
    vi: 'Id không đúng định dạng cho phép',
  },
  [ResponseCode.PasswordNotMatch]: {
    en: 'Password not match',
    vi: 'Mật khẩu không chính xác',
  },
  [ResponseCode.InvalidToken]: {
    en: 'Token is not valid',
    vi: 'Token không hợp lệ',
  },
  [ResponseCode.ExpiredToken]: {
    en: 'Token is expired',
    vi: 'Token hết hạn',
  },
  [ResponseCode.UserNotFound]: {
    en: 'User not found',
    vi: 'Không tìm thấy tài khoản này',
  },
  [ResponseCode.UserExisted]: {
    en: 'User existed',
    vi: 'Tài khoản đã tồn tại',
  },
  [ResponseCode.UserNotActive]: {
    en: 'User not active',
    vi: 'Tài khoản chưa được kích hoạt',
  },
  [ResponseCode.ItemNotFound]: {
    en: 'Item not found',
    vi: 'Không tìm thấy bản ghi này',
  },
  [ResponseCode.PermissionDenied]: {
    en: 'Permission denied',
    vi: 'Không có quyền thực hiện hành động này',
  },
  [ResponseCode.SignatureNotFound]: {
    en: 'Signature not found',
    vi: 'Không tìm thấy chữ ký này',
  },
  [ResponseCode.DigiSignQueueExisted]: {
    en: 'You have signed this file, please wait until the processing done',
    vi: 'Bạn đã ký file này, vui lòng đợi quá trình ký số hoàn thành',
  },
  [ResponseCode.TemplateExportNotFound]: {
    en: 'Export template for request type has not been set!',
    vi: 'Mẫu in cho loại yêu cầu chưa được thiết lập!',
  },
  [ResponseCode.NotEnoughKeyI18n]: {
    en: 'Key i18n not enough!',
    vi: 'Chưa config đầy đủ key i18n',
  },
  [ResponseCode.DataInUse]: {
    en: 'Data in use!',
    vi: 'Dữ liệu đang được sử dụng!',
  },
};

export type ExceptionRef = unknown;

export class ExceptionBase extends HttpException {
  public constructor(
    httpStatus: HttpStatus,
    private readonly errorCode: ResponseCode,
    private readonly ref?: ExceptionRef,
  ) {
    super('', httpStatus);
  }

  public getCode(): ResponseCode {
    return this.errorCode;
  }

  public getRef(): ExceptionRef {
    return this.ref;
  }
}
