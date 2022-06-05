import { IResponseApiDto } from "./response-api.dto";

export interface IDataResponseApiDto<T> extends IResponseApiDto {
    data: T | undefined;
}