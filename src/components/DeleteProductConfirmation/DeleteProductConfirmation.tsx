import React, { FC } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import LoadingButton from "@mui/lab/LoadingButton";
import Button from "@mui/material/Button";

type DeleteProductConfirmationProps = {
  handleSubmit: () => void;
  handleCancel: () => void;
  isButtonLoading: boolean;
};

export const DeleteProductConfirmation: FC<DeleteProductConfirmationProps> = ({
  handleSubmit,
  handleCancel,
  isButtonLoading,
}) => {
  return (
    <Box>
      <Typography variant="h2">Are you sure?</Typography>
      <Box mt={5}>
        <LoadingButton
          onClick={handleSubmit}
          loading={isButtonLoading}
          variant="contained"
          sx={{ marginRight: "10px" }}
        >
          Yes, delete this product
        </LoadingButton>
        <Button onClick={handleCancel}>Cancel</Button>
      </Box>
    </Box>
  );
};
