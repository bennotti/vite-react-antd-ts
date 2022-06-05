export interface IResponseApiDto {
    result: boolean;
    statusCode: number;
    message?: string;
    resultId?: string;
    modelState?: unknown;
    isFromCache: boolean;
}