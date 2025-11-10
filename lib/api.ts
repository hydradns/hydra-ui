import axoios from "axios";

const prefix = "api/v1";

const api = axoios.create({
  baseURL: process.env.API_URL || `http://localhost:8086/${prefix}`,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
