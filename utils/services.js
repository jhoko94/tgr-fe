import { Notyf } from 'notyf';

const notyf = new Notyf({
  duration: 5000,
  position: { x: 'right', y: 'top' }
});

export const promiseShell = (api, options, onSuccess, onError) => {
  return new Promise((resolve, reject) => {
    if (!options.headers) options.headers = { Accept: 'application/json' }

    api(options)
      .then((response) => {
        let respData = null
        if (onSuccess) respData = onSuccess(response)
        resolve(respData || response)
      })
      .catch((e) => {
        let errData = null
        if (onError) errData = onError(e)
        reject(errData || e)
      })
  })
}

export const showErrorAlert = (text) => {
  notyf.error({
    message: text?.message || text,
    dismissible: true
  });
};

export const showSuccessAlert = (text) => {
  notyf.success({
    message: text?.message || text,
    dismissible: true
  });
};

