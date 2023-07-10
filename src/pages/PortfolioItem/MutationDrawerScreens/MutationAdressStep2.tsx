import React, { useEffect, useState } from "react";
import {
  FormControlLabel,
  Box,
  Typography,
  Radio,
  RadioGroup,
  TextField,
  MenuItem,
  Button,
  Fade,
  Stack,
} from "@mui/material";
import MutationAddressStep3 from "./MutationAdressStep3";
import {
  CurrentScreenProps,
  FormatedAdress,
} from "../../../components/MutationDrawerParent";
import MutationAdressStep1 from "./MutationAdressStep1";

function MutationAdressStep2({
  handleNext,
  handleBack,
  oldData,
  newData,
  setNewData,
}: CurrentScreenProps): JSX.Element {
  const [psValid, setPsValid] = useState(false);
  const [psCode, setPsCode] = useState("");
  const [toev, setToev] = useState("");
  const [houseNumber, setHouseNumber] = useState(0);
  const [data, setData] = useState<any>([]);
  const [values, setValues] = useState<any>([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isPostBusAddress, setIsPostBusAddress] = useState(false);

  useEffect(() => {
    const fetchFullAddress = async () => {
      try {
        const response = await fetch(
          "/api/address/lookup?" +
            new URLSearchParams({
              postal_code: psCode,
              housenumber: houseNumber.toString(),
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

    if (psCode && houseNumber) {
      fetchFullAddress();
    }
  }, [psCode, houseNumber]);

  useEffect(() => {
    if (setNewData) {
      const newUserData = oldData.data.relations
        .filter((relation: any) =>
          newData.some(
            (item: any) => item.relation_id === relation.external_number
          )
        )
        .map((relation: any) => ({
          relation_id: relation.external_number,
          postal_code: psCode,
          housenumber: houseNumber,
          city: data.city,
          street: data.street,
          toev: toev,
        }));

      setNewData(newUserData);
    }
  }, [oldData, newData, psCode, houseNumber, data, toev, setNewData]);

  const validPostalCode = /^[1-9][0-9]{3}\s?[a-zA-Z]{2}$/;

  const handlePSCodeValidation = (e: any) => {
    if (validPostalCode.test(psCode)) {
      setPsValid(false);
    } else {
      setPsValid(true);
    }
  };

  const handleHsNrValidation = (e: any) => {
    setHouseNumber(e.target.value);
  };

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

  const handlSelectedToevoeging = (e: any) => {
    setToev(e.target.value);
  };

  useEffect(() => {
    setIsButtonDisabled(
      !(psCode && houseNumber && data.street && data.city && toev)
    );
  }, [psCode, houseNumber, data, toev]);

  const handleRadioChange = (e: any) => {
    setIsPostBusAddress(e.target.value === "Ja");
  };

  return (
    <Box height="100%" display="flex" flexDirection="column">
      <Typography
        sx={{
          color: "black",
          pt: "0.75rem",
          pl: { xs: "0rem", sm: "0.5rem" },
        }}
      >
        Wat zijn de nieuwe adresgegevens
      </Typography>
      <Typography
        variant="body2"
        color="#6C737F"
        fontSize="1rem"
        fontWeight={400}
        sx={{ pt: "2rem", pl: { xs: "0rem", sm: "0.5rem" } }}
      >
        Postbusadres?
      </Typography>
      <RadioGroup
        row
        sx={{ pl: { xs: "0.5rem", sm: "1.1875rem" } }}
        value={isPostBusAddress ? "Ja" : "Nee"}
        onChange={handleRadioChange}
      >
        <FormControlLabel value="Nee" control={<Radio />} label="Nee" />
        <FormControlLabel value="Ja" control={<Radio />} label="Ja" />
      </RadioGroup>

      {isPostBusAddress ? (
        <Stack id="PostBusAddress">
          <TextField
            size="small"
            fullWidth
            id="Postbusnummer"
            label="Postbusnummer"
            variant="outlined"
            value={data.city}
            sx={{
              mt: "1.5rem",
              mb: "1.5rem",
              ml: "0.3rem",
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
          <Box display="flex" flexDirection="row">
            <TextField
              size="small"
              id="Postbusnummer"
              label="Postbusnummer"
              variant="outlined"
              value={data.city}
              sx={{
                width: "306px",
                ml: "0.3rem",
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
              id="Postbusnummer"
              label="Postbusnummer"
              variant="outlined"
              value={data.city}
              sx={{
                width: "306px",
                ml: "2.5rem",
                mr: "-1rem",
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
      ) : (
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
          <TextField
            id="psCode"
            label="Postcode"
            variant="outlined"
            size="small"
            sx={{
              maxWidth: { xs: "10.5rem", sm: "12.5rem" },
              ml: { xs: "-1rem", sm: "0rem" },
              pb: { xs: "1.5rem", sm: "0rem" },
              mr: { xs: "0.6rem", sm: "1.5rem" },
            }}
            value={psCode}
            onChange={(e) => setPsCode(e.target.value)}
            onBlur={handlePSCodeValidation}
            error={psValid}
          />
          <TextField
            type="number"
            id="huisNummer"
            label="Huisnummer"
            variant="outlined"
            size="small"
            onChange={handleHsNrValidation}
            sx={{
              maxWidth: { xs: "10.5rem", sm: "12.5rem" },
              mr: { xs: "0rem", sm: "1.5rem" },
            }}
          />
          <TextField
            id="outlined-select-currency"
            select
            defaultValue=""
            placeholder="Toev."
            size="small"
            sx={{
              width: { xs: "24rem", sm: "11rem" },
              mr: { xs: "1rem", sm: "0rem" },
            }}
            onChange={handlSelectedToevoeging}
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
              width: { xs: "24rem", sm: "12.5rem" },
              mr: { xs: "1rem", sm: "1.5rem" },
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
              width: { xs: "24rem", sm: "12.5rem" },
              mr: { xs: "1rem", sm: "0rem" },
              ml: { xs: "0rem", sm: "0rem" },
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
      )}
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
            onClick={() => handleBack(MutationAdressStep1)}
          >
            STAP TERUG
          </Button>

          <Button
            variant="contained"
            sx={{ width: { xs: "22rem", sm: "8.5rem" } }}
            onClick={() => handleNext(MutationAddressStep3)}
            disabled={isButtonDisabled}
          >
            VOLGENDE
          </Button>
        </Box>
      </Fade>
    </Box>
  );
}

export default MutationAdressStep2;
