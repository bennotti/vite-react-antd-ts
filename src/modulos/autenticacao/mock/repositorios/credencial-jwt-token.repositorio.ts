import { AnyObject } from "../../../../core/types";

const jwtTokenLocalStorage = localStorage.getItem('msw-jwt-repositorio');

let credencialJwtTokenRepositorio: AnyObject[] = !jwtTokenLocalStorage ? [

] : JSON.parse(jwtTokenLocalStorage);

function adicionarRegistro(registro: AnyObject) {
    credencialJwtTokenRepositorio.push(registro);
    localStorage.setItem('msw-jwt-repositorio', JSON.stringify(credencialJwtTokenRepositorio));
}

function atualizarRegistro(index: number, registro: AnyObject) {
    credencialJwtTokenRepositorio[index] = registro;
}

export {
    credencialJwtTokenRepositorio,
    adicionarRegistro,
    atualizarRegistro
}