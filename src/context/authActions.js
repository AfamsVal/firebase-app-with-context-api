import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  // FacebookAuthProvider,
  // GithubAuthProvider,
  // TwitterAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

const timeStamp = serverTimestamp();

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
export const forgotPwdAction = async (dispatch, email) => {
  try {
    return await sendPasswordResetEmail(auth, email);
  } catch (error) {
    dispatch({
      type: "AUTH_ERROR",
      payload: error.code,
    });
  }
};

export const registerAction = async (dispatch, user) => {
  try {
    const res = await createUserWithEmailAndPassword(
      auth,
      user.email,
      user.password
    );

    const { password, ...userDetails } = user;
    //setDoc (doc(db name, collection name, id name))
    await setDoc(doc(db, "users", res?.user?.uid), {
      ...userDetails,
      timeStamp,
    });

    await signOut(auth);

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
    localStorage.removeItem("userInfo");
    navigate("/login");
  } catch (error) {
    dispatch({
      type: "AUTH_ERROR",
      payload: error.code,
    });
  }
};

export const googleSignInAction = async (dispatch, navigate) => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    dispatch({
      type: "LOGIN",
      payload: result.user,
    });
    navigate("/");
  } catch (error) {
    dispatch({
      type: "AUTH_ERROR",
      payload: error.code,
    });
  }
};
