import GrowBox from "@/components/GrowBox";
import NavigationButtons from "@/components/NavigationButtons";
import SelectableFormListItem from "@/components/SelectableFormListItem";
import { useAppDispatch } from "@/lib/hooks/useAppDispatch";
import { setReset, setWarningActive } from "@/lib/redux/slices/mutationSlice";
import { Box, Typography, FormGroup, Fade, Button } from "@mui/material";
import React from "react";

const SelectRelations: React.FC<any> = ({
  stepHandler,
  personDetails,
  handlePersonSelect,
  selectedPersons,
  oldData,
  isButtonDisabled,
  handleNext,
  handleBack,
}) => {
  const dispatch = useAppDispatch();
  return (
    <>
      <Box>
        <Typography sx={{ color: "black", pt: "12px", pb: "2rem" }}>
          Selecteer de personen voor wie het adres aangepast moet worden
        </Typography>
        <FormGroup>
          {personDetails.map((person: any) => (
            <SelectableFormListItem
              key={person.id}
              id={person.id}
              checked={selectedPersons.includes(person.id)}
              onSelect={() => handlePersonSelect(person.id)}
              title={person.name}
              subtitle={person.id}
              subtitle2={`${oldData.data?.street} ${oldData.data?.housenumber}${oldData.data?.housenumber_addition},  ${oldData.data?.city}`}
            />
          ))}
        </FormGroup>
      </Box>
      <GrowBox />
      <NavigationButtons
        handleNext={handleNext}
        handleBack={handleBack}
        disabled={isButtonDisabled}
        backText="STAP TERUG"
        nextText="VOLGENDE"
      />
    </>
  );
};

export default SelectRelations;
