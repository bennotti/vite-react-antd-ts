import { AxiosInstance } from 'axios';
import { baseApi } from '../../../core/api/base.api';
import { IDataResponseApiDto } from '../../../core/dtos/data-response-api.dto';
import { IResponseApiDto } from '../../../core/dtos/response-api.dto';
import { IAutenticacaoCredencialLoginRequestDto } from '../dtos/autenticacao-credencial-login-request.dto';
import { IAutenticacaoCredencialLoginResponseDto } from '../dtos/autenticacao-credencial-login-response.dto';
import { IAutenticacaoCredencialResponseDto } from '../dtos/autenticacao-credencial-response.dto';

export interface IAutenticacaoApi {
    readonly httpClientApi: AxiosInstance;
    login(bodyRequest: IAutenticacaoCredencialLoginRequestDto): Promise<IDataResponseApiDto<IAutenticacaoCredencialLoginResponseDto> | undefined>;
    logout(): Promise<void>;
    validar(): Promise<void>;
    usuarioLogado(): Promise<IDataResponseApiDto<IAutenticacaoCredencialResponseDto> | undefined>;
}

export function createAutenticacaoApi(): IAutenticacaoApi {
    const httpClientApi: AxiosInstance = baseApi;
    
    async function usuarioLogado(): Promise<IDataResponseApiDto<IAutenticacaoCredencialResponseDto> | undefined> {
        return undefined;
    }
    
    async function validar(): Promise<void> {
        
    }
    
    async function logout(): Promise<void> {
        const responseApi = await httpClientApi
            .post<IResponseApiDto>(`/api/autenticacao/credencial/logout`, {});

        if (!responseApi.data.result) {
            throw new Error(responseApi.data.message);
        }
    }

    async function login(bodyRequest: IAutenticacaoCredencialLoginRequestDto): Promise<IDataResponseApiDto<IAutenticacaoCredencialLoginResponseDto> | undefined> {
        const responseApi = await httpClientApi
            .post<IDataResponseApiDto<IAutenticacaoCredencialLoginResponseDto>>(
                `/api/autenticacao/credencial/login`,
                bodyRequest, {
                    headers: {
                        authorization: '',
                    },
                },
            );

        if (!responseApi.data.result) {
            throw new Error(responseApi.data.message);
        }

        return responseApi.data;
    }

    return {
        httpClientApi,
        login,
        logout,
        validar,
        usuarioLogado
    };
}