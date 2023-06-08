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

const InputSection: React.FC<CurrentScreenProps> = ({
  handleNext,
  handleBack,
  setStepperActive,
  setSteps,
  setCurrentStepperLocation,
  oldData,
}) => {
  const [selectedPersons, setSelectedPersons] = useState<string[]>([]);

  const personDetails: PersonDetails[] = [
    {
      name: `${oldData.data.relations[0].first_name} ${oldData.data.relations[0].last_name}`,
      id: oldData.data.relations[0].external_number,
      address: `${oldData.data?.street} ${oldData.data?.housenumber}${oldData.data?.housenumber_addition},  ${oldData.data?.city}`,
    },
    {
      name: `${oldData.data.relations[1].first_name} ${oldData.data.relations[1].last_name}`,
      id: oldData.data.relations[1].external_number,
      address: `${oldData.data?.street} ${oldData.data?.housenumber}${oldData.data?.housenumber_addition},  ${oldData.data?.city}`,
    },
  ];

  const handlePersonSelect = (personId: string) => {
    if (selectedPersons.includes(personId)) {
      setSelectedPersons(selectedPersons.filter((id) => id !== personId));
    } else {
      setSelectedPersons([...selectedPersons, personId]);
    }
  };

  const isButtonDisabled = selectedPersons.length === 0;

  useEffect(() => {
    if (setCurrentStepperLocation && setStepperActive && setSteps) {
      // Set the stepper active
      setStepperActive(true);

      // Set the steps array with your desired strings
      const steps: string[] = ["Step 0", "Input Section", "Step 2"];
      setSteps(steps);

      // Set the current stepper location
      setCurrentStepperLocation(0);
    }
  }, [setStepperActive, setSteps, setCurrentStepperLocation]);

  if (!setStepperActive || !setSteps || !setCurrentStepperLocation) {
    return <div>Something went wrong</div>;
  }

  return (
    <>
      <Box>
        <Typography sx={{ color: "black", pt: "12px" }}>
          Selecteer de personen voor wie het adres aangepast moet worden
        </Typography>
        <FormGroup>
          {personDetails.map((person) => (
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
                    {person.address}
                  </Typography>
                </>
              }
              labelPlacement="end"
              sx={{ pt: "4rem", pl: "1rem" }}
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
