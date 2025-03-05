import { promiseShell } from '../utils/services'
import { setToken, setUserData, setUserRole } from '../utils/authorization'

export const state = () => {
  return {
    theme: null,
  }
}

export const mutations = {
  CHANGE_THEME: (state, data) => {
    state.theme = data?.value
  },
}

export const actions = {
  login({ commit }, data) {
    const bodyFormData = new FormData()
    bodyFormData.set('user', data.username)
    bodyFormData.set('password', data.password)

    return promiseShell(
      this.$api,
      {
        method: 'post',
        url: 'login',
        data: bodyFormData,
      },
      (resp) => {
        const data = (resp && resp.data) || {}

        if (data.token) {
          const { token, role_name: roleName } = data
          setToken(token)
          setUserData(data)
          setUserRole(roleName)
        }
      }
    )
  },
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      // eslint-disable-next-line no-console
      console.log('tes logout')
      setToken(null)
      resolve()
    })
  },
}
