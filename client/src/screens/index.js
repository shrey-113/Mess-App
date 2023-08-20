import React, { useState } from "react";
import "../assets/css/styles.css";

const IndexScreen = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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
                <span>Welcome</span>
              </h1>
              <p className="login__description">
                Please login to place an order for milk and curd.
              </p>
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
                <label htmlFor="password" className="login__label">
                  Password
                </label>
                <div className="login__box">
                  <input
                    className="login__input"
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                  <i
                    className={`${
                      showPassword ? "ri-eye-line" : "ri-eye-off-line"
                    } login__eye`}
                    id="input-icon"
                    onClick={togglePasswordVisibility}
                  ></i>
                </div>
              </div>
            </div>

            <div>
              <div className="login__buttons">
                <button className="login__button" type="submit">
                  Log In
                </button>
              </div>

              <button className="login__forgot">Update Password</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default IndexScreen;
