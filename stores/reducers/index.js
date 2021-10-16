import {
    SETDONATIONS,
    SETTOKEN,
    SETPAYLOADCREATE,
    SET_USER_DONATIONS
} from '../actionType'

const initialState = {
    donations: [],
    access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJqYW1iYW5AbWFpbC5jb20iLCJpYXQiOjE2MzM4NTI5OTh9.FOnZKYt6OUEXcLrk3B4zwMPmBdmlvPVvptGZEGlTmt4",
    payloadCreate : {},
    userDonations: []
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
        default:
            return state
    }
}

export default reducer