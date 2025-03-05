const TOKEN = 'TOKEN'
const USER_DATA = 'USER_DATA'
const USER_ROLE = 'USER_ROLE'
const USER_ACCESS = 'USER_ACCESS'
const NEED_CHANGE_PASSWROD = 'NEED_CHANGE_PASSWROD'

// Authenticated Path
export const authPath = '/'

// TOKEN
export const setToken = (token) => {
  return window.$nuxt.$cookiz.set(TOKEN, token)
}

export const getToken = () => {
  if (typeof window === 'undefined' || !window) return null
  return window.$nuxt.$cookiz.get(TOKEN)
}

export const removeToken = () => {
  return window.$nuxt.$cookiz.remove(TOKEN)
}

export const isTokenExpired = (token) => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000 < Date.now();
  } catch (error) {
    return true; 
  }
};

// USER DATA
export const setUserData = (val) => {
  return window.$nuxt.$cookiz.set(USER_DATA, val)
}

export const getUserData = () => {
  if (typeof window === 'undefined' || !window) return {}
  return window.$nuxt.$cookiz.get(USER_DATA)
}

// USER ROLE
export const setUserRole = (val) => {
  return window.$nuxt.$cookiz.set(USER_ROLE, val)
}

export const getUserRole = () => {
  if (typeof window === 'undefined' || !window) return {}
  return window.$nuxt.$cookiz.get(USER_ROLE)
}

// USER ACCESS
export const setUserAccess = (val) => {
  return window.$nuxt.$cookiz.set(USER_ACCESS, val)
}

export const getUserAccess = () => {
  if (typeof window === 'undefined' || !window) return {}
  return window.$nuxt.$cookiz.get(USER_ACCESS)
}

export const getUserImage = (type) => {
  const data = getUserData()
  const { username, name: alt, photo } = data

  let url = ''
  if (!photo) url = `https://robohash.org/${username}?bgset=bg1`
  else url = `${process.env.VUE_APP_APPLICATION_SERVER_STORAGE}${photo}`

  if (type === 'img') return url
  if (type === 'alt') return alt
}

export const setNeedChangePassword = (val) => {
  return window.$nuxt.$cookiz.set(NEED_CHANGE_PASSWROD, val)
}

export const getNeedChangePassword = () => {
  return window.$nuxt.$cookiz.get(NEED_CHANGE_PASSWROD)
}
