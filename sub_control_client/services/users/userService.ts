import { api_user } from "../apiService";

interface User {
  _id: string;
  username: string;
  password: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const getAll = () => {
  return api_user.get<Array<User>>('/');
};

export default {
  getAll,
};