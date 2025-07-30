import http from './axios'
export default {
  get: (type = '', serverID = '', start = '', end = '', headers = {}) => {
    const url = (type === 'custom')
      ? `/api/${type}/${serverID}?start=${start}&end=${end}`
      : `/api/${type}/${serverID}`;

    return http.Get(url, { headers });
  }
}
