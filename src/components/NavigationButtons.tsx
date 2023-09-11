import { Box, Button, Fade, Stack } from "@mui/material";

import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { LoadingButton } from "@mui/lab";
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
  fileDownLoad?: boolean;
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
  fileDownLoad,
}: NavigationButtonsProps) => (
  <Fade in timeout={600}>
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        mt: 2,
        justifyContent: { xs: "center", sm: "flex-end" },
        alignItems: { xs: "center", sm: "flex-end" },
        pb: 2,
      }}
    >
      <Stack direction={"row"} alignContent={"center"} alignItems={"center"}>
        <Button
          color="inherit"
          sx={{
            width: { xs: "22rem", sm: "8.5rem" },
            mr: { xs: 0, sm: "2rem" },
            pb: { xs: "2rem", sm: fileDownLoad ? "0rem" : "0.3rem" },
          }}
          onClick={handleBack}
        >
          {fileDownLoad ? (
            <Box mt={"0.5rem"} mr={"0.5rem"}>
              <FileDownloadIcon />
            </Box>
          ) : (
            <Box />
          )}
          {backText}
        </Button>
      </Stack>
      {!isLast && (
        <Button
          variant="contained"
          sx={{ width: { xs: "100%", sm: "8.5rem" } }}
          onClick={handleNext}
          disabled={disabled}
        >
          {nextText}
        </Button>
      )}
      {isLast && (
        <LoadingButton
          variant="contained"
          sx={{ width: { xs: "100%", sm: "14rem" } }}
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
