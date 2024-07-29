import {
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,
    ALL_PRODUCT_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    CREATE_PRODUCT_REQUEST,
    CREATE_PRODUCT_SUCCESS,
    CREATE_PRODUCT_FAIL,
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAIL,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAIL,
    CLEAR_ERRORS
} from '../constants/ProductContants'

import axios from 'axios'

// Get All Products
export const getProducts = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_PRODUCT_REQUEST })
        let link = 'https://api-jlsm.onrender.com/api/products'
        const { data } = await axios.get(link)
        dispatch({
            type: ALL_PRODUCT_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ALL_PRODUCT_FAIL,
            payload: error.response.data.message
        })
    }
}

// Get Product Details
export const getProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST })
        let link = `https://api-jlsm.onrender.com/api/getProductDetail/${id}`
        const { data } = await axios.get(link)
        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data
        })
    } catch (err) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: err.response.data.message
        })
    }
}

// Create a Product
export const createProduct = (productData) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_PRODUCT_REQUEST })
        const config = { headers: { 'Content-Type': 'multipart/form-data' } }
        const { data } = await axios.post('https://api-jlsm.onrender.com/api/product/create', productData, config)
        dispatch({
            type: CREATE_PRODUCT_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: CREATE_PRODUCT_FAIL,
            payload: error.response.data.message
        })
    }
}

// Update a Product
export const updateProduct = (id, productData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PRODUCT_REQUEST })
        const config = { headers: { 'Content-Type': 'multipart/form-data' } }
        const { data } = await axios.post(`https://api-jlsm.onrender.com/api/product/updateProduct/${id}`, productData, config)
        dispatch({
            type: UPDATE_PRODUCT_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: UPDATE_PRODUCT_FAIL,
            payload: error.response.data.message
        })
    }
}

// Delete a Product
export const deleteProduct = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_PRODUCT_REQUEST })
        const { data } = await axios.get(`https://api-jlsm.onrender.com/api/product/deleteProduct/${id}`)
        dispatch({
            type: DELETE_PRODUCT_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: DELETE_PRODUCT_FAIL,
            payload: error.response.data.message
        })
    }
}

// Clear Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS })
}
