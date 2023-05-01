import axios from 'axios';
const baseURL = 'https://api.freteme.com/api/';
// swr request
export const fetcher = (endpoint) =>
  axios.get(`${baseURL}${endpoint}`).then((res) => res.data);

// axios request
const api = axios.create({
  baseURL: baseURL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
});
export default api;
export const take = async (data, method, rota) => {
  const getData = (rota, data) => api.get(rota, data);
  const postData = (rota, data) => api.post(rota, data);
  const putData = (rota, data) => api.put(rota, data);
  switch (method) {
    case 'get':
      return getData(rota, data);
    case 'post':
      return postData(rota, data);
    case 'put':
      return putData(rota, data);
    default:
      throw new Error(`Invalid method: ${method}`);
  }
};
export const apiKey = 'AIzaSyDWSnciSBk2pJJ0oHy7JF-PgmRPENmxWQQ';
export const PROJECT_ENDPOINT = 'https://painel.freteme.com/v1';
export const PROJECT_ID = '643e4bf0bc8152ff08e5';
export const DATABASE_ID = 'freteme';
// Collections
export const SERVICOS_COLLECTION_ID = 'servicos';
export const TOKENS_COLLECTION_ID = 'token';
export const CONFIGS_COLLECTION_ID = 'config';
// Callback URLs
export const OAUTH_CALLBACK_URL = 'http://localhost:3000/google';
export const INVITATION_CALLBACK_URL = 'http://localhost:3000/erro';
// Browser Timezone
export const appTZ = 'Asia/Tehran';
export const localTZ = Intl.DateTimeFormat().resolvedOptions().timeZone;
