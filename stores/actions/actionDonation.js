import { SETPAYLOADCREATE, SETDONATIONS } from "../actionType"
import axios from 'axios'
// import { useSelector } from 'react-redux'

// const access_token = useSelector(state => state.access_token);

const baseUrl = "http://10.0.2.2:3000"

export function setCreate(payload) {
    return {
        type: SETPAYLOADCREATE,
        payload: payload
    }
}

export function actionCreate(data) {
    return dispatch => {
        dispatch(setCreate(data))
    }
}

export function setDonations(data) {
    return {
        type: SETDONATIONS,
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