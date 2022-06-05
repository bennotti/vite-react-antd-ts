import { IResponseApiDto } from "../../dtos/response-api.dto";

export class ResponseApiHelper {
    static response (
        result: boolean = true,
        statusCode = 200,
        message: string = 'Executado com sucesso',
    ): IResponseApiDto {
        return {
            result,
            statusCode,
            message,
            isFromCache: false
        }
    }
}