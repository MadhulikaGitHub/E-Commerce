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

export const categoriesReducer = (state = { categories: [] }, action) => {
    switch (action.type) {
        case ALL_CATEGORY_REQUEST:
            return {
                loading: true,
                categories: [],
            };
        case ALL_CATEGORY_SUCCESS:
            return {
                loading: false,
                categories: action.payload.data,
            };
        case ALL_CATEGORY_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        case CATEGORY_CREATE_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case CATEGORY_CREATE_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                category: action.payload,
            };
        case CATEGORY_CREATE_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case CATEGORY_UPDATE_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case CATEGORY_UPDATE_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                category: action.payload,
            };
        case CATEGORY_UPDATE_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case CATEGORY_DELETE_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case CATEGORY_DELETE_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
            };
        case CATEGORY_DELETE_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};
