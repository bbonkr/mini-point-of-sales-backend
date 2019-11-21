import { HttpStatusError } from './HttpStatusError';

export interface JsonResultValue<T> {
  success: boolean;
  data?: T | T[] | null;
  message?: string;
}

/**
 * 응답 데이터를 제공합니다.
 * @example JsonResult.getEmpty();
 * JsonResult.getError(err);
 * JsonResult.getSuccess(data);
 */
export class JsonResult<T> implements JsonResultValue<T> {
  public static Empty: JsonResult<object> = JsonResult.getEmpty();

  /**
   * 빈 응답 데이터를 작성합니다.
   */
  public static getEmpty(): JsonResult<object> {
    const result = new JsonResult<object>();

    result.success = false;
    result.data = null;
    result.message = '';

    return result;
  }

  /**
   * 비정상 응답 데이터를 작성합니다.
   * @param err 비정상 응답 사유
   */
  public static getError(err: HttpStatusError): JsonResult<HttpStatusError> {
    return new JsonResult({
      success: false,
      data: err,
      message: err.message || err.toString()
    });
  }

  /**
   * 정상 응답 데이터를 작성합니다.
   * @param data 데이터
   */
  public static getSuccess<T>(data: T): JsonResult<T> {
    return new JsonResult({
      success: true,
      data: data,
      message: undefined
    });
  }

  public success: boolean = false;
  public data?: T | T[] | null;
  public message?: string;

  constructor(value?: JsonResultValue<T>) {
    if (value) {
      this.success = value.success;
      this.data = value.data;
      this.message = value.message;
    }
  }
}
