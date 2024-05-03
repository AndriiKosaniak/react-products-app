import React, { FC } from "react";
import Box from "@mui/material/Box";

import { Router } from "router";

export const ShopPage: FC = () => {
  return (
    <Box sx={{ padding: "16px 32px" }}>
      <Router />
    </Box>
  );
};
