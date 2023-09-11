import { TextField, MenuItem, Box } from "@mui/material";
import React, { useEffect } from "react";

export type AddressChangeInputProps = {
  psCode: string;
  setPsCode: (psCode: string) => void;
  hsNr: number | string;
  setHsNr: (hsNr: string) => void;
  addition: string;
  setAddition: (addition: string) => void;
  hsValid: boolean;
};

const AddressChangeInput = ({
  psCode,
  setPsCode,
  hsNr,
  setHsNr,
  addition,
  setAddition,
  hsValid,
}: AddressChangeInputProps) => {
  const [psValid, setPsValid] = React.useState(false);
  type AdditionValues = {
    label: string;
    value: string;
  };
  const [values, setValues] = React.useState<AdditionValues[]>([]);
  const [data, setData] = React.useState({
    postal_code: "",
    street: "",
    housenumber: 0,
    city: "",
    extOptions: [],
  });

  useEffect(() => {
    const fetchFullAddress = async () => {
      try {
        const response = await fetch(
          "/api/address/lookup?" +
            new URLSearchParams({
              postal_code: psCode,
              housenumber: hsNr.toString(),
            }),
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const results = await response.json();

        if (results) {
          setData(results);
        } else {
          // Handle error condition
        }
      } catch (error) {
        // Handle error condition
      }
    };

    if (psCode && hsNr) {
      fetchFullAddress();
    }
  }, [psCode, hsNr]);

  useEffect(() => {
    if (data.extOptions) {
      const transformedArray = data.extOptions.slice(1).map((val: string) => ({
        label: val.trim(),
        value: val.trim(),
      }));
      if (transformedArray.length > 0) {
        setValues(transformedArray);
      }
    }
  }, [data]);

  const validPostalCode = /^[1-9][0-9]{3}\s?[a-zA-Z]{2}$/;
  const handlePSCodeValidation = (e: any) => {
    if (validPostalCode.test(psCode)) {
      setPsValid(false);
    } else {
      setPsValid(true);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        width: "100%",
        mt: "2rem",
        justifyContent: { xs: "center", sm: "flex-start" },
      }}
      id="notPostBusAddress"
    >
      <Box display={"flex"} flexDirection={"row"}>
        <TextField
          id="psCode"
          label="Postcode"
          variant="outlined"
          size="small"
          sx={{
            width: { xs: "100%", sm: "12.5rem" },

            pb: { xs: "1.5rem", sm: "0rem" },
            mr: "1.5rem",
            alignSelf: { xs: "flex-start", sm: "auto" },
          }}
          value={psCode}
          onChange={(e) => setPsCode(e.target.value)}
          onBlur={handlePSCodeValidation}
          error={psValid}
        />
        <TextField
          error={hsValid}
          type="text"
          id="huisNummer"
          label="Huisnummer"
          variant="outlined"
          size="small"
          value={hsNr}
          onChange={(e) => setHsNr(e.target.value)}
          sx={{
            width: { xs: "100%", sm: "12.5rem" },
            mr: { xs: "0rem", sm: "1.5rem" },
          }}
        />
      </Box>
      <TextField
        id="outlined-select-currency"
        select
        value={addition}
        defaultValue=""
        placeholder="addition."
        size="small"
        sx={{
          width: { xs: "100%", sm: "11rem" },
        }}
        onChange={(e) => setAddition(e.target.value)}
        data-testid="addition"
      >
        {values.map((option: any) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        id="psCode"
        label="Straatnaam"
        variant="outlined"
        size="small"
        value={data.street}
        sx={{
          width: { xs: "100%", sm: "12.5rem" },
          mr: { xs: "0rem", sm: "1.5rem" },
          mt: { xs: "1.5rem", sm: "1.2rem" },
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
        focused
      />
      <TextField
        id="psCode"
        label="Woonplaats"
        variant="outlined"
        size="small"
        focused
        value={data.city}
        sx={{
          width: { xs: "100%", sm: "12.5rem" },
          mt: { xs: "1.5rem", sm: "1.2rem" },
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
      />
    </Box>
  );
};

export default AddressChangeInput;
