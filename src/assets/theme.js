import { createMuiTheme } from "@material-ui/core/styles";

const primary = {
  yellow800: "#D69C00",
  yellow600: "#FEBA01",
};

const secondary = {
  gray900: "#232326",
  gray700: "#434347",
  gray600: "#585961",
};

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#fff",
      main: primary.yellow600,
      dark: primary.yellow800,
      contrastText: secondary.gray900,
    },
    secondary: {
      light: secondary.gray700,
      main: secondary.gray900,
      dark: secondary.gray900,
      contrastText: "#fff",
    },
    background: {
      default: `transparent`,
    },
  },
  typography: {
    fontFamily: "'Ubuntu', sans-serif;",
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        html: {
          background: `linear-gradient(163.8deg, ${secondary.gray700} 3.22%, ${secondary.gray900} 96.5%);`,
        },
      },
    },
  },
});

export default theme;
export { primary, secondary };
