const USER_LOCAL_STORAGE_KEY = 'recipe-user';

export const getStoredUserData = () => {
  const savedData = localStorage.getItem(USER_LOCAL_STORAGE_KEY)
  if (savedData !== "undefined") {
    return savedData ? JSON.parse(savedData) : undefined;
  }
}

export const saveUserData = (token) => {
  localStorage.setItem(USER_LOCAL_STORAGE_KEY, JSON.stringify(token));
}

export const removeUserData = () => {
  localStorage.removeItem(USER_LOCAL_STORAGE_KEY);
}