import axios from "axios";

const baseUrl = 'http://192.168.1.11:3000'

export function register(data) {
    return axios({
        url:`${baseUrl}/users/register`,
        method:'post',
        data
    })
}