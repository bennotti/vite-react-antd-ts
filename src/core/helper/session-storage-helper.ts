import { AnyObject, StorageResponse } from "../types";
import { clearStorage, getFromJsonFromStorage, getFromStorage, removeFromStorage, saveObjectOnStorage, saveStringOnStorage } from "../utils/session-storage";


export class SessionStorageHelper {
  static clear(): void {
    return clearStorage();
  }
  static getFromJson(keyName: string): AnyObject | undefined {
    return getFromJsonFromStorage(keyName);
  }
  static get(keyName: string): string | null {
    return getFromStorage(keyName);
  }
  static remove(keyName: string): void {
    return removeFromStorage(keyName);
  }
  static saveObject(data: AnyObject, keyName: string | null = null): StorageResponse {
    return saveObjectOnStorage(data, keyName);
  }
  static save(data: string, keyName: string | null = null): StorageResponse {
    return saveStringOnStorage(data, keyName);
  }
}