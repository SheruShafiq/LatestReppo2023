import { Box, Typography } from "@mui/material";
import React from "react";
import { ENV } from "../lib/types/Env";

const CopyrightText = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: "1rem",
      }}
    >
      <Typography variant="body1" fontSize={"0.75rem"}>
        Funeral Insurance Portal Platform: {ENV.version}
      </Typography>
      <Typography variant="body1" fontSize={"0.75rem"}>
        © All Rights Reserved Aer Software Solutions 2023
      </Typography>
    </Box>
  );
};

export default CopyrightText;
