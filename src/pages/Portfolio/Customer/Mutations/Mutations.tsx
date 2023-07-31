import React, { useEffect, useState } from "react";
import useResizeHandler from "@/lib/hooks/useResizeHandler";
import { useAppSelector } from "@/lib/hooks/useAppSelector";
import { useAppDispatch } from "@/lib/hooks/useAppDispatch";
import {
  selectDrawerState,
  selectWarningActive,
  setDrawerState,
  setInFlow,
  setWarningActive,
  selectInFlow,
  setOldData,
  selectReset,
  setReset,
} from "@/lib/redux/slices/mutationSlice";
import DialogBox from "../../../../components/DialogBox";
import ScreenController from "./ScreenController";
import {
  Box,
  Button,
  DialogActions,
  DialogContentText,
  DialogTitle,
  Skeleton,
  Slide,
  SwipeableDrawer,
  Typography,
} from "@mui/material";

function Mutations(data: any) {
  const dispatch = useAppDispatch();
  const size = useResizeHandler();

  useEffect(() => {
    dispatch(setOldData(data));
  }, [data]);

  const drawerState = useAppSelector(selectDrawerState);
  const userFlowContinueState = useAppSelector(selectWarningActive);

  useEffect(() => {
    dispatch(setInFlow(false));
  }, [drawerState]);

  return (
    <>
      <DialogBox
        open={userFlowContinueState}
        onContinue={() => dispatch(setWarningActive(false))}
        onTerminate={() => {
          dispatch(setWarningActive(false));
          dispatch(setDrawerState(false));
        }}
        title="Weet je zeker dat de mutatie wilt stoppen?"
        description="Als je de mutatie beëindigd dan gaan de gegevens die je mogelijk al
          hebt ingevoerd verloren. Je kunt altijd de mutatie opnieuw starten
          op een later tijdstip."
        confirmButtonText="MUTATIE BEËINDIGEN"
      />

      <ScreenController />
    </>
  );
}

export default Mutations;
