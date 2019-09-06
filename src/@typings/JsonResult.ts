import { IJsonResult } from './IJsonResult';

export class JsonResult<T> implements IJsonResult<T> {
    public static getEmptyResult(): JsonResult<object> {
        const result = new JsonResult<object>();

        result.success = false;
        result.data = null;
        result.message = '';

        return result;
    }

    public static getErrorResult(err: Error): JsonResult<Error> {
        return new JsonResult({
            success: false,
            data: err,
            message: err.message || err.toString(),
        });
    }

    public success: boolean;
    public data?: T | T[] | null;
    public message?: string;

    constructor(value?: IJsonResult<T>) {
        if (value) {
            this.success = value.success;
            this.data = value.data;
            this.message = value.message;
        }
    }
}
