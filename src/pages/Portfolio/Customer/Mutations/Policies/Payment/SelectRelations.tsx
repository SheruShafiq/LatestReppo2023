import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Checkbox,
  Fade,
  FormControlLabel,
  FormGroup,
  Typography,
} from "@mui/material";
import NavigationButtons from "@/components/NavigationButtons";
import GrowBox from "@/components/GrowBox";
import SelectableFormListItem from "@/components/SelectableFormListItem";

export type RelationProps = {
  handleNext: () => void;
  handleBack: () => void;
  oldData?: { data: { relations: Person[] } };
  newData: { policy_id: string }[];
  setSelectAll: (prev: any) => void;
  isButtonDisabled: boolean;
  handleCheckboxChange: (person: Person, policy: Policy) => void;
  selectAll: boolean | undefined;
};

export type Person = {
  first_name: string;
  last_name: string;
  policies?: Policy[];
};

export type Policy = {
  id: string;
  external_number: string;
  product_name: string;
};

const SelectRelations: React.FC<RelationProps> = ({
  handleNext,
  handleBack,
  oldData,
  newData,
  setSelectAll,
  isButtonDisabled,
  handleCheckboxChange,
  selectAll,
}) => {
  return (
    <>
      <Box>
        <Typography sx={{ color: "black", pt: "12px", pl: "8px" }}>
          Selecteer de personen voor wie het adres aangepast moet worden
        </Typography>
        <FormGroup>
          <FormControlLabel
            sx={{ pt: "2rem", pb: "1rem", ml: "0rem" }}
            control={<Checkbox checked={selectAll} />}
            onChange={() => setSelectAll(!selectAll)}
            label={
              <Typography variant="h1" fontSize="1rem" fontWeight={400}>
                Selecteer alle personen
              </Typography>
            }
          />
          {oldData &&
            oldData.data.relations.map((person: Person) =>
              person.policies
                ? person.policies.map((policy: Policy) => (
                    <SelectableFormListItem
                      key={policy.id}
                      id={policy.id}
                      checked={newData.some(
                        (selectedPolicy: any) =>
                          selectedPolicy.policy_id === policy?.id
                      )}
                      onSelect={() => handleCheckboxChange(person, policy)}
                      title={policy?.external_number}
                      subtitle={policy?.product_name}
                      subtitle2={`${person.first_name} ${person.last_name}`}
                    />
                  ))
                : null
            )}
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
