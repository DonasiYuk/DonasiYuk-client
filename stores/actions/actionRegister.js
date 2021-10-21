import axios from "axios";

// const baseUrl = 'http://192.168.1.12:3000'
const baseUrl = 'http://10.0.2.2:3000'
// const baseUrl = 'http://192.168.1.24:3000'


export function register(data) {
    return function () {
        return axios({
            url:`${baseUrl}/users/register`,
            method:'post',
            data
        })
    }
}