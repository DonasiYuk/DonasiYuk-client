import { SETPAYLOADCREATE } from "../actionType"

export function setCreate(payload){
    return {
        type: SETPAYLOADCREATE,
        payload : payload
    }
}

export function actionCreate(data){
    return dispatch => {
        dispatch(setCreate(data))
    }
}