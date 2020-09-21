import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import IconButton from "@material-ui/core/IconButton";
import VolverIcon from "@material-ui/icons/ArrowBack";
import { Link } from "react-router-dom";
import LoginButton from "./LoginButton";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Layout = ({ children, backUrl }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          {backUrl && (
            <IconButton
              edge="start"
              color="inherit"
              component={Link}
              to={backUrl}
            >
              <VolverIcon />
            </IconButton>
          )}
          <Typography variant="h6" className={classes.title}>
            Barapp
          </Typography>
          <LoginButton />
        </Toolbar>
      </AppBar>

      <Container maxWidth="sm" style={{ padding: 20 }}>
        {children}
      </Container>
    </div>
  );
};

export default Layout;
