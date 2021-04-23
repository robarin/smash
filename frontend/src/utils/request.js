const USE_COOKIES = true;

const request = ({url, headers, method, body}) => {
  const requestMethod = method || 'GET';
  const requestUrl = process.env.REACT_APP_API_URL + url;
  const requestParams = {
    method: requestMethod,
    headers: {
      ...headers,
    },
  }
  if (USE_COOKIES) {
    requestParams.credentials = 'include';
  }
  if (['POST', 'PATCH'].includes(requestMethod)) {
    if (body.file) {
      const formData = new FormData();
      formData.append('file', body.file);

      requestParams.body = formData;
    } else {
      requestParams.headers['Content-Type'] = 'application/json';
      requestParams.body = JSON.stringify(body);
    }
  }
  return fetch(requestUrl, requestParams)
    .then((response) => {
      const {status, statusText} = response

      const injectPromise = promise =>
        promise.then(data =>
          Promise.resolve({
            data,
            status,
            statusText,
            requestUrl,
          })
        )

      return injectPromise(response.json().catch(() => ({})));
    })
    .catch((error) => {
      throw new Error(error.message);
    })
}

export const requestGet = (url, headers = {}) => request({url, headers});
export const requestPost = (url, body, headers = {}) => request({url, body, headers, method: 'POST'});
export const requestPatch = (url, body, headers = {}) => request({url, body, headers, method: 'PATCH'});
export const requestDelete = (url, headers = {}) => request({url, headers, method: 'DELETE'});
