const GlobalState = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isAuth: true,
        user: action.payload,
      };

    case "LOGOUT":
      return {
        ...state,
        isAuth: false,
        user: {},
      };
    case "REGISTER":
      return {
        ...state,
        isRegSuccess: true,
      };
    case "UPDATE_USER":
      return {
        ...state,
        user: action.payload,
      };
    case "AUTH_ERROR":
      return {
        ...state,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};

export default GlobalState;
