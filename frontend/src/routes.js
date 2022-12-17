import axios from 'axios';

const createUser = (data) => axios.post('/api/v1/signup', data);
const userLogin = (data) => axios.post('/api/v1/login', data);
const getData = (token) => axios.get('/api/v1/data', {
  headers: { Authorization: `Bearer ${token}` },
});

export { createUser, userLogin, getData };
