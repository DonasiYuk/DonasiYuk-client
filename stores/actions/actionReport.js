import axios from "axios";

// const baseUrl = 'http://192.168.1.12:3000'
const baseUrl = 'http://10.0.2.2:3000'
// const baseUrl = 'http://192.168.1.24:3000'


export function report(data, access_token) {
    return function () {
        console.log(data, '<<<<<<<');
        return axios({
            url:`${baseUrl}/report`,
            method:'post',
            data,
            headers: { 
                "Content-Type": "multipart/form-data",
                access_token
             },
        })
    }
}