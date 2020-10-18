const ID_TOKEN_KEY = "id_token";
const user_details = "auth_email";

export const getToken = () => {
  return window.localStorage.getItem(ID_TOKEN_KEY);
};
export const getAuthUser = () => {
  return window.localStorage.getItem(user_details);
};

export const saveToken = token => {
  window.localStorage.setItem(ID_TOKEN_KEY, token);
};
export const saveUser = user => {
  window.localStorage.setItem(user_details, user);
};

export const destroyToken = () => {
  window.localStorage.removeItem(ID_TOKEN_KEY);
  window.localStorage.removeItem(user_details);
};

export default { getToken, saveToken, destroyToken, getAuthUser,saveUser };
