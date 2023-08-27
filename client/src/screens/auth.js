import React, { useCallback, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom"; // Assuming you're using React Router for navigation

const AuthScreen = () => {
  const navigate = useNavigate();

  const [params] = useSearchParams();

  const authorizationCode = params.get("code");

  const getAuthorizationCode = useCallback(async () => {
    const apiurl = process.env.REACT_APP_API_URL;

    if (authorizationCode) {
      console.log(authorizationCode);

      // Now send the authorization code to your backend to exchange it for an access token
      const response = await fetch(`${apiurl}/auth/google/exchange`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code: authorizationCode }),
      });

      const data = await response.json();

      // Now you can handle storing the access token, user data, etc. in your app state
      // Navigate to the appropriate screen in your app
      if (response.ok) {
        localStorage.setItem("token", data.token);
        navigate("/order"); // For example, navigate to the dashboard after successful authentication
      }
    } else {
      // Handle error or user denied permission
      console.error("No authorization code found.");
    }
  }, [authorizationCode, navigate]);

  useEffect(() => {
    try {
      getAuthorizationCode();
    } catch (error) {
      console.log(error);
    }
  }, [getAuthorizationCode, authorizationCode]);

  return (
    <div>
      <h1>Authenticating...</h1>
    </div>
  );
};

export default AuthScreen;
