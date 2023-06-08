import { Box } from "@mui/material";
import { BoxTypeMap } from "@mui/system";
import React from "react";

export type ContentBoxProps = {
  children: React.ReactNode;
};

const ContentBox = ({ children }: ContentBoxProps) => {
  return (
    <Box
      sx={{
        padding: "1.5rem",
        width: "100%",
        overflow: "scroll",
        paddingTop: "5.25rem",
        paddingBottom: "1.5rem",
        px: "1.5rem",
      }}
    >
      {children}
    </Box>
  );
};

export default ContentBox;
