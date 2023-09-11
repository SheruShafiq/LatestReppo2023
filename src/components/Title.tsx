import { Stack, Typography } from "@mui/material";

import React from "react";

export type TitleProps = {
  heading: string;
  subHeading: string;
};

export const Title = ({ heading, subHeading }: TitleProps) => {
  return (
    <Stack id={"Title"}>
      <Typography
        fontFamily={"Inter"}
        fontSize={"1.75rem"}
        fontStyle={"normal"}
        fontWeight={"600"}
        lineHeight={"2.5rem "}
      >
        {heading}
      </Typography>
      <Typography
        fontFamily={"Inter"}
        fontSize={"1.125rem"}
        fontStyle={"normal"}
        fontWeight={"600"}
        lineHeight={"2.5rem "}
      >
        {subHeading}
      </Typography>
    </Stack>
  );
};

// No tests are written for this component as it is a too simple of a component with only very basic functionality.
