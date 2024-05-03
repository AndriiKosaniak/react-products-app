import React, { FC } from "react";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { FormError } from "components";

import type { CommentFormValues } from "types";

type ProductFormProps = {
  handleSubmit: (values: CommentFormValues) => void;
  handleCancel: () => void;
  isButtonLoading: boolean;
};

const validationSchema = Yup.object({
  description: Yup.string().required("Required"),
});
export const CommentForm: FC<ProductFormProps> = ({
  handleSubmit,
  handleCancel,
  isButtonLoading,
}) => {
  return (
    <Box width="100%">
      <Formik
        initialValues={{
          description: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values }) => (
          <Form>
            <Box display="flex" flexDirection="column" gap="15px" width="100%">
              <Typography variant="h4">Add a comment</Typography>
              <Field
                as={TextField}
                variant="outlined"
                placeholder="Lorem ipsum..."
                name="description"
              />
              <FormError name="description" />

              <LoadingButton
                loading={isButtonLoading}
                type="submit"
                variant="contained"
              >
                Submit
              </LoadingButton>
              <Button onClick={handleCancel}>Cancel</Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};
