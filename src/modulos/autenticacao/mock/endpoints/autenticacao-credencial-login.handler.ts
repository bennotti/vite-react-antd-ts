import { rest } from 'msw';
import { MockError } from '../../../../core/mock/exceptions/mock.exception';
import { DataResponseApiHelper } from '../../../../core/mock/helper/data-response-api.helper';
import { ResponseApiHelper } from '../../../../core/mock/helper/response-api.helper';
import { IAutenticacaoCredencialLoginRequestDto } from '../../dtos/autenticacao-credencial-login-request.dto';
import { CredencialLoginResponseHelper } from '../helper/credencial-login-response.helper';

export const autenticacaoCredencialLoginHandler = [
    rest.post<IAutenticacaoCredencialLoginRequestDto>("https://localhost:9000/api/autenticacao/credencial/login", (req, res, ctx) => {
        const { usuario, senha } = req.body;
        try {
            const loginResponse = CredencialLoginResponseHelper.response(
                usuario,
                senha
            );
            const response = res(
                ctx.delay(500),
                ctx.json(DataResponseApiHelper.response(loginResponse)),
            );
            localStorage.setItem('msw-is-authenticated', 'true');
            return response;
        } catch (e) {
            console.log(e);
            if (e instanceof MockError) {
                return res(
                    ctx.delay(500),
                    ctx.status(e.obterStatusCode()),
                    ctx.json(ResponseApiHelper.response(false, e.obterStatusCode(), e.obterMensagem()))
                );
            } else {
                return res(
                    ctx.delay(500),
                    ctx.status(400),
                    ctx.json(ResponseApiHelper.response(false, 400, JSON.stringify(e)))
                );
            }
        }
    }),
];
