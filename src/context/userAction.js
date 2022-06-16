import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase";

const usersCollectionRef = collection(db, "users");

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
    const data = await addDoc(usersCollectionRef, user);
    if (data.id) {
      dispatch({
        type: "ADD_USER",
        payload: {
          ...user,
          id: data?.id,
          timeStamp: data?.updateTime || new Date(),
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
    const userDoc = doc(db, "users", userDetails.id);
    const data = await updateDoc(userDoc, userDetails);
    console.log("update-dddd", data);

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
    const userDoc = doc(db, "users", userId);
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
