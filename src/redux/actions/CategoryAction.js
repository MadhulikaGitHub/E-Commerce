import {
    ALL_CATEGORY_REQUEST,
    ALL_CATEGORY_SUCCESS,
    ALL_CATEGORY_FAIL,
    CATEGORY_CREATE_REQUEST,
    CATEGORY_CREATE_SUCCESS,
    CATEGORY_CREATE_FAIL,
    CATEGORY_UPDATE_REQUEST,
    CATEGORY_UPDATE_SUCCESS,
    CATEGORY_UPDATE_FAIL,
    CATEGORY_DELETE_REQUEST,
    CATEGORY_DELETE_SUCCESS,
    CATEGORY_DELETE_FAIL,
    CLEAR_ERRORS
} from '../constants/CategoryConstant';

import axios from 'axios';

// Get all categories
export const getCategory = () => async (dispatch) => {
    try {
        // To get data from api
        dispatch({ type: ALL_CATEGORY_REQUEST });
        let link = 'https://api-jlsm.onrender.com/api/getCategory';
        const { data } = await axios.get(link);

        // Success
        dispatch({
            type: ALL_CATEGORY_SUCCESS,
            payload: data
        });
    } catch (error) {
        // Failure
        dispatch({
            type: ALL_CATEGORY_FAIL,
            payload: error.response.data.message
        });
    }
};

// Insert category
export const insertCategory = (categoryData) => async (dispatch) => {
    try {
        dispatch({ type: CATEGORY_CREATE_REQUEST });

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };
        
        const { data } = await axios.post('https://api-jlsm.onrender.com/api/categoryInsert', categoryData, config);

        dispatch({
            type: CATEGORY_CREATE_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: CATEGORY_CREATE_FAIL,
            payload: error.response?.data?.message || 'Error creating category'
        });
    }
};


// Update category
export const updateCategory = (id, categoryData) => async (dispatch) => {
    try {
        dispatch({ type: CATEGORY_UPDATE_REQUEST });
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        };

        console.log('Updating category with ID:', id);
        console.log('Category data:', categoryData);
        
        const { data } = await axios.post(`https://api-jlsm.onrender.com/api/updateCategory/${id}`, categoryData, config);

        dispatch({
            type: CATEGORY_UPDATE_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: CATEGORY_UPDATE_FAIL,
            payload: error.response.data.message
        });
    }
};

// Delete category
export const deleteCategory = (id) => async (dispatch) => {
    try {
        dispatch({ type: CATEGORY_DELETE_REQUEST });
        const { data } = await axios.get(`https://api-jlsm.onrender.com/api/deleteCategory/${id}`);

        dispatch({
            type: CATEGORY_DELETE_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: CATEGORY_DELETE_FAIL,
            payload: error.response.data.message
        });
    }
};

// Clear errors
export const clearErrors = () => (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};
