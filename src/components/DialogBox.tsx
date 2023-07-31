import React from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContentText,
  DialogTitle,
  SwipeableDrawer,
} from "@mui/material";
import useResizeHandler from "@/lib/hooks/useResizeHandler";

export type DialogBoxProps = {
  open: boolean;
  onContinue: () => void;
  onTerminate: () => void;
  title: string;
  description: string;
  confirmButtonText?: string;
  children?: React.ReactNode;
};

const DialogBox = ({
  open,
  children,
  onContinue,
  onTerminate,
  title,
  description,
  confirmButtonText,
}: DialogBoxProps) => {
  const size = useResizeHandler();

  return size.width > 600 ? (
    <Dialog
      open={open}
      sx={{
        "& .MuiDialog-paper": {
          width: "507px",
          minHeight: "254px",
          pt: "1rem",
          pr: "1rem",
          pl: "1rem",
        },
      }}
    >
      <DialogTitle minWidth={"427px"}>
        {title}
        <DialogContentText>{description}</DialogContentText>
      </DialogTitle>
      {children}
      <DialogActions sx={{ mt: "2rem", mr: "1rem" }}>
        <Button
          color="inherit"
          sx={{
            width: { xs: "22rem", sm: "8.5rem" },
            mr: { xs: 0, sm: "2rem" },
          }}
          onClick={onContinue}
        >
          Annuleren
        </Button>
        <Button
          variant="contained"
          sx={{ width: { xs: "22rem", sm: "14rem" } }}
          onClick={onTerminate}
        >
          {confirmButtonText ? confirmButtonText : "Beëindigen"}
        </Button>
      </DialogActions>
    </Dialog>
  ) : (
    <SwipeableDrawer
      anchor="bottom"
      open={open}
      onClose={() => {}}
      onOpen={() => console.log("open")}
      swipeAreaWidth={56}
      disableSwipeToOpen={false}
      sx={{
        "& .MuiDrawer-paper": {
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          p: "1.5rem",
        },
      }}
    >
      <Box sx={{ borderTopLeftRadius: 8, borderTopRightRadius: 8 }}>
        <DialogTitle
          sx={{
            padding: "0",
          }}
        >
          Weet je zeker dat je de mutatie wilt stoppen?
        </DialogTitle>
        <DialogContentText pt={"1rem"}>
          Als je de mutatie beëindigd dan gaan de gegevens die je hebt ingevoerd
          verloren.
        </DialogContentText>
        <DialogActions
          sx={{
            mt: "3.5rem",
            justifyContent: "space-around",
            padding: "0",
          }}
        >
          <Button
            color="inherit"
            sx={{
              flex: 1,
              fontSize: "0.8125rem",
            }}
            onClick={onContinue}
          >
            Annuleren
          </Button>
          <Button
            variant="contained"
            sx={{
              flex: 1,
              fontSize: "0.8125rem",
            }}
            onClick={onTerminate}
          >
            {confirmButtonText ? confirmButtonText : "Beëindigen"}
          </Button>
        </DialogActions>
      </Box>
    </SwipeableDrawer>
  );
};

export default DialogBox;
