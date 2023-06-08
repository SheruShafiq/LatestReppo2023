import { TextField } from "@mui/material";
import React from "react";

export type GenericInputFieldProps = {
  label?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  style?: React.CSSProperties;
  error?: boolean;
};

const GenericInputField = ({
  label,
  value,
  onChange,
  style,
  error,
}: GenericInputFieldProps) => {
  return (
    <TextField
      variant="outlined"
      label={label}
      value={value}
      onChange={onChange}
      size="small"
      error={error}
      sx={{
        maxWidth: { xs: "100%", md: "15.75rem" },
        minWidth: "6.125rem",
        pb: "1.5rem",
        pr: "0.5rem",
      }}
      test-id="generic-input-field"
      className="generic-input-field"
      
      //   placeholder={label}
    />
  );
};

export default GenericInputField;
