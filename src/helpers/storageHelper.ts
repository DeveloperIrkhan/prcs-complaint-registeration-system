interface ILocalStorage<T> {
  key: string;
  value: T;
  timeInHours: number;
}

export const setWithExpiry = <T>({
  key,
  value,
  timeInHours
}: ILocalStorage<T>) => {
  const timeNow = new Date();
  const items = {
    value: value,
    expiry: timeNow.getTime() + timeInHours * 60 * 60 * 1000
  };
  localStorage.setItem(key, JSON.stringify(items));
};

export const getWithExpirys = <T>(key: string): T | null => {
  const item = localStorage.getItem(key);
  if (!item) return null;
  try {
    const newItem = JSON.parse(item);
    const timeNow = new Date();

    if (timeNow.getTime() > newItem.expiry) {
      localStorage.removeItem(key);
      return null;
    }
    return newItem.value as T;
  } catch (error) {
    localStorage.removeItem(key);
    return null;
  }
};
