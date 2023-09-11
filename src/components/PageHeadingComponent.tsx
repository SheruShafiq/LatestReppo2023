import { Stack, Typography } from "@mui/material";

import React from "react";

export type PageHeadingComponentProps = {
  subtitle: string;
  title: string;
};

const PageHeadingComponent = ({
  subtitle,
  title,
}: PageHeadingComponentProps) => {
  return (
    <Stack>
      <Typography variant="body2" color={"#6C737F"}>
        {subtitle}
      </Typography>
      <Typography
        variant="h1"
        color={"#1A202C"}
        fontWeight={600}
        fontSize={24}
        lineHeight={"32px"}
        marginBottom={"0.5rem"}
      >
        {title}
      </Typography>
    </Stack>
  );
};

export default PageHeadingComponent;

// There is no need to test this component as it is a too simple of a component with only very basic functionality.
