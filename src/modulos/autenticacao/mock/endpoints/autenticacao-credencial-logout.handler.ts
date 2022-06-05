import { rest } from 'msw';
import { ResponseApiHelper } from '../../../../core/mock/helper/response-api.helper';

export const autenticacaoCredencialLogoutHandler = [
    rest.post("https://localhost:9000/api/autenticacao/credencial/logout", (req, res, ctx) => {
        localStorage.removeItem('msw-is-authenticated');
        localStorage.removeItem('msw-jwt-repositorio');
        return res(
            ctx.delay(500),
            ctx.json(ResponseApiHelper.response()),
        );
    }),
];
