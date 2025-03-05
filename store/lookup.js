import { promiseShell, showErrorAlert } from '../utils/services'

export const actions = {
  getCategories({ commit }, params) {
    return promiseShell(
      this.$api,
      {
        method: 'get',
        url: 'lookup/categories'
      },
      (resp) => {
        const { status, data } = resp
        if (status === 200) {
          return data
        } else return []
      },
      (err) => {
        const message = err?.response ? err?.response.data : 'error server'
        showErrorAlert(message)
      }
    )
  },
  getJenisBarang({ commit }, params) {
    return promiseShell(
      this.$api,
      {
        method: 'get',
        url: 'lookup/jenisbarang'
      },
      (resp) => {
        const { status, data } = resp
        if (status === 200) {
          return data
        } else return []
      },
      (err) => {
        const message = err?.response ? err?.response.data : 'error server'
        showErrorAlert(message)
      }
    )
  },
  getStatus({ commit }, params) {
    return promiseShell(
      this.$api,
      {
        method: 'get',
        url: 'lookup/status',
        params
      },
      (resp) => {
        const { status, data } = resp
        if (status === 200) {
          return data
        } else return []
      },
      (err) => {
        const message = err?.response ? err?.response.data : 'error server'
        showErrorAlert(message)
      }
    )
  },
}