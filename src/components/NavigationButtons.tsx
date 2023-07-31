import { LoadingButton } from "@mui/lab";
import { Box, Button, Fade } from "@mui/material";
import React from "react";

export type NavigationButtonsProps = {
  handleNext: () => void;
  handleBack: () => void;
  disabled: boolean;
  backText: string;
  nextText: string;
  setLoading?: (prev: boolean) => void;
  loading?: boolean;
  isLast?: boolean;
};

const NavigationButtons = ({
  handleBack,
  handleNext,
  disabled,
  backText,
  nextText,
  setLoading,
  loading,
  isLast,
}: NavigationButtonsProps) => (
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
        onClick={handleBack}
      >
        {backText}
      </Button>
      {!isLast && (
        <Button
          variant="contained"
          sx={{ width: { xs: "22rem", sm: "8.5rem" } }}
          onClick={handleNext}
          disabled={disabled}
        >
          {nextText}
        </Button>
      )}
      {isLast && (
        <LoadingButton
          variant="contained"
          sx={{ width: { xs: "22rem", sm: "14rem" } }}
          onClick={() => {
            if (setLoading) setLoading(true);
            setTimeout(() => {
              handleNext();
            }, 2000); //
          }}
          loading={loading}
        >
          {nextText}
        </LoadingButton>
      )}
    </Box>
  </Fade>
);

export default NavigationButtons;
