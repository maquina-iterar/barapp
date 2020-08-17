import React from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import theme from "./assets/theme";
import Layout from "./components/Layout";
import ListadoBares from "./components/bares/ListadoBares";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Layout>
        <ListadoBares />
      </Layout>
    </ThemeProvider>
  );
}

export default App;
