import {
    SETDONATIONS,
    SETTOKEN,
    SETPAYLOADCREATE
} from '../actionType'

const initialState = {
    donations: [],
    access_token: "",
    payloadCreate : {}
}

function reducer(state = initialState, action) {
    console.log(action)
    switch (action.type) {
        case SETDONATIONS:
            return { ...state, donations: action.payload }
        case SETTOKEN:
            return { ...state, access_token: action.payload }
        case SETPAYLOADCREATE:
            return {
                ...state,
                payloadCreate : action.payload
            }
        default:
            return state
    }
}

export default reducer