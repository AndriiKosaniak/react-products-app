import React, { FC } from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import { routes } from "router";

import type { Product } from "types";

type SingleProductProps = {
  product: Product;
  handleClick: (id: number) => void;
};

export const SingleProduct: FC<SingleProductProps> = ({
  product,
  handleClick,
}) => {
  return (
    <Box
      component={Link}
      to={routes.products + `/${product.id}`}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",

        padding: "10px",
        border: "1px solid black",
        borderRadius: "20px",

        width: "400px",
        textDecoration: "none",
        color: "black",
        textAlign: "center",

        marginBottom: "10px",
      }}
    >
      <Box component="img" src={product.imageUrl} />
      <Typography variant="h2">{product.name}</Typography>
      <Button
        onClick={(e) => {
          e.preventDefault();
          handleClick(product.id);
        }}
      >
        Delete Product
      </Button>
    </Box>
  );
};
