import { Box, Stack, Typography } from "@mui/material";

import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import { Link } from "react-router-dom";
import React from "react";

export type RecentLinkProps = {
  heading: string | undefined;
  subHeading: string[] | undefined;
  url?: string | undefined;
};

export const RecentLink = ({ heading, subHeading, url }: RecentLinkProps) => {
  if (!heading && !subHeading && !url) {
    return null;
  }
  return (
    <Link
      to={url}
      style={{
        textDecoration: "none",
        color: "inherit",
        display: "flex",
      }}
    >
      <Box
        onClick={() => console.log({ heading })}
        display={"flex"}
        flexDirection={"column"}
        mt={"0.5rem"}
        sx={{
          "&:hover": {
            cursor: "pointer",
          },
        }}
      >
        <Typography
          component={Stack}
          direction="row"
          alignItems="center"
          fontFamily={"Inter"}
          fontSize={"0.875rem"}
          fontStyle={"normal"}
          fontWeight={"400"}
        >
          <ArrowForwardIosSharpIcon
            sx={{
              width: "0.6rem",
              height: "0.6rem",
              verticalAlign: "middle",
              mr: "0.65rem",
              fontWeight: "800",
            }}
          />
          {heading}
        </Typography>
        {subHeading?.map((text) => (
          <Typography key={text} ml={"1.26rem"} fontSize={"0.625rem"}>
            {text}
          </Typography>
        ))}
      </Box>
    </Link>
  );
};

// No tests are written for this component as it is a too simple of a component with only very basic functionality.
