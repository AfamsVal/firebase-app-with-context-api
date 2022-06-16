const GlobalState = (state, action) => {
  let data;
  switch (action.type) {
    case "LOGIN":
      data = {
        ...state,
        isAuth: true,
        user: action.payload,
      };
      localStorage.setItem("userInfo", JSON.stringify(data));
      return data;
    case "LOGOUT":
      return {
        errorMessage: null,
        isAuth: false,
        isRegSuccess: false,
        user: {},
        users: [],
      };
    case "REGISTER":
      return {
        ...state,
        isRegSuccess: true,
      };

    case "UPDATING_USERS":
      return {
        ...state,
        users: {
          ...state.users,
          isUpdateCompleted: false,
          loadingUpdate: true,
        },
      };
    case "UPDATE_USER":
      return {
        ...state,
        users: {
          ...state.users,
          isUpdateCompleted: true,
          loadingUpdate: false,
          data: state.users.data.map((user) => {
            if (user.id === action.payload.id) {
              return { ...user, ...action.payload };
            }
            return user;
          }),
        },
      };
    case "AUTH_ERROR":
      return {
        ...state,
        errorMessage: action.payload,
      };
    case "ALL_USERS":
      data = {
        ...state,
        users: {
          ...state.users,
          data: action.payload,
        },
      };
      localStorage.setItem("userInfo", JSON.stringify(data));
      return data;
    case "ADD_USER":
      data = {
        ...state,
        users: {
          ...state.users,
          loading: false,
          isCompleted: true,
          data: [action.payload, ...state.users.data],
        },
      };
      localStorage.setItem("userInfo", JSON.stringify(data));
      return data;
    case "ADDING_USERS":
      return {
        ...state,
        users: {
          ...state.users,
          loading: true,
          isCompleted: false,
        },
      };
    case "DELETE_USER":
      data = {
        ...state,
        users: {
          ...state.users,
          loadingDelete: false,
          data: state.users.data.filter((user) => user.id !== action.payload),
        },
      };
      localStorage.setItem("userInfo", JSON.stringify(data));
      return data;
    case "DELETING_USERS":
      return {
        ...state,
        users: {
          ...state.users,
          loadingDelete: true,
        },
      };

    case "ERROR_MSG":
      return {
        ...state,
        errorMessage: action.payload,
      };

    default:
      return state;
  }
};

export default GlobalState;
