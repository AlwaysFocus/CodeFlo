import React, { useState } from "react";
import { Formik, Form, Field, FieldProps } from "formik";
import { string, object, lazy, array } from "yup";
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
  name: string().required("Please enter valid parameter name"),
  type: string().required("Please enter valid data type"),
});

export interface EpicorFunctionCreateStepThreeProps {
  setEpicorFunctionSignature: Function;
  showSnackbar: Function;
}

interface FormValues {
  name: string | "";
  type: string;
}

// interface FormValues {
//   functionSignature: EpicorFunctionSignature;
// }

const EpicorFunctionCreateStepThree: React.FC<EpicorFunctionCreateStepThreeProps> = ({
  setEpicorFunctionSignature,
  showSnackbar,
}) => {
  const theme = useTheme();
  const initialValues: FormValues = {
    name: "",
    type: "",
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

            setEpicorFunctionSignature([{ name: values.name, type: values.type }]);

            showSnackbar({
              severity: "success",
              message: "Function Signature Created!",
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
              data-test="epicor-function-signature-form"
            >
              <Field name="name">
                {({ field, meta: { error, value, initialValue, touched } }: FieldProps) => (
                  <TextField
                    variant="outlined"
                    margin="dense"
                    fullWidth
                    required
                    autoFocus
                    // id={"transaction-create-amount-input"}
                    id={"epicor-function-signature-name-input"}
                    type="text"
                    placeholder="Parameter Id"
                    // data-test={"transaction-create-amount-input"}
                    data-test="epicor-function-signature-name-input"
                    error={(touched || value !== initialValue) && Boolean(error)}
                    helperText={touched || value !== initialValue ? error : ""}
                    InputProps={{
                      inputProps: { id: "name" },
                    }}
                    {...field}
                  />
                )}
              </Field>
              <Field name="type">
                {({ field, meta: { error, value, initialValue, touched } }: FieldProps) => (
                  <TextField
                    variant="outlined"
                    margin="dense"
                    fullWidth
                    required
                    // id={"transaction-create-description-input"}
                    id={"epicor-function-signature-type-input"}
                    type="text"
                    placeholder="Parameter Data Type"
                    // data-test={"transaction-create-description-input"}
                    data-test={"epicor-function-signature-type-input"}
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
                    data-test="epicor-function-signature-submit-request"
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

export default EpicorFunctionCreateStepThree;
