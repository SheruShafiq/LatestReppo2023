import { Divider, Typography } from "@mui/material";

import Box from "@mui/material/Box";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import React from "react";
import Stack from "@mui/material/Stack";
import { icon } from "leaflet";

export type ListItemProps = {
  image?: any;
  title: string;
  content: string;
  onClick?: () => void;
  id?: string;
  icon?: boolean;
};

const ListItem = ({ image, title, content, onClick, icon }: ListItemProps) => {
  return (
    <Stack flexDirection={"row"} my={"1rem"}>
      {icon && (
        <Box mr={"1.5rem"}>
          {image ? (
            <img width={56} height={65} src={image} alt="document thumbnail" />
          ) : (
            <Box
              sx={{ width: "3.5rem", height: "5rem", bgcolor: "#E4EAF2" }}
              data-testid={"placeholder-image"}
            ></Box>
          )}
        </Box>
      )}
      <Stack
        onClick={onClick}
        width={"100%"}
        sx={{
          "&:hover": {
            cursor: "pointer",
          },
        }}
      >
        <Typography
          width={"100%"}
          fontWeight={500}
          lineHeight={"1.5rem"}
          fontSize={"1rem"}
        >
          {title}
        </Typography>
        <Stack flexDirection={"row"} justifyContent={"space-between"}>
          <Typography
            color={"#6C737F"}
            fontSize={"0.875rem"}
            lineHeight={"1.25rem"}
            mr={"1rem"}
          >
            {content}
          </Typography>
          <KeyboardArrowRightIcon />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default ListItem;
