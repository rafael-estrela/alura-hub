import Axios from "axios";

export default Axios.create({
    baseURL: 'http://192.168.0.156:3000/'
});