import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";

import React from "react";

export type RadioInputProps = {
  title?: string;
  radioGroupValue: string;
  handleChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    index: any
  ) => void;
  options?: string[];
};

const RadioInput = ({
  title,
  radioGroupValue,
  handleChange,
  options,
}: RadioInputProps) => {
  return (
    <Stack id={"Betaalfrequentie"} flex={1}>
      {title && (
        <Typography fontSize={"14px"} lineHeight={"26px"} color={"#6C737F"}>
          {title}
        </Typography>
      )}

      <FormControl>
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={radioGroupValue}
          onChange={handleChange}
        >
          {options?.map((option) => (
            <FormControlLabel
              value={option}
              control={<Radio />}
              label={option}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </Stack>
  );
};

export default RadioInput;
