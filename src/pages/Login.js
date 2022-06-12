import React, { useRef, useEffect } from "react";
import GoogleButton from "react-google-button";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import {
  clearErrorAction,
  googleSignInAction,
  loginAction,
} from "../context/authActions";
import { useUserAuth } from "../context/GlobalState";

const Login = () => {
  let navigate = useNavigate();
  const { auth, dispatch } = useUserAuth();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  useEffect(() => {
    if (auth?.isAuth) {
      navigate("/");
      setLoading(false);
    }
    if (auth?.errorMessage) {
      setError({ code: auth.errorMessage });
      setLoading(false);

      setTimeout(() => {
        clearErrorAction(dispatch);
        setError("");
      }, 3000);
    }
  }, [auth, navigate, dispatch]);

  const handleLogin = () => {
    if (loading) return;
    const loginInfo = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    if (!loginInfo.email || !loginInfo.password) {
      return setError("Please enter email and password");
    } else {
      setError("");
    }
    setLoading(true);

    loginAction(dispatch, loginInfo);
  };
  return (
    <Layout>
      <div className="row">
        <div className="col-md-6 offset-md-3 mt-5 pt-5">
          <h2 className="text-center"> Login Now</h2>
          <form>
            <div className="mb-3 mt-3">
              <label htmlFor="email" className="form-label">
                Email:
              </label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                ref={emailRef}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="pwd" className="form-label">
                Password:
              </label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                ref={passwordRef}
              />
            </div>
            <div className="form-check mb-3">
              <label className="form-check-label">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="remember"
                />{" "}
                Remember me
              </label>
            </div>
            {error?.code && <p className="text-danger">{error?.code}</p>}{" "}
            <button
              onClick={handleLogin}
              type="button"
              className="btn btn-primary"
            >
              Login{" "}
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
            </button>
          </form>
          <div className="mt-5">
            <GoogleButton
              onClick={() => googleSignInAction(dispatch, navigate)}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
