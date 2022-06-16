const userReducer = {
  loading: false,
  isCompleted: false,
  isUpdateCompleted: false,
  loadingUpdate: false,
  loadingDelete: false,
  data: [
    {
      id: "",
      firstName: "",
      lastName: "",
      gender: "",
      isMarried: "",
      age: "",
      timeStamp: "",
    },
  ],
};

export const initialState = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : {
      errorMessage: null,
      isAuth: false,
      isRegSuccess: false,
      user: {
        email: "",
        password: "",
        name: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        zip: "",
        country: "",
        userId: "",
        userType: "",
        userImageUrl: "",
      },
      users: userReducer,
    };
