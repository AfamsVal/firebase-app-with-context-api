import React from "react";
import { Navigate } from "react-router-dom";
import Layout from "../components/Layout";
import { useUserAuth } from "../context/GlobalState";

const Dashboard = () => {
  const { auth } = useUserAuth();
  return auth?.isAuth ? (
    <Layout>
      <div className="row">
        <div className="col-md-10 mx-auto">
          <h1 className="text-center text-capitalize">Dashboard</h1>
          <p>User: {auth?.user?.email}</p>
        </div>
        <div className="col-md-10 mx-auto">
          <button onClick={() => {}}>View Details</button>
        </div>
      </div>
    </Layout>
  ) : (
    <Navigate to="/login"></Navigate>
  );
};

export default Dashboard;
