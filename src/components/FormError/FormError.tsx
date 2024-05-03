import React, { FC } from "react";
import Typography from "@mui/material/Typography";
import { ErrorMessage } from "formik";

type FormErrorProps = { name: string };

export const FormError: FC<FormErrorProps> = ({ name }: FormErrorProps) => {
  return (
    <Typography variant="body2" color="error">
      <ErrorMessage name={name} />
    </Typography>
  );
};
