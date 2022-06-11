import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { clearErrorAction, registerAction } from "../context/authActions";
import { useUserAuth } from "../context/GlobalState";

const Register = () => {
  let navigate = useNavigate();
  const { auth, dispatch } = useUserAuth();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  useEffect(() => {
    if (auth.isRegSuccess) {
      navigate("/login");
      setLoading(false);
    }
    if (auth.errorMessage) {
      setError({ code: auth.errorMessage });
      setLoading(false);

      setTimeout(() => {
        clearErrorAction(dispatch);
        setError(null);
      }, 3000);
    }
  }, [auth, navigate, dispatch]);

  const handleRegister = () => {
    if (loading) return;
    const user = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    if (!user.email || !user.password) {
      return setError({ code: "Please enter email and password" });
    } else {
      setError(null);
    }
    setLoading(true);

    registerAction(dispatch, user);
  };

  return (
    <Layout>
      <div className="row">
        <div className="col-md-6 offset-md-3 mt-5 pt-5">
          <h2 className="text-center"> Register Now</h2>
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
            {error?.code && <p className="text-danger">{error?.code}</p>}
            <button
              onClick={handleRegister}
              type="button"
              className="btn btn-primary"
            >
              Register{" "}
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
