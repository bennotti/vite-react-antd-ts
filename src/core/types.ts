export declare type AnyObject = Record<string, any>;

export interface IStorageResponse { keyName: string, data: string | AnyObject }

export type StorageResponse = IStorageResponse;

export type FunctionReturnString = () => string;

export type FunctionStringParamReturnString = (valor: string) => string;

export type FunctionBooleanParamReturnString = (valor: boolean) => string;

export type FunctionBooleanArrayParamReturnStringArray = (valor: boolean[]) => string[];

export type FunctionReturnBoolean = () => boolean;

export type FunctionReturnVoid = () => void;