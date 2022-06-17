import React, { useEffect, useState } from "react";
import { useUserAuth } from "../../context/GlobalState";
import { addUser } from "../../context/userAction";

const AddUser = () => {
  const {
    dispatch,
    store: {
      users: { loading, isCompleted },
    },
  } = useUserAuth();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState(Math.floor(Math.random() * 70) + 18);

  useEffect(() => {
    if (isCompleted) {
      setFirstName("");
      setLastName("");
      setEmail("");
      setAge(Math.floor(Math.random() * 70) + 18);
    }
  }, [isCompleted]);

  const handleSubmit = (e) => {
    e.preventDefault();
    addUser(dispatch, { firstName, lastName, email, age });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <h2>ADD USER</h2>
      </div>
      <div className="form-group mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Enter First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <div className="form-group mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Enter Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <div className="form-group mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Add User{" "}
        {loading && <span className="spinner-border spinner-border-sm"></span>}
      </button>
    </form>
  );
};

export default AddUser;
