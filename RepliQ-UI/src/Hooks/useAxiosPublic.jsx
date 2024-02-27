import axios from "axios";

const axiosPublic = axios.create({
    baseURL:'https://repli-q-server.vercel.app'
})
const useAxiosPublic = () => {
    return axiosPublic
};

export default useAxiosPublic;