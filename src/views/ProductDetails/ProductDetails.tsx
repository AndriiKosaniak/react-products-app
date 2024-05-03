import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";

import { useFetchProductQuery, useEditProductMutation } from "api";
import { ProductForm, CommentForm } from "components";

import type { ProductFormValues, Comment, CommentFormValues } from "types";

export const ProductDetails = () => {
  const { id } = useParams();

  const { data: product, isLoading, error, refetch } = useFetchProductQuery(id);
  const [editProduct, { isLoading: isEditLoading }] = useEditProductMutation();

  const [isEditDialogOpened, setIsEditDialogOpened] = useState(false);
  const [isAddCommentDialogOpened, setIsAddCommentDialogOpened] =
    useState(false);

  const handleEditDialogOpen = () => setIsEditDialogOpened(true);
  const handleEditDialogClose = () => setIsEditDialogOpened(false);

  const handleAddCommentDialogOpen = () => setIsAddCommentDialogOpened(true);
  const handleAddCommentDialogClose = () => setIsAddCommentDialogOpened(false);

  const handleAddComment = (values: CommentFormValues) => {
    const newComment = {
      ...values,
      date: new Date().toString(),
      productId: id,
    };
    console.log(newComment);
    refetch();
    handleAddCommentDialogClose();
  };

  const handleEditProduct = (values: ProductFormValues) => {
    editProduct({ id, ...values });
    refetch();
    handleEditDialogClose();
  };

  if (isLoading)
    return (
      <Stack>
        <CircularProgress size={100} />
      </Stack>
    );

  if (error) {
    if ("data" in error) {
      return <Typography>Error: {error.data as string}</Typography>;
    }
    return <Typography>An unexpected error occurred.</Typography>;
  }

  const { name, imageUrl, count, size, weight, comments } = product;
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <Typography variant="h1">{name}</Typography>
      <Box
        component="img"
        src={imageUrl}
        sx={{ width: "200px", height: "300px" }}
      />
      <Typography variant="h5">Count: {count}</Typography>
      <Typography variant="h5">
        Size: {size.width}x{size.height}
      </Typography>
      <Typography variant="h5">Weight: {weight}</Typography>
      {comments?.length && (
        <Typography variant="h5" mt={4}>
          Comments:
        </Typography>
      )}
      {comments?.map((comment: Comment) => (
        <Box key={comment.id}>
          <Typography>{comment.description}</Typography>
          <Typography variant="caption">{comment.date}</Typography>
        </Box>
      ))}
      <Button variant="contained" onClick={handleAddCommentDialogOpen}>
        Add comment
      </Button>
      <Button onClick={handleEditDialogOpen}>Edit product</Button>

      <Dialog open={isEditDialogOpened} onClose={handleEditDialogClose}>
        <ProductForm
          initialValues={product}
          handleSubmit={handleEditProduct}
          handleCancel={handleEditDialogClose}
          isButtonLoading={isEditLoading}
        />
      </Dialog>
      <Dialog
        open={isAddCommentDialogOpened}
        onClose={handleAddCommentDialogClose}
      >
        <CommentForm
          handleSubmit={handleAddComment}
          handleCancel={handleAddCommentDialogClose}
          isButtonLoading={false}
        />
      </Dialog>
    </Box>
  );
};
