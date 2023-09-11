import { Box, Stack, Typography } from "@mui/material";

import PolicyIcon from "@/assets/Policy.svg";

export type InfoHeaderProps = {
  title: string;
  subtitle: string;
  subtitle2: string;
};

const InfoHeader = ({ title, subtitle, subtitle2 }: InfoHeaderProps) => {
  return (
    <Box display={"flex"} flexDirection={"row"}>
      <img src={PolicyIcon} height={"40px"}></img>
      <Stack>
        <Typography
          pl={"1rem"}
          fontFamily={"Inter"}
          fontStyle={"normal"}
          fontWeight={"600"}
          fontSize={"18px"}
          lineHeight={"26px"}
          color={"#1E293B"}
        >
          {title}
        </Typography>
        <Typography
          px={"1rem"}
          fontFamily={"Inter"}
          fontStyle={"normal"}
          fontWeight={"400"}
          fontSize={"16px"}
          lineHeight={"26px"}
          color={"#1E293B"}
        >
          {subtitle}
        </Typography>
      </Stack>
      <Typography
        fontFamily={"Inter"}
        fontStyle={"normal"}
        fontWeight={"400"}
        fontSize={"18px"}
        lineHeight={"26px"}
        color={"#1E293B"}
        pl={"6px"}
        noWrap
      >
        | {subtitle2}
      </Typography>
    </Box>
  );
};

export default InfoHeader;
