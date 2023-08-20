import React, { useState } from "react";
import "../assets/css/styles.css";

const UpdatePasswordScreen = () => {
  const [currentPasswordVisible, setCurrentPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [reenterPasswordVisible, setReenterPasswordVisible] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    currentpassword: "",
    newpassword: "",
    reenterpassword: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const togglePasswordVisibility = (field) => {
    if (field === "currentpassword") {
      setCurrentPasswordVisible((prevVisible) => !prevVisible);
    } else if (field === "newpassword") {
      setNewPasswordVisible((prevVisible) => !prevVisible);
    } else if (field === "reenterpassword") {
      setReenterPasswordVisible((prevVisible) => !prevVisible);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
  };

  return (
    <div className="container">
      <div className="login">
        <div className="login__content">
          <form className="login__form" onSubmit={handleSubmit}>
            <div>
              <h1 className="login__title">
                <span>Update Password</span>
              </h1>
            </div>

            <div className="login__inputs">
              <div>
                <label htmlFor="username" className="login__label">
                  Registration Number
                </label>
                <input
                  className="login__input"
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Enter your Registration Number"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div>
                <label htmlFor="currentpassword" className="login__label">
                  Current Password
                </label>
                <div className="login__box">
                  <input
                    className="login__input"
                    type={currentPasswordVisible ? "text" : "password"}
                    id="currentpassword"
                    name="currentpassword"
                    placeholder="Enter your current password"
                    value={formData.currentpassword}
                    onChange={handleInputChange}
                    required
                  />
                  <i
                    className={`${
                      currentPasswordVisible ? "ri-eye-line" : "ri-eye-off-line"
                    } login__eye`}
                    id="input-icon"
                    onClick={() => togglePasswordVisibility("currentpassword")}
                  ></i>
                </div>
              </div>

              <div>
                <label htmlFor="newpassword" className="login__label">
                  New Password
                </label>
                <div className="login__box">
                  <input
                    className="login__input"
                    type={newPasswordVisible ? "text" : "password"}
                    id="newpassword"
                    name="newpassword"
                    placeholder="Enter your new password"
                    value={formData.newpassword}
                    onChange={handleInputChange}
                    required
                  />
                  <i
                    className={`${
                      newPasswordVisible ? "ri-eye-line" : "ri-eye-off-line"
                    } login__eye`}
                    id="input-icon"
                    onClick={() => togglePasswordVisibility("newpassword")}
                  ></i>
                </div>
              </div>

              <div>
                <label htmlFor="reenterpassword" className="login__label">
                  Re-Enter New Password
                </label>
                <div className="login__box">
                  <input
                    className="login__input"
                    type={reenterPasswordVisible ? "text" : "password"}
                    id="reenterpassword"
                    name="reenterpassword"
                    placeholder="Re-enter your new password"
                    value={formData.reenterpassword}
                    onChange={handleInputChange}
                    required
                  />
                  <i
                    className={`${
                      reenterPasswordVisible ? "ri-eye-line" : "ri-eye-off-line"
                    } login__eye`}
                    id="input-icon"
                    onClick={() => togglePasswordVisibility("reenterpassword")}
                  ></i>
                </div>
              </div>
            </div>

            <div className="login__buttons">
              <button className="login__button" type="submit">
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdatePasswordScreen;
