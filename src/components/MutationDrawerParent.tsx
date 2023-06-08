import React, { useEffect, useState } from "react";
import MutationDrawerStep0 from "../pages/PortfolioItem/MutationDrawerScreens/MutationDrawerStep0";
import { Box, Button, Fade, Step, StepLabel, Stepper } from "@mui/material";
import MutationAdressStep1 from "../pages/PortfolioItem/MutationDrawerScreens/MutationAdressStep1";
import MutationBeeindingStep1 from "../pages/PortfolioItem/MutationDrawerScreens/MutationBeeindingStep1";
import MutationIndexStep1 from "../pages/PortfolioItem/MutationDrawerScreens/MutationIndexStep1";
import MuationDekkingStep1 from "../pages/PortfolioItem/MutationDrawerScreens/MuationDekkingStep1";
import MutationPaymentStep1 from "../pages/PortfolioItem/MutationDrawerScreens/MutationPaymentStep1";
import MutationContactStep1 from "../pages/PortfolioItem/MutationDrawerScreens/MutationContactStep1";
import useResizeHandler from "../lib/hooks/useResizeHandler";

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
  setNewData?: (ValidatedMutations: FormatedAdress) => void;
  setSteps?: (StepperLabelsAndStepCount: string[]) => void;
  setStepperActive?: (StepperState: boolean) => void;
  setCurrentStepperLocation?: (CurrentStep: number) => void;
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
          primaryText: "Dekking",
          disabled: false,
          component: MuationDekkingStep1,
          handler: handleNext,
        },
        {
          primaryText: "Betaalwijze",
          disabled: true,
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
          disabled: false,
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
  const [newData, setnewData] = useState({});
  const Screen = currentScreen;
  const [steps, setSteps] = useState([""]);
  const [stepperActive, setStepperActive] = useState(false);
  const size = useResizeHandler();

  useEffect(() => {}, [stepperActive]);

  return (
    <>
      {stepperActive && (
        <Stepper activeStep={currentStepperLocation}>
          {steps.map((label) => {
            const stepProps: { completed?: boolean } = {};
            const labelProps: {
              optional?: React.ReactNode;
            } = {};
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>
                  {size.width > 600 ? label : null}
                </StepLabel>
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
      />
    </>
  );
}

export default MutationDrawerParent;
