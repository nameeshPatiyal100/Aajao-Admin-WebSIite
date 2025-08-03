const storagePrefix = 'aajao_';

const storage = {
  getToken: () => {
    return JSON.parse(window.localStorage.getItem(`${storagePrefix}token`) as string);
  },
  setToken: (token: string) => {
    window.localStorage.setItem(`${storagePrefix}token`, JSON.stringify(token));
  },
  clearToken: () => {
    window.localStorage.removeItem(`${storagePrefix}token`);
  },
  setTokenByKey :(key:string , data:any) => {
    window.localStorage.setItem(key , data)
  },
  getTokenByKey : (key:string) => {
    return window.localStorage.getItem(key)
  }
};
export default storage;
