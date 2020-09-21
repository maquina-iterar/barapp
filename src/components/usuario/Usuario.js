import React from "react";
import Layout from "../Layout";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import PersonIcon from "@material-ui/icons/ArrowForwardIos";
import EmailIcon from "@material-ui/icons/Email";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { useAuth0 } from "@auth0/auth0-react";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";

const socialNetworks = {
  "google-oauth2": "Google",
};

const useStyles = makeStyles((theme) => ({
  avatar: {
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

const Usuario = () => {
  const { isAuthenticated, user, logout } = useAuth0();

  const classes = useStyles();

  const redSocial = user && user.sub.split("|")[0];

  return (
    <Layout backUrl="/">
      <Card>
        {isAuthenticated && (
          <CardContent>
            <List disablePadding>
              <ListItem>
                <ListItemIcon>
                  <Avatar
                    className={classes.avatar}
                    src={user.picture}
                    alt={user.nickname}
                  >
                    {user.name[0]}
                  </Avatar>
                </ListItemIcon>
                <ListItemText
                  style={{ marginLeft: 20 }}
                  primary={user.nickname}
                  secondary={socialNetworks[redSocial]}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText primary={user.name} />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <EmailIcon />
                </ListItemIcon>
                <ListItemText primary={user.email} />
              </ListItem>
              <ListItem
                button
                onClick={() => logout({ returnTo: window.location.origin })}
              >
                <ListItemIcon>
                  <ExitToAppIcon />
                </ListItemIcon>
                <ListItemText primary={"Salir"} />
              </ListItem>
            </List>
          </CardContent>
        )}
      </Card>
    </Layout>
  );
};

export default Usuario;
