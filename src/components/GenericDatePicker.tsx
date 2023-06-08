import { DatePicker } from "@mui/x-date-pickers";

export type GenericDatePickerProps = {
  label?: string;
  value: Date;
  onChange: any;
  error?: any;
};

const GenericDatePicker = ({
  label,
  value,
  onChange,
  error,
}: GenericDatePickerProps) => {
  return (
    <DatePicker
      label={label}
      value={value}
      onChange={onChange}
      openTo="day"
      views={["year", "month", "day"]}
      format={"dd/MM/yyyy"}
      onError={error}
      sx={{
        maxWidth: { xs: "98.5%", md: "15.25rem" },
        minWidth: "6.125rem",
        marginTop: "-1.5rem",
        pb: "1.5rem",
        "& .MuiInputBase-input": {
          py: "0.53rem",
        },
        "& .MuiFormLabel-root": {
          position: "relative",
          top: "1rem",
        },
      }}
    />
  );
};

export default GenericDatePicker;
