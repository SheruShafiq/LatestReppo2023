import React from "react";
import { Fade, Button, Box, Typography } from "@mui/material";

function MutationContactStep1() {
  return (
    <Box
      display={"flex"}
      height={"100%"}
      flexDirection={"column"}
      justifyContent={"flex-end"}
    >
      <Typography>Contact Step 1</Typography>
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
            // disabled={activeStepPersoonsGegevens === 0}

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
          >
            VOLGENDE
          </Button>
        </Box>
      </Fade>
    </Box>
  );
}

export default MutationContactStep1;
