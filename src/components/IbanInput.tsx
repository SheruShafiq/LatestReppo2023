import { TextField } from "@mui/material";
import { validateIBAN } from "@/lib/helper/Regex";
import React from "react";

export type IbanInputProps = {
  value: string;
  change: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
const IbanInput = ({ value, change }: IbanInputProps) => {
  const [error, setError] = React.useState(false);

  function ibanValidation(iban: string) {
    if (iban.length === 18) {
      setError(!validateIBAN.test(iban));
    } else {
      setError(true);
    }
  }

  return (
    <TextField
      label="IBAN"
      variant="outlined"
      value={value}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
        change(event);
      }}
      onBlur={() => ibanValidation(value)}
      sx={{ height: "2.5rem" }}
      size="small"
      error={error}
    />
  );
};

export default IbanInput;
