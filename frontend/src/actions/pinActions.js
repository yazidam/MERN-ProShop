import {
  PIN_LIST_FAIL,
  PIN_LIST_REQUEST,
  PIN_LIST_SUCCESS,
  PIN_CREATE_FAIL,
  PIN_CREATE_REQUEST,
  PIN_CREATE_SUCCESS,
} from "../constants/pinConstants";
import axios from "axios";

export const listPins = () => async (dispatch, getState) => {
  // get statte to get token
  try {
    dispatch({ type: PIN_LIST_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        //when we send data we whon send in the headres a contenet type
        // "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/pin/get_all_pins`, config);
    dispatch({
      type: PIN_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    // alert("hhhhh");
    dispatch({
      type: PIN_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.error.response.data.message
          : error.message,
    });
  }
};

export const createPin =
  (title, desc, rating, { lat }, { long }) =>
  async (dispatch, getState) => {
    // get statte to get token
    try {
      dispatch({ type: PIN_CREATE_REQUEST });
      const {
        userLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          //when we send data we whon send in the headres a contenet type
          // "Content-Type": "application/json",   //token because rouet id protect
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.post(
        `/api/pin/`,
        { title, desc, rating, lat, long },
        config
      );
      dispatch({
        type: PIN_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      // alert("hhhhh");
      dispatch({
        type: PIN_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.error.response.data.message
            : error.message,
      });
    }
  };
