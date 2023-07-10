import React, { useEffect, useState } from "react";
import MutationDrawerStep0 from "../pages/PortfolioItem/MutationDrawerScreens/MutationDrawerStep0";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContentText,
  DialogTitle,
  Fade,
  Step,
  StepButton,
  StepLabel,
  Stepper,
} from "@mui/material";
import MutationAdressStep1 from "../pages/PortfolioItem/MutationDrawerScreens/MutationAdressStep1";
import MutationBeeindingStep1 from "../pages/PortfolioItem/MutationDrawerScreens/MutationBeeindingStep1";
import MutationIndexStep1 from "../pages/PortfolioItem/MutationDrawerScreens/MutationIndexStep1";
import MuationDekkingStep1 from "../pages/PortfolioItem/MutationDrawerScreens/MuationCoverageStep1";
import MutationPaymentStep1 from "../pages/PortfolioItem/MutationDrawerScreens/MutationPaymentStep1";
import MutationContactStep1 from "../pages/PortfolioItem/MutationDrawerScreens/MutationContactStep1";
import useResizeHandler from "../lib/hooks/useResizeHandler";
import MuatationAdressStep1 from "../pages/PortfolioItem/MutationDrawerScreens/MutationAdressStep1";
import { useAppSelector } from "../lib/hooks/useAppSelector";
import { selectPolicyDetailDrawerState } from "../lib/redux/slices/layoutSlice";
import mutationFlowWarning from "../lib/redux/slices/layoutSlice";
import { selectMutationFlowWarning } from "../lib/redux/slices/sessionSlice";
export type Section = {
  id: string;
  subtitle: string;
  items: SectionItem[];
};
export type PersonDetails = {
  name: string;
  id: string;
  address: string;
};

export type Policy = {
  id: string;
  external_number: string;
  product_name: string;
  product_code: string;
  indexation: boolean;
  status: string;
  premium: number;
  premium_period: string;
  premium_frequency: string;
  premium_enddate: string;
  payment_method: string;
  iban: string;
  distribution_costs: number;
  coverage: number;
  MutationPreiumFrequence?: string;
  MutationPayment_method?: string;
  MutationIban?: string;
};

export type PolicyDetails = {
  name: string;
  policy: Policy[]; // Add policy property
};
export type oldAdressPersonDetails = {
  id: string;
  external_number: string;
  initials: string;
  first_name: string;
  last_name: string;
  gender: string;
  birthdate: string;
  policies: Policy[];
};
export type newDataPayment = {
  policy_id: string;
  policy_details: Policy;
  person_details: oldAdressPersonDetails;
};
export type FormatedAdress = {
  postCode: string;
  houseNumber: number;
  toevoeging: string;
  street: string;
  city: string;
};

export type SectionItem = {
  primaryText: string;
  disabled: boolean;
  component: Function;
  handler: (handleNextFunction: React.FC<CurrentScreenProps>) => void;
};

export type CurrentScreenProps = {
  sections?: Section[];
  handleNext: (NextScreenComponent: React.FC<CurrentScreenProps>) => void;
  handleBack: (PreviousScreenComponent: React.FC<CurrentScreenProps>) => void;
  oldData?: any;
  newData?: any;
  setNewData?: (relationID?: any, validatedAdress?: any) => void;
  setSteps?: (StepperLabelsAndStepCount: string[]) => void;
  setStepperActive?: (StepperState: boolean) => void;
  setCurrentStepperLocation?: (CurrentStep: number) => void;
  setExpectedSteps?: any;
};

function MutationDrawerParent(data: any): JSX.Element {
  const handleNext = (component: React.FC<CurrentScreenProps>) => {
    setCurrentScreen(() => component);
    setCurrentStepperLocation((prevLocation) => prevLocation + 1);
  };

  const sections: Section[] = [
    {
      id: "1",
      subtitle: "Aanpassing op polis(sen)",
      items: [
        {
          primaryText: "Coverage",
          disabled: true,
          component: MuationDekkingStep1,
          handler: handleNext,
        },
        {
          primaryText: "Betaalwijze",
          disabled: false,
          component: MutationPaymentStep1,
          handler: handleNext,
        },
        {
          primaryText: "Indexatie",
          disabled: true,
          component: MutationIndexStep1,
          handler: handleNext,
        },
        {
          primaryText: "Beëindiging",
          disabled: true,
          component: MutationBeeindingStep1,
          handler: handleNext,
        },
      ],
    },
    {
      id: "2",
      subtitle: "Aanpassing van persoonsgegevens",
      items: [
        {
          primaryText: "Adres",
          disabled: false,
          component: MutationAdressStep1,
          handler: handleNext,
        },
        {
          primaryText: "Contactgegevens",
          disabled: true,
          component: MutationContactStep1,
          handler: handleNext,
        },
      ],
    },
  ];

  const [currentScreen, setCurrentScreen] = useState(() => MutationDrawerStep0);
  const [currentStepperLocation, setCurrentStepperLocation] = useState(-1);

  const handleBack = (component: any) => {
    setCurrentScreen(() => component);
    setCurrentStepperLocation((prevActiveStep) => prevActiveStep - 1);
  };
  const [newData, setnewData] = useState([]);
  const Screen = currentScreen;
  const [steps, setSteps] = useState([""]);
  const [stepperActive, setStepperActive] = useState(false);
  const size = useResizeHandler();
  const [expectedSteps, setExpectedSteps] = useState([]);

  useEffect(() => {
    console.log("expectedSteps", expectedSteps);
  }, [expectedSteps]);

  console.log(currentStepperLocation);
  const drawerState = useAppSelector(selectPolicyDetailDrawerState);
  useEffect(() => {
    handleBack(MutationDrawerStep0);
    setStepperActive(false);
  }, [drawerState]);
  const userFlowContinueState = useAppSelector(selectMutationFlowWarning);

  return (
    <>
      <Dialog
        open={userFlowContinueState}
        sx={{
          "& .MuiDialog-paper": {
            width: "507px",
            minHeight: "254px",
            pt: "1rem",
            pr: "1rem",
            pl: "1rem",
          },
        }}
      >
        <DialogTitle minWidth={"427px"}>
          Weet je zeker dat de mutatie wilt stoppen?
          <DialogContentText minWidth={"427px"}>
            Als je de mutatie beëindigd dan gaan de gegevens die je mogelijk al
            hebt ingevoerd verloren. Je kunt altijd de mutatie opnieuw starten
            op een later tijdstip.
          </DialogContentText>
        </DialogTitle>

        <DialogActions sx={{ mt: "2rem", mr: "1rem" }}>
          <Button
            color="inherit"
            sx={{
              width: { xs: "22rem", sm: "8.5rem" },
              mr: { xs: 0, sm: "2rem" },
            }}
          >
            Annuleren
          </Button>
          <Button
            variant="contained"
            sx={{ width: { xs: "22rem", sm: "14rem" } }}
          >
            MUTATIE BEËINDIGEN
          </Button>
        </DialogActions>
      </Dialog>
      {stepperActive && (
        <Stepper activeStep={currentStepperLocation}>
          {steps.map((label, index) => {
            const stepProps: { completed?: boolean } = {};
            const labelProps: {
              optional?: React.ReactNode;
            } = {};

            const expectedStep = expectedSteps[index]; // Get the corresponding value from expectedSteps

            return (
              <Step key={label} {...stepProps}>
                <StepButton
                  {...labelProps}
                  onClick={() => {
                    handleBack(expectedStep);
                  }}
                >
                  {size.width > 600 ? label : null}
                </StepButton>
              </Step>
            );
          })}
        </Stepper>
      )}

      <Screen
        sections={sections}
        handleNext={handleNext}
        handleBack={handleBack}
        oldData={data}
        newData={newData}
        setNewData={setnewData}
        setSteps={setSteps}
        setStepperActive={setStepperActive}
        setCurrentStepperLocation={setCurrentStepperLocation}
        setExpectedSteps={setExpectedSteps}
      />
    </>
  );
}

export default MutationDrawerParent;
