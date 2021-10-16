import axios from "axios";

const baseUrl = 'http://10.0.2.2:3000'

export function register(data) {
    return axios({
        url:`${baseUrl}/users/register`,
        method:'post',
        data
    })
}