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

const initialState = {
    products: [],
    productDetail: {},
    loading: false,
    error: null,
    success: false,
}

export const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case ALL_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true,
                products: [],
            }
        case ALL_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                products: action.payload.allProducts,
            }
        case ALL_PRODUCT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }

        case CREATE_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true,
                success: false,
            }
        case CREATE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                products: [...state.products, action.payload]
            }
        case CREATE_PRODUCT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }

        case UPDATE_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true,
                success: false,
            }
        case UPDATE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                products: state.products.map(product => 
                    product._id === action.payload._id ? action.payload : product
                ),
            }
        case UPDATE_PRODUCT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }

        case DELETE_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true,
                success: false,
            }
        case DELETE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                products: state.products.filter(product => product._id !== action.payload._id),
            }
        case DELETE_PRODUCT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
                success: false,
            }
        default:
            return state
    }
}

export const productDetailsReducer = (state = initialState, action) => {
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
                productDetail: {},
            }
        case PRODUCT_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                productDetail: action.payload.productDetail,
            }
        case PRODUCT_DETAILS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            }
        default:
            return state
    }
}
