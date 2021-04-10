import { store } from '../store';

const USE_COOKIES = false;

const request = ({ url, headers, method, body }) => {
  const requestMethod = method || 'GET';
  const requestUrl = process.env.REACT_APP_API_URL + url;
  const currentUser = store.getState().currentUser;
  const requestParams = {
    method: requestMethod,
    headers: {
      ...headers,
    },
  }
  if (currentUser) {
    requestParams.headers['X-Auth-Access-Token'] = currentUser.access_token;
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
      if (response.status === 401) {
        console.log('Request error', response?.message);
      }
      return response;
    })
    .catch((error) => {
      throw new Error(error.message);
    })
}

export const requestGet = (url, headers = {}) => request({ url, headers });
export const requestPost = (url, body, headers = {}) => request({ url, body, headers, method: 'POST' });
export const requestPatch = (url, body, headers = {}) => request({ url, body, headers, method: 'PATCH' });
export const requestDelete = (url, headers = {}) => request({ url, headers, method: 'DELETE' });
