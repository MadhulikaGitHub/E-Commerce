import { createStore, combineReducers, applyMiddleware } from 'redux'
import { thunk } from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension'
import { categoriesReducer } from './reducers/CategoryReducer';
import { productDetailsReducer, productReducer } from './reducers/ProductReducer';
import { cartReducer } from './reducers/CartReducer';
import { sliderReducer } from './reducers/SliderReducer';
import { userRegisterReducer } from './reducers/UserReducer';
import { myOrdersReducer, newOrderReducer, orderDetailsReducer } from './reducers/OrderReducer';

const reducer = combineReducers({
    cat: categoriesReducer,
    prod: productReducer,
    pDetail: productDetailsReducer,
    cart: cartReducer,
    slide: sliderReducer,
    auth: userRegisterReducer,
    newOrder: newOrderReducer,
    myOrders: myOrdersReducer,
    orderDetail: orderDetailsReducer,
})

let initializeState = {
    cart: {
        cartItems: localStorage.getItem('cart123')
            ? JSON.parse(localStorage.getItem('cart123'))
            : [],
        shippingInfo: localStorage.getItem("shippingInfo")
            ? JSON.parse(localStorage.getItem("shippingInfo"))
            : {},
    }

}

const Store = createStore(reducer, initializeState, composeWithDevTools(applyMiddleware(thunk)))

export default Store