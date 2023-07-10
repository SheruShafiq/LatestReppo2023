import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Checkbox,
  Fade,
  FormControlLabel,
  FormGroup,
  Stack,
  Typography,
} from "@mui/material";
import MutationDrawerStep0 from "./MutationDrawerStep0";
import MutationAdressStep2 from "./MutationAdressStep2";
import {
  CurrentScreenProps,
  PolicyDetails,
} from "../../../components/MutationDrawerParent";
import MutationPaymentStep2 from "./MutationPaymentStep2";
import MutationPaymentStep3 from "./MutationPaymentStep3";

type PolicySelection = { name: string; external_number: string };
const MutationPaymentStep1: React.FC<CurrentScreenProps> = ({
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
      const steps: string[] = ["Selecteer polissen", "Wijziging", "Bevestigen"];
      setSteps(steps);

      // Set the current stepper location
      setCurrentStepperLocation(0);
      setExpectedSteps([
        MutationPaymentStep1,
        MutationPaymentStep2,
        MutationPaymentStep3,
      ]);
    }
  }, [setStepperActive, setSteps, setCurrentStepperLocation, setExpectedSteps]);

  if (!setStepperActive || !setSteps || !setCurrentStepperLocation) {
    return <div>Something went wrong</div>;
  }

  const [selectAll, setSelectAll] = useState<boolean>(false);

  useEffect(() => {
    if (selectAll) {
      const allPolicies = oldData.data.relations.flatMap(
        (person: any) =>
          person.policies?.map((policy: any) => ({
            policy_id: policy.id,
            policy_details: policy,
            person_details: person,
          })) || []
      );
      if (setNewData) {
        setNewData(allPolicies);
      }
    } else {
      if (setNewData) {
        setNewData([]);
      }
    }
  }, [selectAll, oldData, setNewData]);

  const handleCheckboxChange = (person: any, policy: any) => {
    const newPolicyData = {
      policy_id: policy.id,
      policy_details: policy,
      person_details: person,
    };

    if (newData.some((data: any) => data.policy_id === policy.id)) {
      if (setNewData) {
        setNewData((prevData: any) =>
          prevData.filter((data: any) => data.policy_id !== policy.id)
        );
      }
    } else {
      if (setNewData) {
        setNewData((prevData: any) => [...prevData, newPolicyData]);
      }
    }
  };

  return (
    <>
      <Box>
        <Typography sx={{ color: "black", pt: "12px", pl: "8px" }}>
          Selecteer de personen voor wie het adres aangepast moet worden
        </Typography>
        <FormGroup>
          <FormControlLabel
            sx={{ pt: "2rem", pb: "1rem", ml: "0rem" }}
            control={<Checkbox />}
            onChange={() => setSelectAll((prev) => !prev)}
            label={
              <Typography variant="h1" fontSize="1rem" fontWeight={400}>
                Selecteer alle personen
              </Typography>
            }
          />
          {oldData.data.relations.map((person: any) =>
            person.policies
              ? person.policies.map((policy: any) => (
                  <FormControlLabel
                    key={policy.id}
                    value={policy.id}
                    checked={newData.some(
                      (selectedPolicy: any) =>
                        selectedPolicy.policy_id === policy.id
                    )}
                    control={<Checkbox />}
                    onChange={() => handleCheckboxChange(person, policy)}
                    label={
                      <Box>
                        <Typography
                          variant="h1"
                          fontSize="1.2rem"
                          fontWeight={500}
                        >
                          {policy.external_number}
                        </Typography>
                        <Typography
                          variant="h1"
                          fontSize="1rem"
                          fontWeight={400}
                          sx={{ pt: "10px" }}
                        >
                          {policy.product_name}
                        </Typography>
                        <Typography
                          variant="h1"
                          fontSize="1rem"
                          fontWeight={400}
                          sx={{ pt: "10px" }}
                        >
                          {person.first_name} {person.last_name}
                        </Typography>
                      </Box>
                    }
                    labelPlacement="end"
                    sx={{
                      pt: "1rem",
                      pb: "1rem",
                      mb: "1rem",

                      ml: "0rem",
                      borderRadius: "10px",
                      backgroundColor: newData.some(
                        (selectedPolicy: any) =>
                          selectedPolicy.policy_id === policy.id
                      )
                        ? "#F1F5F9"
                        : "none",
                    }}
                  />
                ))
              : null
          )}
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
              handleNext(MutationPaymentStep2);
              setCurrentStepperLocation(1);
            }}
            // disabled={isButtonDisabled}
          >
            VOLGENDE
          </Button>
        </Box>
      </Fade>
    </>
  );
};

export default MutationPaymentStep1;
