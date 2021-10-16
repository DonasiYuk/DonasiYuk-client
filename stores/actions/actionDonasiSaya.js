import axios from 'axios'
import { SET_USER_DONATIONS } from '../actionType'

const baseUrl = 'http://192.168.1.2:3000'

export function setUserDonations(data) {
    return {
        type: SET_USER_DONATIONS,
        payload: data
    }
}

export function fetchUserDonations(access_token) {
    return function (dispatch) {
        // console.log(access_token, ' ini acces token');
        axios({
            url: `${baseUrl}/myDonation`,
            method: 'get',
            headers: { access_token }
        })
            .then(res => {
                console.log(res.data);
                dispatch(setUserDonations(res.data))
            })
            .catch(console.log())
    }
}