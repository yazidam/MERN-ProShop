import {
  PIN_LIST_FAIL,
  PIN_LIST_REQUEST,
  PIN_LIST_SUCCESS,
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
