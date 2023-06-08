import { Box, Typography } from "@mui/material";
import React from "react";

export type GenericFallbackProps = {
  title: string;
  description?: string;
};

const GenericFallback = ({ title, description }: GenericFallbackProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        width: "100%",
        textAlign: "center",
        border: "1px solid #D32F2F",
        borderRadius: "4px",
        padding: "1rem",
        backgroundColor: "#FBEAEA",
      }}
    >
      <Typography variant="body1" component="h1" gutterBottom color={"#541313"}>
        <b>{title}</b>
      </Typography>
      <Typography variant="body2" gutterBottom color={"#541313"}>
        {description}
      </Typography>
    </Box>
  );
};

export default GenericFallback;
