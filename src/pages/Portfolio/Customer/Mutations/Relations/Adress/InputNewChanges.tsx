import React, {
  ChangeEvent,
  FocusEventHandler,
  useEffect,
  useState,
} from "react";
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
import { validPostalCode } from "@/lib/helper/Regex";
import AddressChangeInput from "@/components/AddressChangeInput";
import PostBusChangeInput from "@/components/PostBusChangeInput";
import GrowBox from "@/components/GrowBox";
import NavigationButtons from "@/components/NavigationButtons";

export type InputNewChangesProps = {
  isPostBusAddress: boolean;
  handleRadioChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  data: any;
  psCode: string;
  setPsCode: React.Dispatch<React.SetStateAction<string>>;
  handlSelectedadditionoeging: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  values: any;
  isButtonDisabled: boolean;
  houseNumber: number | string;
  handleHouseNumber: (event: string) => void;
  setAddition: any;
  addition: string;
  handleNext: () => void;
  handleBack: () => void;
  hsValid: boolean;
  city: string;
  setCity: React.Dispatch<React.SetStateAction<string>>;
};

function InputNewChanges({
  setAddition,
  houseNumber,
  isPostBusAddress,
  handleRadioChange,
  data,
  psCode,
  setPsCode,
  handleHouseNumber,
  isButtonDisabled,
  addition,
  handleNext,
  handleBack,
  hsValid,
  city,
  setCity,
}: InputNewChangesProps) {
  const [psValid, setPsValid] = useState(false);
  return (
    <Box height="100%" display="flex" flexDirection="column">
      <Typography
        sx={{
          color: "black",
          pt: "0.75rem",
        }}
      >
        Wat zijn de nieuwe adresgegevens
      </Typography>
      <Typography
        variant="body2"
        color="#6C737F"
        fontSize="1rem"
        fontWeight={400}
        sx={{ pt: "2rem" }}
      >
        Postbusadres?
      </Typography>
      <RadioGroup
        row
        sx={{ pl: { xs: "0.5rem", sm: "0.8rem" } }}
        value={isPostBusAddress ? "Ja" : "Nee"}
        onChange={handleRadioChange}
      >
        <FormControlLabel value="Nee" control={<Radio />} label="Nee" />
        <FormControlLabel value="Ja" control={<Radio />} label="Ja" />
      </RadioGroup>

      {isPostBusAddress ? (
        <PostBusChangeInput
          hsValid={hsValid}
          psValid={psValid}
          psCode={psCode}
          setPsValid={setPsValid}
          setPsCode={setPsCode}
          hsNr={houseNumber}
          setHsNr={handleHouseNumber}
          city={city}
          setCity={setCity}
        />
      ) : (
        <AddressChangeInput
          hsValid={hsValid}
          psCode={psCode}
          setPsCode={setPsCode}
          hsNr={houseNumber}
          setHsNr={handleHouseNumber}
          addition={addition}
          setAddition={setAddition}
        />
      )}
      <GrowBox />
      <NavigationButtons
        handleNext={handleNext}
        handleBack={handleBack}
        disabled={isButtonDisabled}
        backText="STAP TERUG"
        nextText="VOLGENDE"
      />
    </Box>
  );
}

export default InputNewChanges;
