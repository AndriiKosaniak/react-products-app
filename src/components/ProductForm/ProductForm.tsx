import React, { FC } from "react";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { FormError } from "components";

import type { ProductFormValues } from "types";

type ProductFormProps = {
  initialValues?: ProductFormValues;
  handleSubmit: (values: ProductFormValues) => void;
  handleCancel: () => void;
  isButtonLoading: boolean;
};

const validationSchema = Yup.object({
  imageUrl: Yup.string().required("Required"),
  name: Yup.string().required("Required"),
  count: Yup.number().required("Required"),
  size: Yup.object({
    width: Yup.number().required("Required"),
    height: Yup.number().required("Required"),
  }),
  weight: Yup.string().required("Required"),
});
export const ProductForm: FC<ProductFormProps> = ({
  initialValues,
  handleSubmit,
  handleCancel,
  isButtonLoading,
}) => {
  return (
    <Box width="100%">
      <Formik
        initialValues={{
          imageUrl: initialValues?.imageUrl ?? "",
          name: initialValues?.name ?? "",
          count: initialValues?.count ?? 0,
          size: initialValues?.size ?? { width: 0, height: 0 },
          weight: initialValues?.weight ?? "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values }) => (
          <Form>
            <Box display="flex" flexDirection="column" gap="15px" width="100%">
              <Typography variant="h4">
                {initialValues ? "Edit the " : "Add a "}product
              </Typography>

              <Typography fontWeight="bold">Link to an image:</Typography>
              <Field
                as={TextField}
                variant="outlined"
                placeholder="URL"
                name="imageUrl"
              />
              <FormError name="imageUrl" />

              <Typography fontWeight="bold">Name:</Typography>
              <Field
                as={TextField}
                variant="outlined"
                placeholder="Name"
                name="name"
              />
              <FormError name="name" />

              <Typography fontWeight="bold">Count:</Typography>
              <Field
                as={TextField}
                variant="outlined"
                placeholder="Count"
                name="count"
                type="number"
              />
              <FormError name="count" />

              <Typography fontWeight="bold">Size:</Typography>
              <Field
                as={TextField}
                variant="outlined"
                placeholder="Width"
                name="size.width"
                type="number"
              />
              <FormError name="size.width" />
              <Field
                as={TextField}
                variant="outlined"
                placeholder="Height"
                name="size.height"
                type="number"
              />
              <FormError name="size.height" />

              <Typography fontWeight="bold">Weight:</Typography>
              <Field
                as={TextField}
                multiline
                variant="outlined"
                placeholder="Weight"
                name="weight"
              />
              <FormError name="weight" />

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
