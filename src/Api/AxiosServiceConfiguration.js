
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

const config ={
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json'
  }

}

const api = axios.create(config);

api.interceptors.request.use(
  (config) => {

    const user = localStorage.getItem('admin');

    const token =JSON.parse(user).token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) =>{return Promise.reject(error)}
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401 && error.response?.data === 'invalid token') {
    
      localStorage.removeItem('admin');
      
      window.location.href = '/login';
    }
   

    return Promise.reject(error)
  }
);

const apiService = {

  loginAdmin: (credentials) => api.post('/login', credentials),
  getClientsVerifyRequests: () => api.get('/clientsVerifyRequests'),
  getEngineersVerifyRequests: () => api.get('/engineersVerifyRequests'),
  patchClientStatus: (id, data) => api.patch(`/verifyRequests/${id}`, data),
};
export {api};
export default apiService;
