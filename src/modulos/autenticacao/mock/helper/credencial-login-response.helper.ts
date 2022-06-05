import { Buffer } from 'buffer';
import { MockError } from "../../../../core/mock/exceptions/mock.exception";
import { AnyObject } from "../../../../core/types";
import { IAutenticacaoCredencialLoginResponseDto } from "../../dtos/autenticacao-credencial-login-response.dto";
import { adicionarRegistro as adicionarTokenJwt } from "../repositorios/credencial-jwt-token.repositorio";
import { credencialRepositorio } from "../repositorios/credencial.repositorio";
import { CredencialResponseHelper } from "./credencial-response.helper";

export class CredencialLoginResponseHelper {
    static responsePorUsuario(usuario: string, senha: string): AnyObject {
        const credencialResponse = credencialRepositorio.find(p => 
            p.usuario === usuario
        );
        if (!credencialResponse || (credencialResponse && credencialResponse.senha !== senha)) {
            throw new MockError(401, 'Login inválido.');
        }
        return credencialResponse;
    }
    static response(usuario: string, senha: string): 
        IAutenticacaoCredencialLoginResponseDto {
        const minutesToAdd = 30;
        const currentDate = new Date();
        const expiraEm = new Date(currentDate.getTime() + minutesToAdd*60000);

        const credencialResponse = CredencialLoginResponseHelper.responsePorUsuario(
            usuario as string,
            senha as string
        );
        /*{"alg":"http://www.w3.org/2001/04/xmldsig-more#hmac-sha256","typ":"JWT"} */
        const headerJwt = 'eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9';
        const payloadJwt = Buffer.from(JSON.stringify({
            Usuario: credencialResponse.nome,
            IdCredencial: credencialResponse.id,
            nbf: currentDate.getTime() / 1000,
            exp: expiraEm.getTime() / 1000,
            iss: 'localhost',
            aud: 'localhost'
        })).toString('base64');

        const tokenAcesso = `${headerJwt}.${payloadJwt}.rUyxrPMt7uiwD1S1gA_riPSCnIZv34mpWeNh3VV1F3o`;

        //salvar tokenAcesso
        adicionarTokenJwt({
            id: Date.now(),
            tokenAcesso,
            expiraEm,
            idCredencial: credencialResponse.id,
        });

        return {
            expiraEm,
            tokenAcesso,
            schema: 'Bearer',
            credencial: CredencialResponseHelper.response(
                credencialResponse
            ),
        };
    }
}