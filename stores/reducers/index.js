import {
    SETDONATIONS,
    SETTOKEN,
    SETPAYLOADCREATE,
    SET_USER_DONATIONS,
    SET_DETAIL_DONATION
} from '../actionType'

const initialState = {
    donations: [],
    access_token: "",
    payloadCreate : {},
    userDonations: [],
    detailDonation: {}
}

function reducer(state = initialState, action) {
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
        case SET_USER_DONATIONS:
            return { ...state, userDonations: action.payload }
        case SET_DETAIL_DONATION:
            return { ...state, detailDonation: action.payload }
        default:
            return state
    }
}

export default reducer