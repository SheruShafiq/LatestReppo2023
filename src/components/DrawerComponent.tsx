import { Box, Button, Drawer, Fab, Typography, keyframes } from "@mui/material";
import React, { SetStateAction, useEffect, useRef } from "react";

import Close from "@mui/icons-material/Close";
import Edit from "@mui/icons-material/Edit";
import { selectDrawerState } from "@/lib/redux/slices/layoutSlice";
import { useAppDispatch } from "@/lib/hooks/useAppDispatch";
import { useAppSelector } from "@/lib/hooks/useAppSelector";
import useResizeHandler from "../lib/hooks/useResizeHandler";

export type DrawerProps = {
  open: boolean;
  setOpen: any;
  title: string;
  children: React.ReactNode;
  width?: number;
  isMutation?: any;
  isWarningActive?: boolean;
  setWarningActive?: (state: boolean) => void;
  inFlow?: boolean;
};
export type NumericalString = `${number}` | number;
const DrawerComponent = ({
  isMutation,
  open,
  setOpen,
  title,
  children,
  width,
  isWarningActive,
  setWarningActive,
  inFlow,
}: DrawerProps) => {
  const size = useResizeHandler();
  const drawerState = useAppSelector(selectDrawerState);
  const dispatch = useAppDispatch();

  // Outside of your component
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    // When isWarningActive updates, check if it is false
    if (!isWarningActive && setWarningActive) {
      // If it is false then set warning to false and close drawer
      setWarningActive(false);
    }
  }, [isWarningActive]);

  return (
    <Drawer
      onClose={() => {
        if (isMutation) {
          isMutation("default");
        }
        if (inFlow && setWarningActive) {
          // If stepper is active then set warning active
          setWarningActive(true);
        } else {
          if (setWarningActive) {
            setWarningActive(false);
          }
          setOpen(false);
        }
      }}
      anchor="right"
      open={open}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
      PaperProps={{
        sx: {
          "& .MuiPaper-root": {
            transition: "width 0.10s ease-in-out",
          },
          width: {
            xs: size.width,
            sm: `calc(26.625rem + ${width ? width : 0}rem)`,
            md: `calc(26.625rem + ${width ? width : 0}rem)`,
          },
          transition: "width 0.5s ease-in-out",
          zIndex: 1301,
        },
      }}
    >
      <Box
        paddingLeft={{ xs: "1rem", sm: "1rem", md: "2rem" }}
        paddingRight={{ xs: "1rem", sm: "1rem", md: "2rem" }}
        height={"100%"}
        display={"flex"}
        flexDirection={"column"}
      >
        <Box
          display={"flex"}
          paddingTop={{ xs: "1rem", sm: "1rem", md: "2rem" }}
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
              if (isMutation) {
                isMutation("default");
              }
              if (inFlow && setWarningActive) {
                // If stepper is active then set warning active
                setWarningActive(true);
              } else {
                if (setWarningActive) {
                  setWarningActive(false);
                }
                setOpen(false);
              }
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
