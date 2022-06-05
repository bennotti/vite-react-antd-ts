import { AnyObject } from "../../../../core/types";

const credencialRepositorio: AnyObject[] = [
    {
        id: 1,
        usuario: 'teste',
        email: 'teste@teste.com',
        nome: 'Usuário teste',
        senha: 'teste123',
        alterarSenha: false,
        tokenRecuperarAcesso: '',
        codigoRecuperarAcesso: '',
        recuperarAcessoExpiraEm: undefined,
        urlAvatar: ''
    }
];

function adicionarRegistro(registro: AnyObject) {
    credencialRepositorio.push(registro);
}

function atualizarRegistro(index: number, registro: AnyObject) {
    credencialRepositorio[index] = registro;
}

export {
    credencialRepositorio,
    adicionarRegistro,
    atualizarRegistro
};
