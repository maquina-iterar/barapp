import React from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import theme from "./assets/theme";
import ListadoBares from "./components/bares/ListadoBares";
import DetalleBar from "./components/bares/DetalleBar";
import EditarBar from "./components/bares/EditarBar";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import { Auth0Provider } from "@auth0/auth0-react";
import environment from "./environment";
import Usuario from "./components/usuario/Usuario";

function App() {
  return (
    <Auth0Provider
      domain={environment.auth0.domain}
      clientId={environment.auth0.clientId}
      redirectUri={window.location.origin}
      audience={`https://${environment.auth0.domain}/api/v2/`}
      scope="read:current_user update:current_user_metadata"
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <Router>
          <Switch>
            <Route exact path="/">
              <ListadoBares />
            </Route>
            <Route exact path="/bar/crear">
              <EditarBar />
            </Route>
            <Route exact path="/bar/:id">
              <DetalleBar />
            </Route>
            <Route exact path="/account">
              <Usuario />
            </Route>
            <Redirect to="/" />
          </Switch>
        </Router>
      </ThemeProvider>
    </Auth0Provider>
  );
}

export default App;
