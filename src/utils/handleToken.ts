/**
 * 使用 token
 */

const tokenKey = import.meta.env.VITE_TOKEN_KEY

export function getToken() {
  return sessionStorage.getItem(tokenKey)
}

export function setToken(token: string) {
  sessionStorage.setItem(tokenKey, token)
}

export function removeToken() {
  sessionStorage.removeItem(tokenKey)
}
