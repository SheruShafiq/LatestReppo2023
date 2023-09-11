import { Divider, MenuItem, Select, Typography } from "@mui/material";
import React, { useState } from "react";

import Box from "@mui/material/Box";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import Stack from "@mui/material/Stack";
import { icon } from "leaflet";
import { set } from "date-fns";

export type FaqListItemProps = {
  image?: any;
  title: string;
  content: string;
  onClick?: () => void;
  id?: string;
  icon?: boolean;
  dropDownMenuProps: { value: number; label: string }[];
};

const FaqListItem = ({
  image,
  title,
  content,
  onClick,
  icon,
  dropDownMenuProps,
}: FaqListItemProps) => {
  const [SelectedmenuItem, setSelectedMenuItem] = React.useState("Login");

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
      <Stack width={"100%"}>
        <Stack
          onClick={onClick}
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
          <Stack
            flexDirection={"row"}
            justifyContent={"space-between"}
            mt={"1rem"}
          >
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
        <Box width={"8.875rem"} mt={"1rem"}>
          <Select
            fullWidth
            size="small"
            labelId="demo-select-small-label"
            id="demo-select-small"
            onChange={(e) => {
              setSelectedMenuItem(e.target.value as string);
            }}
            value={SelectedmenuItem}
          >
            {dropDownMenuProps.map((item) => (
              <MenuItem key={item.value} value={item.value}>
                {item.label}
              </MenuItem>
            ))}
          </Select>
        </Box>
      </Stack>
    </Stack>
  );
};

export default FaqListItem;
