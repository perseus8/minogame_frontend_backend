import config from "src/services/config";

export function getStorageItem<T>(key: string) {
  const res = window.localStorage.getItem(`${config.AppId}_${key}`);
  if (res) {
    return JSON.parse(res) as T;
  }
  return null;
}

