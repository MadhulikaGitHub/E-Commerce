import {
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_RESET,
    UPDATE_PROFILE_FAIL,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_RESET,
    UPDATE_PASSWORD_FAIL,
    CLEAR_ERRORS
} from '../constants/UserConstant'

export const userRegisterReducer = (state = { user: {} }, action) => {

    switch (action.type) {

        case REGISTER_USER_REQUEST:
        case LOGIN_REQUEST:
        case UPDATE_PASSWORD_REQUEST:
            return {
                loading: true,
                isAuthenticated: false
            }
        case REGISTER_USER_SUCCESS:
        case LOGIN_SUCCESS:
            return {
                loading: false,
                isAuthenticated: true,
                user: action.payload
            }
        case UPDATE_PASSWORD_SUCCESS:
            return {
                loading: false,
                isAuthenticated: true,
                message: action.payload
            }
        case REGISTER_USER_FAIL:
        case LOGIN_FAIL:
        case UPDATE_PASSWORD_FAIL:
            return {
                loading: false,
                isAuthenticated: false,
                error: action.payload,
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            }
        default: return state

    }
}