import {
  PIN_LIST_FAIL,
  PIN_LIST_REQUEST,
  PIN_LIST_SUCCESS,
  PIN_CREATE_FAIL,
  PIN_CREATE_REQUEST,
  PIN_CREATE_SUCCESS,
} from "../constants/pinConstants";

export const pinListReducer = (state = { pins: [] }, action) => {
  switch (action.type) {
    case PIN_LIST_REQUEST:
      return { loading: true };
    case PIN_LIST_SUCCESS:
      return { loading: false, pins: action.payload };
    case PIN_LIST_FAIL:
      return { loading: false, error: action.payload }; //send err in npayload

    default:
      return state;
  }
};

export const pinCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PIN_CREATE_REQUEST:
      return { loading: true };
    case PIN_CREATE_SUCCESS:
      return { loading: false, success: true, addpin: action.payload }; //send data in payload
    case PIN_CREATE_FAIL:
      return { loading: false, error: action.payload }; //send err in npayload
    // case PRODUCT_CREATE_RESET:
    //   return {};
    default:
      return state;
  }
};
