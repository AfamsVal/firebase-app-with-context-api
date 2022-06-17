import { Button, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { useUserAuth } from "../../context/GlobalState";
import { updateUser } from "../../context/userAction";
import "antd/dist/antd.min.css";

const ModalBox = ({ user }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    console.log("user", user);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const {
    dispatch,
    store: {
      users: { loadingUpdate, isUpdateCompleted },
    },
  } = useUserAuth();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    setFirstName(user.firstName);
    setLastName(user.lastName);
  }, [user]);

  useEffect(() => {
    if (isUpdateCompleted) {
      setFirstName("");
      setLastName("");
      handleCancel();
    }
  }, [isUpdateCompleted]);

  const handleUpdate = (e) => {
    e.preventDefault();
    updateUser(dispatch, { id: user.id, firstName, lastName });
  };

  return (
    <>
      <Button type="info" onClick={showModal}>
        <i className="fa fa-edit"></i> &nbsp; Edit
      </Button>

      <Modal
        title="Basic Modal"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[]}
      >
        <form onSubmit={handleUpdate}>
          <div>
            <h3>UPDATE USER</h3>
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
          <button type="submit" className="btn btn-primary">
            Update User{" "}
            {loadingUpdate && (
              <span className="spinner-border spinner-border-sm"></span>
            )}
          </button>
        </form>
      </Modal>
    </>
  );
};

export default ModalBox;
