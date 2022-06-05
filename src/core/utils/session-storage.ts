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
  const storageKeyName = keyName ?? (`ls-${Date.now()}`);
  sessionStorage.setItem(storageKeyName, data);

  return {
    data,
    keyName: storageKeyName,
  };
}
export function clearStorage(): void {
  sessionStorage.clear();
}
export function removeFromStorage(keyName: string): void {
  sessionStorage.removeItem(keyName);
}
export function getFromStorage(keyName: string): string | null {
  return sessionStorage.getItem(keyName);
}

export function getFromJsonFromStorage(keyName: string): AnyObject | undefined {
  const storageData = sessionStorage.getItem(keyName);
  if (storageData && storageData !== '') {
    return JSON.parse(storageData as string);
  }
  return undefined;
}