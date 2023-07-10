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
import MutationDrawerStep0 from "./MutationDrawerStep0";
import MutationAdressStep2 from "./MutationAdressStep2";
import {
  CurrentScreenProps,
  PersonDetails,
} from "../../../components/MutationDrawerParent";
import MutationAddressStep3 from "./MutationAdressStep3";

const InputSection: React.FC<CurrentScreenProps> = ({
  handleNext,
  handleBack,
  setStepperActive,
  setSteps,
  setCurrentStepperLocation,
  oldData,
  setNewData,
  newData,
  setExpectedSteps,
}) => {
  const [selectedPersons, setSelectedPersons] = useState<string[]>([]);

  const personDetails: PersonDetails[] = oldData.data.relations.map(
    (relation: any) => ({
      name: `${relation.first_name} ${relation.last_name}`,
      id: relation.external_number,
    })
  );
  const handlePersonSelect = (personId: string) => {
    if (selectedPersons.includes(personId)) {
      setSelectedPersons((prevSelectedPersons) =>
        prevSelectedPersons.filter((id) => id !== personId)
      );
    } else {
      setSelectedPersons((prevSelectedPersons) => [
        ...prevSelectedPersons,
        personId,
      ]);
    }
  };

  useEffect(() => {
    if (setNewData) {
      const newData = selectedPersons.map((personId) => ({
        relation_id: personId,
        postal_code: oldData.data?.postal_code,
        housenumber: oldData.data?.housenumber,
      }));
      setNewData(newData);
    }
  }, [selectedPersons, setNewData, oldData]);

  const isButtonDisabled = selectedPersons.length === 0;

  useEffect(() => {
    if (setNewData) {
      const newData = oldData.data.relations
        .filter((relation: any) =>
          selectedPersons.includes(relation.external_number)
        )
        .map((relation: any) => ({
          relation_id: relation.external_number,
          postal_code: oldData.data?.postal_code,
          housenumber: oldData.data?.housenumber,
        }));
      setNewData(newData);
    }
  }, [selectedPersons, setNewData, oldData]);

  if (!setStepperActive || !setSteps || !setCurrentStepperLocation) {
    return <div>Something went wrong</div>;
  }
  useEffect(() => {
    if (
      setCurrentStepperLocation &&
      setStepperActive &&
      setSteps &&
      setExpectedSteps
    ) {
      // Set the stepper active
      setStepperActive(true);

      // Set the steps array with your desired strings
      const steps: string[] = ["Selecteer personen", "Wijziging", "Bevestigen"];
      setSteps(steps);

      // Set the current stepper location
      setCurrentStepperLocation(0);
      setExpectedSteps([
        InputSection,
        MutationAdressStep2,
        MutationAddressStep3,
      ]);
    }
  }, [setStepperActive, setSteps, setCurrentStepperLocation]);
  return (
    <>
      <Box>
        <Typography sx={{ color: "black", pt: "12px", pb: "2rem" }}>
          Selecteer de personen voor wie het adres aangepast moet worden
        </Typography>
        <FormGroup>
          {personDetails.map((person: any) => (
            <FormControlLabel
              key={person.id}
              value={person.name}
              control={
                <Checkbox
                  onChange={() => handlePersonSelect(person.id)}
                  checked={selectedPersons.includes(person.id)}
                />
              }
              label={
                <>
                  <Typography variant="h1" fontSize="1.2rem" fontWeight={500}>
                    {person.name}
                  </Typography>
                  <Typography
                    variant="h1"
                    fontSize="1rem"
                    fontWeight={400}
                    sx={{ pt: "10px" }}
                  >
                    {person.id}
                  </Typography>
                  <Typography
                    variant="h1"
                    fontSize="1rem"
                    fontWeight={400}
                    sx={{ pt: "10px" }}
                  >
                    {`${oldData.data?.street} ${oldData.data?.housenumber}${oldData.data?.housenumber_addition},  ${oldData.data?.city}`}
                  </Typography>
                </>
              }
              labelPlacement="end"
              sx={{
                width: "100%",
                pt: "1rem",
                pb: "1rem",
                mb: "1rem",
                ml: "0rem",
                borderRadius: "10px",
                backgroundColor: selectedPersons.includes(person.id)
                  ? "#F1F5F9"
                  : "none",
              }}
            />
          ))}
        </FormGroup>
      </Box>
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
            onClick={() => {
              handleBack(MutationDrawerStep0);
              setStepperActive(false);
              setCurrentStepperLocation(-1);
            }}
          >
            STAP TERUG
          </Button>

          <Button
            variant="contained"
            sx={{ width: { xs: "22rem", sm: "8.5rem" } }}
            onClick={() => {
              handleNext(MutationAdressStep2);
              setCurrentStepperLocation(1);
            }}
            disabled={isButtonDisabled}
          >
            VOLGENDE
          </Button>
        </Box>
      </Fade>
    </>
  );
};

export default InputSection;
