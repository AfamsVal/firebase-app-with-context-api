import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";

export const usersCollectionRef = collection(db, "admin");

const timeStamp = serverTimestamp();

export const allUsersAction = async (dispatch) => {
  try {
    const data = await getDocs(usersCollectionRef);
    const res = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    dispatch({
      type: "ALL_USERS",
      payload: res,
    });
  } catch (error) {
    dispatch({
      type: "ERROR_MSG",
      payload: error.code,
    });
  }
};

export const addUser = async (dispatch, user) => {
  try {
    dispatch({
      type: "ADDING_USERS",
    });
    const data = await addDoc(usersCollectionRef, {
      ...user,
      timeStamp,
    });
    if (data.id) {
      const userDoc = doc(db, "admin", data.id);
      await updateDoc(userDoc, { id: data.id });
      dispatch({
        type: "ADD_USER",
        payload: {
          ...user,
          id: data.id,
          timeStamp,
        },
      });
    }
  } catch (error) {
    dispatch({
      type: "ERROR_MSG",
      payload: error.code,
    });
  }
};

export const updateUser = async (dispatch, userDetails) => {
  try {
    dispatch({
      type: "UPDATING_USERS",
    });
    const userDoc = doc(db, "admin", userDetails.id);
    const data = await updateDoc(userDoc, userDetails);
    dispatch({
      type: "UPDATE_USER",
      payload: {
        ...userDetails,
        timeStamp: data?.updateTime || data?.createTime || new Date(),
      },
    });
    allUsersAction(dispatch);
  } catch (error) {
    dispatch({
      type: "ERROR_MSG",
      payload: error.code,
    });
  }
};

export const deleteUserAction = async (dispatch, userId) => {
  try {
    dispatch({
      type: "DELETING_USERS",
    });
    const userDoc = doc(db, "admin", userId);
    const data = await deleteDoc(userDoc);
    console.log("delete-dddd", data);
    dispatch({
      type: "DELETE_USER",
      payload: userId,
    });

    allUsersAction(dispatch);
  } catch (error) {
    dispatch({
      type: "ERROR_MSG",
      payload: error.code,
    });
  }
};
