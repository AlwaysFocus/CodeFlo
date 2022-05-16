import React from "react";
import { Interpreter } from "xstate";
import { useActor } from "@xstate/react";
import { Link } from "react-router-dom";
import {
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Grid,
  Box,
  Typography,
  Container,
  useTheme,
  Alert,
} from "@mui/material";
import { Formik, Form, Field, FieldProps } from "formik";
import { string, object } from "yup";

import RWALogo from "./SvgRwaLogo";
import Footer from "./Footer";
import { SignInPayload } from "../models";
import { AuthMachineContext, AuthMachineEvents, AuthMachineSchema } from "../machines/authMachine";
// import { Alert } from "@material-ui/lab";

const validationSchema = object({
  username: string().required("Username is required"),
  password: string()
    .min(4, "Password must contain at least 4 characters")
    .required("Enter your password"),
});

// const useStyles = makeStyles((theme) => ({
//   paper: {
//     marginTop: theme.spacing(8),
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//   },
//   logo: {
//     color: theme.palette.primary.main,
//   },
//   form: {
//     width: "100%", // Fix IE 11 issue.
//     marginTop: theme.spacing(1),
//   },
//   submit: {
//     margin: theme.spacing(3, 0, 2),
//   },
//   alertMessage: {
//     marginBottom: theme.spacing(2),
//   },
// }));

export interface Props {
  authService: Interpreter<AuthMachineContext, AuthMachineSchema, AuthMachineEvents, any, any>;
}

const SignInForm: React.FC<Props> = ({ authService }) => {
  const theme = useTheme();
  const [authState, sendAuth] = useActor(authService);
  const initialValues: SignInPayload = {
    username: "",
    password: "",
    remember: undefined,
  };

  const signInPending = (payload: SignInPayload) => sendAuth({ type: "LOGIN", ...payload });

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: theme.spacing(8),
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {authState.context?.message && (
          <Alert data-test="signin-error" severity="error" sx={{ marginBottom: theme.spacing(2) }}>
            {authState.context.message}
          </Alert>
        )}
        <div>{/* <RWALogo sx={{ color: theme.palette.primary.main }} /> */}</div>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(true);

            signInPending(values);
          }}
        >
          {({ isValid, isSubmitting }) => (
            <Form
              style={{
                width: "100%", // Fix IE 11 issue.
                marginTop: theme.spacing(1),
              }}
            >
              <Field name="username">
                {({ field, meta: { error, value, initialValue, touched } }: FieldProps) => (
                  <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="username"
                    label="Username"
                    type="text"
                    autoFocus
                    data-test="signin-username"
                    error={(touched || value !== initialValue) && Boolean(error)}
                    helperText={touched || value !== initialValue ? error : ""}
                    {...field}
                  />
                )}
              </Field>
              <Field name="password">
                {({ field, meta: { error, value, initialValue, touched } }: FieldProps) => (
                  <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    label="Password"
                    type="password"
                    id="password"
                    data-test="signin-password"
                    error={touched && value !== initialValue && Boolean(error)}
                    helperText={touched && value !== initialValue && touched ? error : ""}
                    {...field}
                  />
                )}
              </Field>
              <FormControlLabel
                control={
                  <Field name={"remember"}>
                    {({ field }: FieldProps) => {
                      return <Checkbox color="primary" data-test="signin-remember-me" {...field} />;
                    }}
                  </Field>
                }
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ margin: theme.spacing(3, 0, 2) }}
                data-test="signin-submit"
                disabled={!isValid || isSubmitting}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  {/*<Link to="/forgotpassword">Forgot password?</Link>*/}
                </Grid>
                <Grid item>
                  <Link data-test="signup" to="/signup">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Box>
      <Box mt={8}>
        <Footer />
      </Box>
    </Container>
  );
};

export default SignInForm;
