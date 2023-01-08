import { Box } from "@mui/system";
import React from "react";

export default function BoxContainer({ children }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        minWidth: 300,
        width: "100%",
        height: "calc(100vh - 68.5px)",
        overflow: "auto",
      }}
    >
      {children}
    </Box>
  );
}
