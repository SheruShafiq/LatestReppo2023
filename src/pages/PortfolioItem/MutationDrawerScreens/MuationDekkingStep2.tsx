import React from "react";
import { Fade, Button, Box, Typography } from "@mui/material";
import MuationDekkingStep1 from "./MuationDekkingStep1";
import MuationDekkingStep3 from "./MuationDekkingStep3";
import { CurrentScreenProps } from "../../../components/MutationDrawerParent";

const MuationDekkingStep2: React.FC<CurrentScreenProps> = ({
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
      <Typography>Dekking 2</Typography>
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
            onClick={() => handleBack(MuationDekkingStep1)}
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
            sx={{ width: { xs: "22rem", sm: "14rem" } }}
            onClick={() => handleNext(MuationDekkingStep3)}
          >
            VOLGENDE
          </Button>
        </Box>
      </Fade>
    </Box>
  );
};

export default MuationDekkingStep2;
