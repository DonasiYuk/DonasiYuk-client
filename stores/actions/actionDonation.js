import { SETPAYLOADCREATE, SETDONATIONS, SET_DETAIL_DONATION } from "../actionType"
import axios from 'axios'
// import { useSelector } from 'react-redux'

// const access_token = useSelector(state => state.access_token);

const baseUrl = "http://192.168.1.12:3000"

export function setCreate(payload) {
    return {
        type: SETPAYLOADCREATE,
        payload: payload
    }
}

export function actionCreate(data) {
    return function (dispatch, getState) {
        const { access_token, donations } = getState();

        axios({
            url: `${baseUrl}/donations`,
            method: 'post',
            data,
            headers: { 
                access_token,
                "Content-Type": "multipart/form-data",
            }
        })
        .then((res) => {
            dispatch(setDonations(donations.concat(res.data.newDonation)))
        })
        .catch(err => console.log(err))
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

export function setDonationsAsync() {//belom seleseai
    return function (dispatch) {
        axios({
            url: `${baseUrl}/donations`,
            method: 'get',
            // headers: access_token
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