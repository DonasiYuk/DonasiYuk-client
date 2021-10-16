import axios from 'axios'
import { SETTOKEN } from '../actionType'

const baseUrl = 'http://10.0.2.2:3000'

export function setLogin(token) {
    return {
        type: SETTOKEN,
        payload: token
    }
}

export function actionLogin(data) {
    return function (dispatch) {
        return axios({
            url: `${baseUrl}/users/login`,
            method: 'post',
            data: data
        })

    }
}