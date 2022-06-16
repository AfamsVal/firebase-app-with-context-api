import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Layout from "../components/Layout";
import { useUserAuth } from "../context/GlobalState";
import AddUser from "../components/add-user/AddUser";
import { allUsersAction, deleteUserAction } from "../context/userAction";
import ModalBox from "../components/modal/ModalBox";

const Dashboard = () => {
  const { auth, dispatch } = useUserAuth();
  const [clickedId, setClickedId] = useState(null);

  const {
    users: { loadingDelete },
  } = auth;

  useEffect(() => {
    allUsersAction(dispatch);
  }, [dispatch]);

  const deleteHandler = (id) => {
    setClickedId(id);
    deleteUserAction(dispatch, id);
  };

  return auth?.isAuth ? (
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
          {!auth?.users && <p className="my-5">Loading...</p>}
          {auth?.users?.data?.map((user) => (
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
