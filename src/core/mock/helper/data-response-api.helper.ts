import { IDataResponseApiDto } from "../../dtos/data-response-api.dto";

export class DataResponseApiHelper {
    static response<T> (
        data: T | undefined,
        result: boolean = true,
        statusCode = 200,
        message: string = 'Executado com sucesso',
    ): IDataResponseApiDto<T> {
        return {
            data,
            result,
            statusCode,
            message,
            isFromCache: false
        }
    }
}