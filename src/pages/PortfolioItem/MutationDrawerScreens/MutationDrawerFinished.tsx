import { Fade, Button, Box, Typography } from "@mui/material";
import React from "react";
import MutationDrawerStep0 from "./MutationDrawerStep0";
import { useAppDispatch } from "../../../lib/hooks/useAppDispatch";
import { setPolicyDetailDrawerState } from "../../../lib/redux/slices/layoutSlice";
import { CurrentScreenProps } from "../../../components/MutationDrawerParent";

const MutationDrawerFinished: React.FC<CurrentScreenProps> = ({
  handleBack,
  setStepperActive,
  setCurrentStepperLocation,
}) => {
  const dispatch = useAppDispatch();
  if (!setStepperActive || !setCurrentStepperLocation) return null;
  return (
    <Box
      display={"flex"}
      height={"100%"}
      flexDirection={"column"}
      justifyContent={"flex-end"}
    >
      <Typography fontSize={"5rem"}>Finished!</Typography>
      <Box flexGrow={1} />
      <Fade in timeout={600}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            pt: 2,
            justifyContent: { xs: "center", sm: "flex-end" },
            alignItems: { xs: "center", sm: "flex-end" },
            pb: 2,
          }}
        >
          <Button
            variant="contained"
            sx={{ width: { xs: "22rem", sm: "14rem" } }}
            onClick={() => {
              handleBack(MutationDrawerStep0);
              setStepperActive(false);
              setCurrentStepperLocation(-1);
              dispatch(setPolicyDetailDrawerState(false));
            }}
          >
            RESET
          </Button>
        </Box>
      </Fade>
    </Box>
  );
};

export default MutationDrawerFinished;
