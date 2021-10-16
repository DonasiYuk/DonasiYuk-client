import { SETDONATIONS,SETTOKEN, SET_USER_DONATIONS } from '../actionType'

const initialState = {
    donations: [],
    access_token: "",
    userDonations: []
}

function reducer(state = initialState, action) {
    switch (action.type) {
        case SETDONATIONS:
            return { ...state, donations: action.payload }
        case SETTOKEN:
            return { ...state, access_token: action.payload }
        case SET_USER_DONATIONS:
            return { ...state, userDonations: action.payload }

        default:
            return state
    }
}

export default reducer