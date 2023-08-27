import React from "react";
import "../assets/css/styles.css";

const IndexScreen = () => {
  const client_id = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  const redirect_url = process.env.REACT_APP_GOOGLE_OAUTH_REDIRECT_URL;

  const handleGoogleSignIn = () => {
    // Implement Google sign-in logic here
    const scopes = [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ];

    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?scope=${encodeURIComponent(
      scopes.join(" ")
    )}&response_type=code&redirect_uri=${encodeURIComponent(
      redirect_url
    )}&client_id=${encodeURIComponent(
      client_id
    )}&access_type=offline&prompt=consent`;

    window.location.href = authUrl;
  };

  return (
    <div className="container">
      <div className="login">
        <div className="login__content">
          <form className="login__form">
            <div>
              <h1 className="login__title">
                <span>Welcome</span>
              </h1>
              <p className="login__description">
                Please login with your institute email ID to place an order for
                milk and curd.
              </p>
            </div>

            <div>
              <div className="login__buttons">
                <button
                  className="login__button"
                  type="button"
                  onClick={handleGoogleSignIn}
                >
                  <i
                    className="ri-google-fill "
                    id="input_icon"
                    style={{ margin: "auto", padding: "10px", height: "5px" }}
                  ></i>
                  Log In With Google
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default IndexScreen;
