import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Layout from "../components/Layout";
import { useUserAuth } from "../context/GlobalState";
import AddUser from "../components/add-user/AddUser";
import { allUsersAction, deleteUserAction } from "../context/userAction";
import ModalBox from "../components/modal/ModalBox";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

const Dashboard = () => {
  const { store, dispatch } = useUserAuth();
  const [clickedId, setClickedId] = useState(null);

  const {
    users: { loadingDelete },
  } = store;

  useEffect(() => {
    allUsersAction(dispatch);

    //method 2: snapshot realtime listener
    /////////////////////////////////////////
    // const unsub = onSnapshot(
    //   collection(db, "admin"),
    //   (snapshot) => {
    //     const data = snapshot.docs.map((doc) => ({
    //       ...doc.data(),
    //       id: doc.id,
    //     }));
    //     dispatch({
    //       type: "ALL_USERS",
    //       payload: data,
    //     });
    //   },
    //   (error) => {
    //     dispatch({
    //       type: "ERROR_MSG",
    //       payload: error.code,
    //     });
    //   }
    // );

    // return () => {
    //   unsub();
    // };
  }, [dispatch]);

  const deleteHandler = (id) => {
    setClickedId(id);
    deleteUserAction(dispatch, id);
  };

  console.log("online", window.navigator && window.navigator.onLine);
  console.log("OS", window.navigator && window.navigator.operatingSystem);
  console.log("platform", window.navigator && window.navigator.platform);
  console.log("userAgent", window.navigator && window.navigator.userAgent);
  console.log("vendor", window.navigator && window.navigator.vendor);
  console.log("product", window.navigator && window.navigator.product);
  console.log("vendorSub", window.navigator && window.navigator.vendorSub);
  console.log("productSub", window.navigator && window.navigator.productSub);
  console.log("appName", window.navigator && window.navigator.appName);
  console.log("appVersion", window.navigator && window.navigator.appVersion);
  console.log("others", window.navigator);
  return store?.isAuth ? (
    <Layout>
      <div className="row mx-3">
        <div className="col-md-6 mx-auto p-5">
          <AddUser />{" "}
        </div>

        <div
          className="col-md-6 mx-auto p-5"
          style={{ height: "70vh", overflowY: "auto" }}
        >
          <h1 className="text-capitalize mb-3">ADMIN USERS</h1>
          {!store?.users && <p className="my-5">Loading...</p>}
          {store?.users?.data?.map((user) => (
            <div key={user.id} className="mb-3">
              <ul>
                <li>Firstname: {user.firstName}</li>
                <li>Lastname: {user.lastName}</li>
                <li>Age: {user.age}</li>
              </ul>
              <div style={{ marginLeft: "32px" }}>
                <ModalBox user={user} />
                &nbsp; &nbsp;
                <button
                  onClick={() => deleteHandler(user.id)}
                  className="btn btn-sm btn-danger"
                >
                  {loadingDelete && clickedId === user.id ? (
                    <span className="spinner-border spinner-border-sm"></span>
                  ) : (
                    <i className="fa fa-trash"></i>
                  )}
                </button>
              </div>
              <hr />{" "}
            </div>
          ))}
        </div>
      </div>
    </Layout>
  ) : (
    <Navigate to="/login"></Navigate>
  );
};

export default Dashboard;
