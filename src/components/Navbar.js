import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { logoutAction } from "../context/authActions";
import { useUserAuth } from "../context/GlobalState";

const Navbar = () => {
  const navigate = useNavigate();
  const { auth, dispatch } = useUserAuth();

  const handleLogout = () => {
    logoutAction(dispatch, navigate);
  };

  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Firebase App
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mynavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="mynavbar">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/gallery">
                Gallery
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="">
                Link
              </Link>
            </li>
          </ul>
          <form className="d-flex">
            <ul>
              <li className="nav-item">
                <Link className="nav-link" to="/register">
                  Register
                </Link>
              </li>
            </ul>
            {!auth?.isAuth ? (
              <ul>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
              </ul>
            ) : (
              <ul>
                <li className="nav-item">
                  <button
                    onClick={handleLogout}
                    className="btn btn-primary"
                    type="button"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            )}
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
