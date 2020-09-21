import React from "react";
import Button from "@material-ui/core/Button";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

const LoginButton = () => {
  const {
    loginWithRedirect,
    isAuthenticated,
    isLoading: isAuthLoading,
    user,
  } = useAuth0();

  return (
    <>
      {!isAuthenticated && (
        <Button
          disabled={isAuthLoading}
          color="inherit"
          onClick={() => loginWithRedirect()}
        >
          Ingresar
        </Button>
      )}
      {isAuthenticated && (
        <Button color="inherit" component={Link} to={"/account"}>
          {user.nickname}
        </Button>
      )}
    </>
  );
};

export default LoginButton;
