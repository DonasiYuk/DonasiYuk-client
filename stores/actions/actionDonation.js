import { SETPAYLOADCREATE, SETDONATIONS, SET_DETAIL_DONATION } from "../actionType"
import axios from 'axios'

// import { useSelector } from 'react-redux'



// const baseUrl = "http://192.168.1.12:3000"
const baseUrl = 'http://10.0.2.2:3000'
// const baseUrl = 'http://192.168.1.24:3000'


export function setCreate(payload) {
    return {
        type: SETPAYLOADCREATE,
        payload: payload
    }
}

export function actionCreate(data) {
    return function (dispatch, getState) {
        const { access_token, donations } = getState();

        return axios({
            url: `${baseUrl}/donations`,
            method: 'post',
            data,
            headers: {
                access_token,
                "Content-Type": "multipart/form-data",
            }
        })
    }
}

export function setDonations(data) {
    return {
        type: SETDONATIONS,
        payload: data
    }
}

export function setDetailDonation(data) {
    return {
        type: SET_DETAIL_DONATION,
        payload: data
    }
}

export function setDonationsAsync(access_token) {
    return function (dispatch) {
        axios({
            url: `${baseUrl}/donations`,
            method: 'get',
            headers: {access_token}
        })
            .then((res) => {
                dispatch(setDonations(res.data))
            })
            .catch(err => console.log(err))
    }
}

export function getDetailDonation(id) {
    return function (dispatch, getState) {
        const { access_token } = getState();

        axios({
            url: `${baseUrl}/donations/${id}`,
            method: 'get',
            headers: { access_token }
        })
            .then(res => {
                dispatch(setDetailDonation(res.data))
            })
            .catch(err => console.log(err))
    }
}

export function editDonation(data, id) {
    return function (dispatch, getState) {
        const { access_token, donations } = getState();
        console.log(data, id, '<<<<<<<<<<<');
        return axios({
            url: `${baseUrl}/donations/${id}`,
            method: 'PUT',
            data,
            headers: {
                access_token,
            }
        })
    }
}