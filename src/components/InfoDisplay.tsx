import Margin from "@mui/icons-material/Margin";
import { Box, Skeleton, Typography } from "@mui/material";
import React from "react";

export type InfoDisplayProps = {
  label: string;
  value: string;
};

const InfoDisplay = ({ label, value }: InfoDisplayProps) => {
  return (
    <Box marginBottom={"1rem"}>
      <Typography variant="body2" color={"#6C737F"} fontSize={14}>
        {label}
      </Typography>

      {value ? (
        <Typography
          variant="body1"
          color={"#1A202C"}
          fontSize={16}
          fontWeight={500}
        >
          {value}
        </Typography>
      ) : (
        <Skeleton
          variant="text"
          animation={false}
          width={"60%"}
          height={"30px"}
          sx={{ my: -0.38 }}
          data-testid="info-display-skeleton"
        />
      )}
    </Box>
  );
};

export default InfoDisplay;
