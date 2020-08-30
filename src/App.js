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

function App() {
  return (
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
          <Redirect to="/" />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
