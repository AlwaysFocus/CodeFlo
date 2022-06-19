import React from "react";
import { makeStyles, TextField } from "@material-ui/core";
import { Formik, Form, Field, FieldProps } from "formik";
import { string, object } from "yup";

const validationSchema = object({
  content: string(),
});

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
}));

export interface EpicorFunctionCommentFormProps {
  epicorFunctionId: string;
  epicorFunctionComment: (payload: object) => void;
}

const EpicorFunctionCommentForm: React.FC<EpicorFunctionCommentFormProps> = ({
  epicorFunctionId,
  epicorFunctionComment,
}) => {
  const classes = useStyles();
  const initialValues = { content: "" };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);
          epicorFunctionComment({ epicorFunctionId, ...values });
        }}
      >
        {() => (
          <Form className={classes.form}>
            <Field name="content">
              {({ field, meta }: FieldProps) => (
                <TextField
                  variant="outlined"
                  margin="dense"
                  fullWidth
                  //   id={`transaction-comment-input-${transactionId}`}
                  id={`epicor-function-comment-input-${epicorFunctionId}`}
                  type="text"
                  placeholder="Write a comment..."
                  //   inputProps={{ "data-test": `transaction-comment-input-${transactionId}` }}
                  inputProps={{ "data-test": `epicor-function-comment-input-${epicorFunctionId}` }}
                  error={meta.touched && Boolean(meta.error)}
                  helperText={meta.touched ? meta.error : ""}
                  {...field}
                />
              )}
            </Field>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EpicorFunctionCommentForm;
