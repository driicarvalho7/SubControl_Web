import axios from 'axios';

export const api_user = axios.create({
  baseURL: 'http://192.168.1.4:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export const api_login = axios.create({
  baseURL: 'http://192.168.1.4:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export const api_signatures = axios.create({
  baseURL: 'http://192.168.1.4:8082/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});
