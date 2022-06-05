import { RequestHandler } from "msw";
import { autenticacaoCredencialLoginHandler } from "./autenticacao/mock/endpoints/autenticacao-credencial-login.handler";
import { autenticacaoCredencialLogoutHandler } from "./autenticacao/mock/endpoints/autenticacao-credencial-logout.handler";

export const handlers: RequestHandler[] = [
    ...autenticacaoCredencialLogoutHandler,
    ...autenticacaoCredencialLoginHandler
];