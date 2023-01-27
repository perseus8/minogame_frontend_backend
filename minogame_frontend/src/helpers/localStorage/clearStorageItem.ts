import config from "src/services/config";

export function clearStorageItem(key: string) {
  window.localStorage.removeItem(`${config.AppId}_${key}`);
}
