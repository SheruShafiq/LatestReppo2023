import { Box, Checkbox, FormControlLabel, Typography } from "@mui/material";
import React, { SyntheticEvent } from "react";

export type SelectableFormListItemProps = {
  id: string;
  checked: boolean;
  onSelect: (event: SyntheticEvent<Element, Event>, checked: boolean) => void;
  title: string;
  subtitle: string;
  subtitle2: string;
};

const SelectableFormListItem = ({
  id,
  checked,
  onSelect,
  title,
  subtitle,
  subtitle2,
}: SelectableFormListItemProps) => {
  return (
    <FormControlLabel
      key={id}
      value={id}
      checked={checked}
      control={<Checkbox />}
      onChange={onSelect}
      label={
        <Box>
          <Typography variant="h1" fontSize="1.2rem" fontWeight={500}>
            {title}
          </Typography>
          <Typography
            variant="h1"
            fontSize="1rem"
            fontWeight={400}
            sx={{ pt: "10px" }}
          >
            {subtitle}
          </Typography>
          <Typography
            variant="h1"
            fontSize="1rem"
            fontWeight={400}
            sx={{ pt: "10px" }}
          >
            {subtitle2}
          </Typography>
        </Box>
      }
      labelPlacement="end"
      sx={{
        width: "100%",
        py: "1rem",
        mb: "1rem",
        ml: "0rem",
        borderRadius: "10px",
        backgroundColor: checked ? "#F1F5F9" : "none",
      }}
      data-testid="selectable-form-list-item"
    />
  );
};

export default SelectableFormListItem;
