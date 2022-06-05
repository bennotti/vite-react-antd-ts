import { AnyObject, StorageResponse } from "../types";

export function saveObjectOnStorage(data: AnyObject, keyName: string | null = null): StorageResponse {
  return saveObjectAsJsonOnStorage(data, keyName);
}
export function saveObjectAsJsonOnStorage(data: AnyObject, keyName: string | null = null): StorageResponse {
  const storageResponse: StorageResponse = saveStringOnStorage(JSON.stringify(data as AnyObject), keyName);
  return {
    ...storageResponse,
    data: JSON.parse(storageResponse.data as string)
  }
}
export function saveStringOnStorage(data: string, keyName: string | null = null): StorageResponse {
  const localStorageKeyName = keyName ?? (`ls-${Date.now()}`);
  localStorage.setItem(localStorageKeyName, data);

  return {
    data,
    keyName: localStorageKeyName,
  };
}
export function clearStorage(): void {
  localStorage.clear();
}
export function removeFromStorage(keyName: string): void {
  localStorage.removeItem(keyName);
}
export function getFromStorage(keyName: string): string | null {
  return localStorage.getItem(keyName);
}

export function getFromJsonFromStorage(keyName: string): AnyObject | undefined {
  const localStorageData = localStorage.getItem(keyName);
  if (localStorageData && localStorageData !== '') {
    return JSON.parse(localStorageData as string);
  }
  return undefined;
}