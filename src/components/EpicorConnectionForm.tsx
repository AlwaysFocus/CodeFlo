import React from "react";
import { TextField, Button, Grid, useTheme } from "@mui/material";
import { Formik, Form, Field, FieldProps } from "formik";
import { string, object } from "yup";
import { EpicorConnectionPayload, User } from "../models";
import { useHistory } from "react-router";

const validationSchema = object({
  name: string().min(3, "Name must be at least 3 characters long").required("Connection Name"),
  epicorUrl: string().required("Epicor URL"),
  epicorApiKey: string()
    .min(40, "Must contain at least 40 characters")
    .required("Enter Epico API Key"),
  epicorUsername: string()
    .min(3, "Username must contain at least 3 characters")
    .max(40, "Username must contain no more than 40 characters")
    .required("Epicor Username"),
  epicorPassword: string()
    .min(3, "Password must contain at least 3 characters")
    .required("Epicor Password"),
});
export interface EpicorConnectionFormProps {
  userId: User["id"];
  createEpicorConnection: Function;
  onboarding?: boolean;
}

const EpicorConnectionForm: React.FC<EpicorConnectionFormProps> = ({
  userId,
  createEpicorConnection,
  onboarding,
}) => {
  const history = useHistory();
  const theme = useTheme();

  const initialValues: EpicorConnectionPayload = {
    userId,
    name: "",
    epicorUrl: "",
    epicorApiKey: "",
    epicorUsername: "",
    epicorPassword: "",
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(true);

        createEpicorConnection({ ...values, userId });

        if (!onboarding) {
          history.push("/epicor-connections");
        }
      }}
    >
      {({ isValid, isSubmitting }) => (
        <Form
          style={{
            width: "100%", // Fix IE 11 issue.
            marginTop: theme.spacing(1),
          }}
          // data-test="bankaccount-form"
          data-test="epicor-connection-form"
        >
          <Field name="name">
            {({ field, meta: { error, value, initialValue, touched } }: FieldProps) => (
              <TextField
                variant="outlined"
                margin="dense"
                fullWidth
                required
                // id={"bankaccount-bankName-input"}
                id={"epicor-connection-name-input"}
                type="text"
                placeholder="Connection Name"
                // data-test={"bankaccount-bankName-input"}
                data-test={"epicor-connection-name-input"}
                error={(touched || value !== initialValue) && Boolean(error)}
                helperText={touched || value !== initialValue ? error : ""}
                {...field}
              />
            )}
          </Field>
          <Field name="epicorUrl">
            {({ field, meta: { error, value, initialValue, touched } }: FieldProps) => (
              <TextField
                variant="outlined"
                margin="dense"
                fullWidth
                required
                // id={"bankaccount-bankName-input"}
                id={"epicor-connection-epicorUrl-input"}
                type="text"
                placeholder="Epicor URL"
                // data-test={"bankaccount-bankName-input"}
                data-test={"epicor-connection-epicorUrl-input"}
                error={(touched || value !== initialValue) && Boolean(error)}
                helperText={touched || value !== initialValue ? error : ""}
                {...field}
              />
            )}
          </Field>
          <Field name="epicorApiKey">
            {({ field, meta: { error, value, initialValue, touched } }: FieldProps) => (
              <TextField
                variant="outlined"
                margin="dense"
                fullWidth
                required
                // id={"bankaccount-routingNumber-input"}
                id={"epicor-connection-epicorApi-input"}
                type="text"
                placeholder="Epicor API Key"
                // data-test={"bankaccount-routingNumber-input"}
                data-test={"epicor-connection-epicorApi-input"}
                error={(touched || value !== initialValue) && Boolean(error)}
                helperText={touched || value !== initialValue ? error : ""}
                {...field}
              />
            )}
          </Field>
          <Field name="epicorUsername">
            {({ field, meta: { error, value, initialValue, touched } }: FieldProps) => (
              <TextField
                variant="outlined"
                margin="dense"
                fullWidth
                required
                // id={"bankaccount-accountNumber-input"}
                id={"epicor-connection-epicorUsername-input"}
                type="text"
                placeholder="Epicor Username"
                // data-test={"bankaccount-accountNumber-input"}
                data-test={"epicor-connection-epicorUsername-input"}
                error={(touched || value !== initialValue) && Boolean(error)}
                helperText={touched || value !== initialValue ? error : ""}
                {...field}
              />
            )}
          </Field>
          <Field name="epicorPassword">
            {({ field, meta: { error, value, initialValue, touched } }: FieldProps) => (
              <TextField
                variant="outlined"
                margin="dense"
                fullWidth
                required
                id={"epicor-connection-epicorPassword-input"}
                type="password"
                placeholder="Epicor Password"
                data-test={"epicor-connection-epicorPassword-input"}
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
            justifyContent="flex-start"
            alignItems="flex-start"
          >
            <Grid item>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ margin: theme.spacing(3, 0, 2) }}
                // data-test="bankaccount-submit"
                data-test="epicor-connection-submit"
                disabled={!isValid || isSubmitting}
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

export default EpicorConnectionForm;
