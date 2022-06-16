import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useReducer } from "react";
import { auth } from "../firebase";
import AppReducer from "./AppReducer";
import { initialState } from "./initialState";

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const unsub = onAuthStateChanged(auth, (data) => {
          if (data) {
            dispatch({ type: "LOGIN", payload: data });
          } else {
            dispatch({ type: "LOGOUT" });
          }
        });
        return () => {
          unsub();
        };
      } catch (error) {
        console.log("error::1", error);
      }
    };
    checkUser();
  }, []);

  return (
    <GlobalContext.Provider value={{ auth: state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useUserAuth = () => {
  return useContext(GlobalContext);
};
