import Close from "@mui/icons-material/Close";
import Edit from "@mui/icons-material/Edit";

import { Box, Button, Drawer, Fab, Typography } from "@mui/material";
import React, { SetStateAction, useEffect } from "react";
import InfoDisplay from "./InfoDisplay";
import useResizeHandler from "../lib/hooks/useResizeHandler";
import { Dispatch } from "@reduxjs/toolkit";
import PolicyIcon from "../assets/Policy.svg";
import { selectPolicyDetailDrawerState } from "../lib/redux/slices/layoutSlice";
import { useAppSelector } from "../lib/hooks/useAppSelector";

export type DrawerProps = {
  open: boolean;
  setOpen?: any;
  title: string;
  children?: React.ReactNode;
  width?: number;
  zIndex?: number;
  setCurrentChildren?: any;
  setExtraWidth?: any;
};
const DrawerComponent = ({
  open,
  setOpen,
  title,
  children,
  width,
  zIndex,
  setCurrentChildren,
  setExtraWidth,
}: DrawerProps) => {
  const size = useResizeHandler();
  const drawerState = useAppSelector(selectPolicyDetailDrawerState);
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={() => {
        setOpen(!drawerState);
        setCurrentChildren("default");
        setExtraWidth(0);
      }}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
      PaperProps={{
        sx: {
          width: {
            xs: size.width,
            sm: `calc(26.625rem + ${width ? width : 0}rem)`,
            md: `calc(26.625rem + ${width ? width : 0}rem)`,
          },

          zIndex: 1301 + (zIndex ? zIndex : 0),
        },
      }}
    >
      <Box
        // width={{ xs: size.width, sm: size.width, md: "26.625rem" }}
        paddingLeft={"1.5rem"}
        paddingRight={"1.5rem"}
        height={"100%"}
        display={"flex"}
        flexDirection={"column"}
      >
        <Box
          display={"flex"}
          paddingTop={"1.5rem"}
          width={"100%"}
          justifyContent={"space-between"}
          alignItems={"center"}
          marginBottom={"1.5rem"}
        >
          <Typography variant="h1" fontSize={"1.25rem"} fontWeight={500}>
            {title}
          </Typography>
          <Fab
            sx={{
              boxShadow: "none",
            }}
            onClick={() => {
              setOpen(false);
              setCurrentChildren("default");
              setExtraWidth(0);
            }}
            size="small"
            data-testid="close"
          >
            <Close />
          </Fab>
        </Box>
        {children}
      </Box>
    </Drawer>
  );
};

export default DrawerComponent;
