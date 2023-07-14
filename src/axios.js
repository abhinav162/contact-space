import axios from "axios";

const axiosInstance = () => {
    const token = localStorage.getItem("token");

    return axios.create({
        baseURL: "https://contact-app-backend-liart.vercel.app",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
        },
    })
}

export default axiosInstance;