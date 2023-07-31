import Box from "@mui/material/Box/Box";
import PolicyIcon from "@/assets/Policy.svg";
import React from "react";
import { Stack, Typography } from "@mui/material";

export type RelationDetailsProps = {
  name: string;
  relationId: string;
  birthDate: string;
};

const RelationDetails = ({
  name,
  relationId,
  birthDate,
}: RelationDetailsProps) => {
  return (
    <Stack direction="row" spacing={2}>
      <img src={PolicyIcon} height={"40px"}></img>
      <Stack direction="column" spacing={2}>
        <Typography
          fontFamily={"Inter"}
          fontStyle={"normal"}
          fontWeight={"600"}
          fontSize={"18px"}
          lineHeight={"26px"}
          color={"#1E293B"}
        >
          {name}
        </Typography>
        <Typography
          fontFamily={"Inter"}
          fontStyle={"normal"}
          fontWeight={"400"}
          fontSize={"16px"}
          lineHeight={"26px"}
          color={"#1E293B"}
        >
          {relationId}
        </Typography>
      </Stack>
      <Stack direction="column" spacing={2}>
        <Typography
          fontFamily={"Inter"}
          fontStyle={"normal"}
          fontWeight={"400"}
          fontSize={"18px"}
          lineHeight={"26px"}
          color={"#1E293B"}
        >
          {`| ${birthDate}`}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default RelationDetails;
