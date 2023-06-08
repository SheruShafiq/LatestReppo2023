import { Fade, Button, Box, Typography } from "@mui/material";
import React from "react";
import DrawerBottomButtons from "./DrawerBottomButtons";
import MutationDrawerFinished from "./MutationDrawerFinished";
import MutationBeeindingStep2 from "./MutationBeeindingStep2";
import { CurrentScreenProps } from "../../../components/MutationDrawerParent";

const MutationBeeindingStep3: React.FC<CurrentScreenProps> = ({
  handleNext,
  handleBack,
}) => {
  return (
    <Box
      display={"flex"}
      height={"100%"}
      flexDirection={"column"}
      justifyContent={"flex-end"}
    >
      <Typography>Beeindingen 3</Typography>
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
            sx={{
              width: { xs: "22rem", sm: "8.5rem" },
              mr: { xs: 0, sm: "2rem" },
              pb: { xs: "2rem", sm: "0.3rem" },
            }}
            onClick={() => handleBack(MutationBeeindingStep2)}
          >
            STAP TERUG
          </Button>

          <Button
            variant="contained"
            sx={{ width: { xs: "22rem", sm: "14rem" } }}
            onClick={() => handleNext(MutationDrawerFinished)}
          >
            DOORVOEREN WIJZIGING
          </Button>
        </Box>
      </Fade>
    </Box>
  );
};

export default MutationBeeindingStep3;
