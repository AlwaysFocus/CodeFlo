import React from "react";
import { Paper, useTheme, Container, TextField, Grid, Button } from "@mui/material";
import { Formik, Form, Field, FieldProps } from "formik";
import { object, string } from "yup";

const validationSchema = object({
  functionId: string()
    .min(3, "Function id must contain at least 3 characters")
    .required("Please enter a valid function id"),
  description: string().required("Please enter a description"),
});

export interface EpicorFunctionCreateStepOneProps {
  setEpicorFunctionDetails: Function;
  showSnackbar: Function;
}

interface FormValues {
  functionId: string;
  description: string;
}

const EpicorFunctionCreateStepOne: React.FC<EpicorFunctionCreateStepOneProps> = ({
  setEpicorFunctionDetails,
  showSnackbar,
}) => {
  const theme = useTheme();
  const initialValues: FormValues = {
    functionId: "",
    description: "",
  };

  return (
    <Paper
      sx={{ padding: theme.spacing(2), display: "flex", overflow: "auto", flexDirection: "column" }}
      elevation={0}
    >
      <Container maxWidth="xs">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          validateOnMount={true}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(true);

            setEpicorFunctionDetails(values.functionId, values.description);
            showSnackbar({
              severity: "success",
              message: "Function Details Set!",
            });
          }}
        >
          {({ isValid, isSubmitting }) => (
            <Form
              style={{
                width: "100%", // Fix IE 11 issue.
                marginTop: theme.spacing(1),
              }}
              data-test="transaction-create-form"
            >
              {/* the name attribute should match the variable name you are wanting to target in the initialValues object*/}
              <Field name="functionId">
                {({ field, meta: { error, value, initialValue, touched } }: FieldProps) => (
                  <TextField
                    variant="outlined"
                    margin="dense"
                    fullWidth
                    required
                    autoFocus
                    // id={"transaction-create-amount-input"}
                    id={"epicor-function-create-id-input"}
                    type="text"
                    placeholder="Function ID"
                    data-test={"transaction-create-amount-input"}
                    error={(touched || value !== initialValue) && Boolean(error)}
                    helperText={touched || value !== initialValue ? error : ""}
                    InputProps={{
                      inputProps: { functionId: "functionId" },
                    }}
                    {...field}
                  />
                )}
              </Field>
              <Field name="description">
                {({ field, meta: { error, value, initialValue, touched } }: FieldProps) => (
                  <TextField
                    variant="outlined"
                    margin="dense"
                    fullWidth
                    required
                    // id={"transaction-create-description-input"}
                    id={"epicor-function-create-description-input"}
                    type="text"
                    placeholder="Add a description"
                    data-test={"epicor-function-create-description-input"}
                    error={(touched || value !== initialValue) && Boolean(error)}
                    helperText={touched || value !== initialValue ? error : ""}
                    InputProps={{
                      inputProps: { description: "description" },
                    }}
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
                    data-test="epicor-function-create-submit"
                    disabled={!isValid || isSubmitting}
                    onClick={() => console.log("Next button clicked!")}
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

export default EpicorFunctionCreateStepOne;
