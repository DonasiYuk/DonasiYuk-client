import { SETDONATIONS,SETTOKEN } from '../actionType'

const initialState = {
    donations: [],
    access_token: ""
}

function reducer(state = initialState, action) {
    switch (action.type) {
        case SETDONATIONS:
            return { ...state, donations: action.payload }
        case SETTOKEN:
            return { ...state, access_token: action.payload }

        default:
            return state
    }
}

export default reducer