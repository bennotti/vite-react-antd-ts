import { MockError } from "../../../../core/mock/exceptions/mock.exception";
import { AnyObject } from "../../../../core/types";
import { IAutenticacaoCredencialResponseDto } from "../../dtos/autenticacao-credencial-response.dto";
import { credencialJwtTokenRepositorio } from "../repositorios/credencial-jwt-token.repositorio";
import { credencialRepositorio } from "../repositorios/credencial.repositorio";

export class CredencialResponseHelper {
    static responsePorJwtToken(authorization: string): AnyObject {
        const jwtTokenResponse = credencialJwtTokenRepositorio.find(
            p => p.tokenAcesso === authorization
        );
        if (!jwtTokenResponse) {
            throw new MockError(401, 'Login inválido.');
        }

        const credencialResponse = credencialRepositorio.find(
            p => p.id === jwtTokenResponse.idcredencial
        );
        if (!credencialResponse) {
            throw new MockError(401, 'Login inválido.');
        }

        return CredencialResponseHelper.response(credencialResponse);
    }

    static responsePorUsuario(usuario: string, senha: string): AnyObject {
        const credencialResponse = credencialRepositorio.find(p => 
            p.usuario === usuario
        );
        if (!credencialResponse || (credencialResponse && credencialResponse.senha !== senha)) {
            throw new MockError(401, 'Login inválido.');
        }
        return CredencialResponseHelper.response(credencialResponse);
    }

    static response(credencialResponse: AnyObject): IAutenticacaoCredencialResponseDto {
        return {
            nome: credencialResponse.nome,
            usuario: credencialResponse.usuario,
            alterarSenha: credencialResponse.alterarSenha,
        };
    }
}