import axios from 'axios'
import { SET_USER_DONATIONS } from '../actionType'

const baseUrl = 'http://10.0.2.2:3000'

export function setUserDonations(data) {
    return {
        type: SET_USER_DONATIONS,
        payload: data
    }
}

export function fetchUserDonations(access_token) {
    return function (dispatch) {
        axios({
            url: `${baseUrl}/myDonation`,
            method: 'get',
            headers: { access_token }
        })
            .then(res => {
                dispatch(setUserDonations(res.data))
            })
            .catch(console.log())
    }
}