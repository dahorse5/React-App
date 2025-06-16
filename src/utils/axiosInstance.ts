import axios from "axios";

const axiosInstance = axios.create({
baseURL: "https://monkfish-app-z9uza.ondigitalocean.app/bcard2",
});

axiosInstance.interceptors.request.use(
(config) => {
const token = localStorage.getItem("authToken");
if (token) {
    config.headers.Authorization = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTNhNjA4ZDFjN2NkODBjMWZkMjc1MzIiLCJpc0J1c2luZXNzIjpmYWxzZSwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNzQ5MzkzNDUyfQ.kmQ3d3KF0MnLYi4j9rvebO_VOpUIdqDdqEUAElXLVxE`;
}
return config;
},
(error) => Promise.reject(error)
);

export default axiosInstance;
