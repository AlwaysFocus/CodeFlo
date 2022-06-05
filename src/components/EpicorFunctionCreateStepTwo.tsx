import React, { useState } from "react";
import { Formik, Form, Field, FieldProps } from "formik";
import { string, object, lazy, array } from "yup";
import * as monaco from "monaco-editor";
import {
  Paper,
  Typography,
  Button,
  Grid,
  Container,
  Avatar,
  Box,
  TextField,
  useTheme,
} from "@mui/material";
import { User } from "../models";

const validationSchema = object({
  code: string().required("Please enter valid code"),
  usings: lazy((val) => (Array.isArray(val) ? array().of(string()) : string())),
});

export interface EpicorFunctionCreateStepTwoProps {
  setEpicorFunctionBody: Function;
  showSnackbar: Function;
}

interface FormValues {
  code: string | "";
  usings: string[];
}

const EpicorFunctionCreateStepTwo: React.FC<EpicorFunctionCreateStepTwoProps> = ({
  setEpicorFunctionBody,
  showSnackbar,
}) => {
  const theme = useTheme();
  const initialValues: FormValues = {
    code: "",
    usings: [],
  };

  return (
    <Paper
      sx={{
        marginTop: theme.spacing(2),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
      elevation={0}
    >
      <Box display="flex" height={200} alignItems="center" justifyContent="center">
        <Grid container direction="column" justifyContent="flex-start" alignItems="center">
          <Grid item></Grid>
        </Grid>
      </Box>
      <Container maxWidth="xs">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          validateOnMount={true}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(true);

            setEpicorFunctionBody(values.code, values.usings);

            showSnackbar({
              severity: "success",
              message: "Function Body Created!",
            });
          }}
        >
          {({ isValid, isSubmitting }) => (
            <Form
              style={{
                width: "100%", // Fix IE 11 issue.
                marginTop: theme.spacing(1),
              }}
              // data-test="transaction-create-form"
              data-test="epicor-function-body-form"
            >
              <Field name="usings">
                {({ field, meta: { error, value, initialValue, touched } }: FieldProps) => (
                  <TextField
                    variant="outlined"
                    margin="dense"
                    fullWidth
                    required
                    autoFocus
                    // id={"transaction-create-amount-input"}
                    id={"epicor-function-body-usings-input"}
                    type="text"
                    placeholder="Usings"
                    // data-test={"transaction-create-amount-input"}
                    data-test="epicor-function-body-usings-input"
                    error={(touched || value !== initialValue) && Boolean(error)}
                    helperText={touched || value !== initialValue ? error : ""}
                    InputProps={{
                      inputProps: { id: "usings" },
                    }}
                    {...field}
                  />
                )}
              </Field>
              <Field name="code">
                {({ field, meta: { error, value, initialValue, touched } }: FieldProps) => (
                  <TextField
                    variant="outlined"
                    margin="dense"
                    fullWidth
                    required
                    // id={"transaction-create-description-input"}
                    id={"epicor-function-body-code-input"}
                    type="text"
                    placeholder="Add some code..."
                    // data-test={"transaction-create-description-input"}
                    data-test={"epicor-function-body-code-input"}
                    error={(touched || value !== initialValue) && Boolean(error)}
                    helperText={touched || value !== initialValue ? error : ""}
                    {...field}
                  />
                )}
              </Field>
              <Grid
                container
                spacing={2}
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                <Grid item>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    sx={{ margin: theme.spacing(3, 0, 2) }}
                    // data-test="transaction-create-submit-request"
                    data-test="epicor-function-body-submit-request"
                    disabled={!isValid || isSubmitting}
                    onClick={() => {}}
                  >
                    Next
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Container>
    </Paper>
  );
};

export default EpicorFunctionCreateStepTwo;
