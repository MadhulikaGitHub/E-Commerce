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

import axios from 'axios'

export const createUser = (formData) => async (dispatch) => {
    try {
        dispatch({ type: REGISTER_USER_REQUEST })
        let link = 'https://api-jlsm.onrender.com/api/userInsert'

        const { data } = await axios.post(link, formData)
        //console.log(data)

        dispatch({
            type: REGISTER_USER_SUCCESS,
            payload: data
        })
    } catch (err) {
        dispatch({
            type: REGISTER_USER_FAIL,
            payload: err.response.data.message
        })
    }
}

export const loginUser = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_REQUEST })

        const config = {
            headers: {
                "content-type": "application/json",
            }
        };

        let link = 'https://api-jlsm.onrender.com/api/verifyLogin'

        const { data } = await axios.post(link, { email, password }, config)
        // console.log(data)

        dispatch({
            type: LOGIN_SUCCESS,
            payload: data.user
        })
    } catch (err) {
        dispatch({
            type: LOGIN_FAIL,
            payload: err.response.data.message
        })
    }
}

export const updatePassword = (oldPassword, newPassword, confirmPassword) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PASSWORD_REQUEST });

        if (!oldPassword || !newPassword || !confirmPassword) {
            return dispatch({ type: UPDATE_PASSWORD_FAIL, payload: 'All fields are required' });
        }

        if (newPassword !== confirmPassword) {
            return dispatch({ type: UPDATE_PASSWORD_FAIL, payload: 'New password and confirm password do not match' });
        }

        if (newPassword.length < 8) {
            return dispatch({ type: UPDATE_PASSWORD_FAIL, payload: 'New password must be at least 8 characters long' });
        }

        if (oldPassword === newPassword) {
            return dispatch({ type: UPDATE_PASSWORD_FAIL, payload: 'New password must be different from old password' });
        }

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const link = 'https://api-jlsm.onrender.com/api/updatePassword'

        const { data } = await axios.post(link, { oldPassword, newPassword, confirmPassword }, config);
        console.log(data)
        dispatch(
            {
                type: UPDATE_PASSWORD_SUCCESS,
                payload: data
            });
    } catch (error) {
        dispatch(
            {
                type: UPDATE_PASSWORD_FAIL,
                payload: error.response.data.message
            });
    }
};

// for clearing errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};