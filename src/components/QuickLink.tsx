import { Box, Stack, Typography } from "@mui/material";

import React from "react";

export type QuickLinkProps = {
  text: string;
  onClick: () => void;
};

export const QuickLink = ({ text, onClick }: QuickLinkProps) => {
  return (
    <>
      <Stack
        alignItems={"center"}
        maxWidth={"7.6rem"}
        id={"quickLink"}
        sx={{
          "&:hover": {
            cursor: "pointer",
          },
        }}
        onClick={onClick}
      >
        <Box
          width={"3.75rem"}
          height={"3.75rem"}
          bgcolor={"#CBD5E1"}
          borderRadius={"1rem"}
        ></Box>
        <Typography
          textAlign={"center"}
          mt={"0.5rem"}
          fontFamily={"Inter"}
          fontSize={"1rem"}
          fontStyle={"normal"}
          fontWeight={"400"}
          lineHeight={"1.625rem"}
        >
          {text}
        </Typography>
      </Stack>
    </>
  );
};

// No tests are written for this component as it is a too simple of a component with only very basic functionality.
