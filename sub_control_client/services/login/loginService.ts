import api from '../apiService';

interface LoginData {
  email: string;
  password: string;
}

interface User {
  _id: string;
  username: string;
  password: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface LoginResponse {
  message: string;
  user: User;
}

const login = (data: LoginData) => {
  return api.post<LoginResponse>('/users/login', data);
};

export default {
  login,
};