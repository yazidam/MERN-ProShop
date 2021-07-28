import { CART_ADD_ITEM, CART_REMOVE_ITEM,CART_SAVE_SHIPPING_ADDRESS } from '../constants/cartConstants';

export const cartReducer = (state = { cartItems: [], shippingAddress:{} }, action) => {
  //state heya inatial state  // [] you can have more item in the cart
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;

      const existItem = state.cartItems.find((x) => x.product === item.product);
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item], //cartitem n5tho state.carteitems 9dima ou nzidouha item jdid
        };
      }
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      };


     case CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress:  action.payload
      }; 
    default:
      return state;
  }
};
