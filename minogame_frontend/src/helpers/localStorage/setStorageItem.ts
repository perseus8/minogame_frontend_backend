import config from "src/services/config";

export function setStorageItem<T>(key: string, data: T) {
  window.localStorage.setItem(`${config.AppId}_${key}`, JSON.stringify(data));
}

