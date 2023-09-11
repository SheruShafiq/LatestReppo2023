import React from "react";
import { Fade, Button, Box, Typography } from "@mui/material";
function DrawerBottomButtons(
  handleBack: any,
  handleNext: any,
  handleBackProp: any,
  handleNextProp: any,
  lastStep?: boolean
) {
  return (
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
          onClick={() => handleBack(handleBackProp)}
          sx={{
            width: { xs: "22rem", sm: "8.5rem" },
            mr: { xs: 0, sm: "2rem" },
            pb: { xs: "2rem", sm: "0.3rem" },
          }}
        >
          STAP TERUG
        </Button>
        {lastStep ? null : (
          <Button
            variant="contained"
            sx={{ width: { xs: "22rem", sm: "8.5rem" } }}
            onClick={() => handleNext(handleNextProp)}
          >
            VOLGENDE
          </Button>
        )}
      </Box>
    </Fade>
  );
}

export default DrawerBottomButtons;
