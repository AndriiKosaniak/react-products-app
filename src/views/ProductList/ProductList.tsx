import React, { useMemo, useState } from "react";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Dropdown } from "@mui/base/Dropdown";
import { MenuButton } from "@mui/base/MenuButton";
import { Menu } from "@mui/base/Menu";
import { MenuItem } from "@mui/base/MenuItem";
import Dialog from "@mui/material/Dialog";

import {
  useFetchProductsQuery,
  useAddProductMutation,
  useDeleteProductMutation,
} from "api";
import { sortProductsByProperty } from "utils";
import { SingleProduct } from "./SingleProduct";
import { ProductForm, DeleteProductConfirmation } from "components";

import type { Product, ProductFormValues } from "types";

const sortOptions: (keyof Product)[] = ["name", "count", "weight"];

export const ProductList = () => {
  const {
    data: products,
    isLoading,
    error,
    refetch,
  } = useFetchProductsQuery([]);
  const [addProduct, { isLoading: isAddLoading }] = useAddProductMutation();
  const [deleteProduct, { isLoading: isDeleteLoading }] =
    useDeleteProductMutation();

  const [sortQuery, setSortQuery] = useState<keyof Product>(sortOptions[0]);
  const [isAddDialogOpened, setIsAddDialogOpened] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState<number | null>(
    null
  );

  const handleAddDialogOpen = () => setIsAddDialogOpened(true);
  const handleAddDialogClose = () => setIsAddDialogOpened(false);

  const handleDeleteDialogOpen = (id: number) => setProductIdToDelete(id);
  const handleDeleteDialogClose = () => setProductIdToDelete(null);

  const handleAddProduct = (values: ProductFormValues) => {
    addProduct(values);
    refetch();
    handleAddDialogClose();
  };

  const handleDeleteProduct = () => {
    if (productIdToDelete) {
      deleteProduct(productIdToDelete);
      refetch();
      handleDeleteDialogClose();
    }
  };

  const sortedProducts = useMemo(() => {
    if (!products) return [];
    return sortProductsByProperty<Product>(products, sortQuery);
  }, [products, sortQuery]);

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

  return (
    <Box
      sx={{
        display: "flex",
        gap: "50px",
        alignItems: "flex-start",
        justifyContent: "space-between",
      }}
    >
      <Box>
        <Dropdown>
          <MenuButton>Sort products</MenuButton>
          <Menu>
            {sortOptions.map((option) => (
              <MenuItem key={option} onClick={() => setSortQuery(option)}>
                <Button>{option}</Button>
              </MenuItem>
            ))}
          </Menu>
        </Dropdown>
      </Box>
      <Box>
        {sortedProducts?.map((product: Product) => (
          <SingleProduct
            key={product.id}
            product={product}
            handleClick={handleDeleteDialogOpen}
          />
        ))}
      </Box>
      <Button variant="contained" onClick={handleAddDialogOpen}>
        Add new product
      </Button>
      <Dialog open={isAddDialogOpened} onClose={handleAddDialogClose}>
        <ProductForm
          handleSubmit={handleAddProduct}
          handleCancel={handleAddDialogClose}
          isButtonLoading={isAddLoading}
        />
      </Dialog>
      <Dialog open={!!productIdToDelete} onClose={handleDeleteDialogClose}>
        <DeleteProductConfirmation
          handleSubmit={handleDeleteProduct}
          handleCancel={handleDeleteDialogClose}
          isButtonLoading={isDeleteLoading}
        />
      </Dialog>
    </Box>
  );
};
