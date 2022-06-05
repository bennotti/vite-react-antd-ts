import { IAutenticacaoCredencialResponseDto } from "./autenticacao-credencial-response.dto";

export interface IAutenticacaoCredencialLoginResponseDto {
    schema: string;
    tokenAcesso: string;
    expiraEm: Date;
    credencial: IAutenticacaoCredencialResponseDto;
}