import React from "react";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import User from "../assets/icons/User";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  avatar: ({ hasPhoto }) => ({
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
    border: hasPhoto ? "none" : "3px solid #232326",
    fontWeight: 800,
    textTransform: "uppercase",
    width: 32,
    height: 32,
  }),
  user: {
    paddingTop: 10,
  },
}));

const LoginButton = () => {
  const {
    loginWithRedirect,
    isAuthenticated,
    isLoading: isAuthLoading,
    user,
  } = useAuth0();

  const classes = useStyles({ hasPhoto: user?.picture ? true : false });

  return (
    <>
      {!isAuthenticated && (
        <div className={classes.user}>
          <IconButton
            disabled={isAuthLoading}
            color="inherit"
            onClick={() => loginWithRedirect()}
            className={classes.user}
          >
            <User />
          </IconButton>
        </div>
      )}
      {isAuthenticated && (
        <div className={classes.user}>
          {/* {user.nickname} */}
          <IconButton color="inherit" component={Link} to={"/account"}>
            <Avatar
              className={classes.avatar}
              src={user.picture}
              alt={user.nickname}
            >
              {user.name[0].toUpperCase()}
            </Avatar>
          </IconButton>
        </div>
      )}
    </>
  );
};

export default LoginButton;
