import {
    SETDONATIONS,
    SETTOKEN,
    SETPAYLOADCREATE,
    SET_USER_DONATIONS,
    SET_DETAIL_DONATION
} from '../actionType'

const initialState = {
    donations: [],
    access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBtYWlsLmNvbSIsImlhdCI6MTYzNDU5NTU0OH0.2bLdroA0N6L-xNoJbJlfX6ws0MMbMkSotge99SwmRYY",
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