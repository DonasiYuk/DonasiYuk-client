import {
    SET_USER_PROFILE
} from '../actionType'

import axios from 'axios'

// const baseUrl = 'http://192.168.100.4:3000'
// const baseUrl = 'http://192.168.1.12:3000'
const baseUrl = 'http://10.0.2.2:3000'
// const baseUrl = 'http://192.168.1.24:3000'



export function setUserProfile(payload){
    return {
        type: SET_USER_PROFILE,
        payload: payload
    }
}


export function getUserProfile(access_token){

    return function(dispatch, getState){
        axios({
            method: 'GET',
            url: `${baseUrl}/users/profile`,
            headers: { access_token }
          })
          .then(res => {
            dispatch(setUserProfile(res.data))
          })
          .catch(err => console.log(err, '<<< ini error'))
    }
}