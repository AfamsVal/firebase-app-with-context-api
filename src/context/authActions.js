import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase";

export const loginAction = async (dispatch, user) => {
  try {
    await signInWithEmailAndPassword(auth, user.email, user.password);
    dispatch({
      type: "LOGIN",
      payload: user,
    });
  } catch (error) {
    dispatch({
      type: "AUTH_ERROR",
      payload: error.code,
    });
  }
};

export const registerAction = async (dispatch, user) => {
  try {
    await createUserWithEmailAndPassword(auth, user.email, user.password);
    dispatch({
      type: "REGISTER",
    });
  } catch (error) {
    dispatch({
      type: "AUTH_ERROR",
      payload: error.code,
    });
  }
};

export const clearErrorAction = (dispatch) => {
  dispatch({
    type: "AUTH_ERROR",
    payload: null,
  });
};

export const logoutAction = async (dispatch, navigate) => {
  try {
    await signOut(auth);
    dispatch({
      type: "LOGOUT",
    });
    navigate("/login");
  } catch (error) {
    dispatch({
      type: "AUTH_ERROR",
      payload: error.code,
    });
  }
};
