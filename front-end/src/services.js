import axios from "axios";
const BASE_BACKEND_URL = "https:/sneaky-box-task.herokuapp.com/api";

export default {
  getAllCities: () => axios.get(`${BASE_BACKEND_URL}/cities`),
  addCity: (city) => axios.post(`${BASE_BACKEND_URL}/cities`, city),
  deleteCity: (code) => axios.delete(`${BASE_BACKEND_URL}/cities/${code}`),
};
