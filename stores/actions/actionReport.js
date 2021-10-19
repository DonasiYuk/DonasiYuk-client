import axios from "axios";

// const baseUrl = 'http://192.168.1.2:3000'
const baseUrl = 'http://192.168.100.4:3000'


export function report(data, access_token) {
    return function () {
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