import { promiseShell, showErrorAlert, showSuccessAlert } from '../utils/services'

export const actions = {
  getKasus({ commit }, params) {
    return promiseShell(
      this.$api,
      {
        method: 'get',
        url: 'kasus',
        params
      },
      (resp) => {
        // eslint-disable-next-line no-console
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
  addKasus({ commit }, params) {
    return promiseShell(
      this.$api,
      {
        method: 'post',
        url: 'add/kasus',
        data: params
      },
      (resp) => {
        // eslint-disable-next-line no-console
        const { status, data } = resp
        if (status === 200) {
          showSuccessAlert(data?.message)
          return data
        } else return []
      },
      (err) => {
        const message = err?.response ? err?.response.data : 'error server'
        showErrorAlert(message)
      }
    )
  },
  updateAmount({ commit }, params) {
    return promiseShell(
      this.$api,
      {
        method: 'put',
        url: `put/updateamount/${params.id}`,
        data: params.data
      },
      (resp) => {
        // eslint-disable-next-line no-console
        const { status, data } = resp
        if (status === 200) {
          showSuccessAlert(data?.message)
          return data
        } else return []
      },
      (err) => {
        const message = err?.response ? err?.response.data : 'error server'
        showErrorAlert(message)
      }
    )
  },
  changeStatus({ commit }, params) {
    return promiseShell(
      this.$api,
      {
        method: 'put',
        url: `put/changestatuskasus/${params.id}`,
        data: params.data
      },
      (resp) => {
        // eslint-disable-next-line no-console
        const { status, data } = resp
        if (status === 200) {
          showSuccessAlert(data?.message)
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