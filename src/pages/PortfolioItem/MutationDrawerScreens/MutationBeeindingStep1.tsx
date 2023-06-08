import { Fade, Button, Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import MutationBeeindingStep2 from "./MutationBeeindingStep2";
import MutationDrawerStep0 from "./MutationDrawerStep0";
import { CurrentScreenProps } from "../../../components/MutationDrawerParent";

const MutationBeeindingStep1: React.FC<CurrentScreenProps> = ({
  handleNext,
  handleBack,
  setStepperActive,
  setSteps,
  setCurrentStepperLocation,
}) => {
  useEffect(() => {
    if (setCurrentStepperLocation && setStepperActive && setSteps) {
      // Set the stepper active
      setStepperActive(true);

      // Set the steps array with your desired strings
      const steps: string[] = ["Beeinding 1", "Beeinding 2", "Beeinding 3"];
      setSteps(steps);
    }
  }, [setStepperActive, setSteps]);

  if (!setStepperActive || !setSteps || !setCurrentStepperLocation) {
    return <div>Something went wrong</div>;
  }
  return (
    <Box
      display={"flex"}
      height={"100%"}
      flexDirection={"column"}
      justifyContent={"flex-end"}
    >
      <Typography sx={{ color: "black", pt: "12px", ml: "10px" }}>
        Beeindingen 1
      </Typography>
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
            color="inherit"
            onClick={() => {
              handleBack(MutationDrawerStep0);
              setStepperActive(false);
              setCurrentStepperLocation(-1);
            }}
            sx={{
              width: { xs: "22rem", sm: "8.5rem" },
              mr: { xs: 0, sm: "2rem" },
              pb: { xs: "2rem", sm: "0.3rem" },
            }}
          >
            STAP TERUG
          </Button>

          <Button
            variant="contained"
            sx={{ width: { xs: "22rem", sm: "8.5rem" } }}
            onClick={() => {
              handleNext(MutationBeeindingStep2);
            }}
          >
            VOLGENDE
          </Button>
        </Box>
      </Fade>
    </Box>
  );
};

export default MutationBeeindingStep1;
