import { Box, Stack, TextField } from "@mui/material";
import React, { useState } from "react";

export type PostBusComponentProps = {
  psCode: string;
  setPsCode: (psCode: string) => void;
  hsNr: number | string;
  setHsNr: (hsNr: string) => void;
  psValid: boolean;
  setPsValid: (psValid: boolean) => void;
  hsValid: boolean;
  city: string;
  setCity: (city: string) => void;
};

const PostBusComponent: React.FC<PostBusComponentProps> = ({
  psCode,
  setPsCode,
  hsNr,
  setHsNr,
  psValid,
  setPsValid,
  hsValid,
  city,
  setCity,
}) => {
  const validPostalCode = /^[1-9][0-9]{3}\s?[a-zA-Z]{2}$/;
  const handlePSCodeValidation = (e: any) => {
    if (validPostalCode.test(psCode)) {
      setPsValid(false);
    } else {
      setPsValid(true);
    }
  };
  return (
    <Stack id="PostBusAddress" sx={{ mt: "2rem" }} data-testid="PostBusAddress">
      <TextField
        error={!hsValid}
        data-testid="Postbusnummer"
        type="text"
        size="small"
        fullWidth
        id="Postbusnummer"
        label="Postbusnummer"
        variant="outlined"
        value={hsNr}
        onChange={(e) => setHsNr(e.target.value)}
        sx={{
          "& label.Mui-focused": {
            color: "#94A3B8",
          },
          "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
              borderColor: "grey.500",
              borderWidth: "0.0625rem",
            },
          },
        }}
      ></TextField>
      <Box display="flex" flexDirection="row" marginTop={"1.3rem"}>
        <TextField
          error={psValid}
          data-testid="PostCode"
          size="small"
          id="PostCode"
          label="PostCode"
          variant="outlined"
          value={psCode}
          onBlur={handlePSCodeValidation}
          onChange={(e) => setPsCode(e.target.value)}
          sx={{
            width: "100%",
            "& label.Mui-focused": {
              color: "#94A3B8",
            },
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                borderColor: "grey.500",
                borderWidth: "0.0625rem",
              },
            },
          }}
        ></TextField>
        <TextField
          size="small"
          id="Plaatsnaam"
          label="Plaatsnaam"
          variant="outlined"
          onChange={(e) => setCity(e.target.value)}
          value={city}
          sx={{
            ml: "1.5rem",
            width: "100%",
            "& label.Mui-focused": {
              color: "#94A3B8",
            },
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                borderColor: "grey.500",
                borderWidth: "0.0625rem",
              },
            },
          }}
        ></TextField>
      </Box>
    </Stack>
  );
};

export default PostBusComponent;
