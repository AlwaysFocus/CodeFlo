import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material";
import { Auth0Provider } from "@auth0/auth0-react";
/* istanbul ignore next */
// @ts-ignore
import { OktaAuth } from "@okta/okta-auth-js";
import { Security } from "@okta/okta-react";
import App from "containers/App";
import { history } from "./utils/historyUtils";

const theme = createTheme({
  palette: {
    secondary: {
      main: "#fff",
    },
  },
});

ReactDOM.render(
  <Router history={history}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
    ,
  </Router>,
  document.getElementById("root")
);
