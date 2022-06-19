import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import { clearErrorAction, forgotPwdAction } from "../../context/authActions";
import { useUserAuth } from "../../context/GlobalState";

const ForgotPwd = () => {
  const { store, dispatch } = useUserAuth();
  const emailRef = useRef();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState(false);

  useEffect(() => {
    if (store?.errorMessage) {
      setError({ code: store.errorMessage });
      setLoading(false);

      setTimeout(() => {
        clearErrorAction(dispatch);
        setError("");
      }, 3000);
    }
  }, [store, dispatch]);

  const handleForgotPwd = () => {
    if (loading) return;
    if (!emailRef.current.value) {
      return setError({ code: "Please enter email" });
    } else {
      setError("");
    }
    setSuccess(false);
    setLoading(true);
    forgotPwdAction(dispatch, emailRef.current.value).then(() => {
      setSuccess(true);
      setLoading(false);
      setError("");
    });
  };

  return (
    <Layout>
      <div className="row">
        <div className="col-md-6 offset-md-3 mt-5 pt-5">
          <h2 className="text-center"> Recover Password</h2>
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
            {success && (
              <p className="text-success">
                <strong>Please check you mail for password reset!</strong>
              </p>
            )}{" "}
            <button
              onClick={handleForgotPwd}
              type="button"
              className="btn btn-primary"
            >
              Recover Now{" "}
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
            </button>
          </form>
          <div className="mt-4">
            <Link to="/login" className="">
              Login Now?
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ForgotPwd;
