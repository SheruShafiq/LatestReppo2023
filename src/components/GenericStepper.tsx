import {
  Step,
  StepButton,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import React from "react";
import useResizeHandler from "../lib/hooks/useResizeHandler";

export type Step = {
  label: string;
  navigation: (index: number) => void;
  isOptional?: boolean;
};

export type GenericStepperProps = {
  activeStep: number;
  steps: Step[];
};

const GenericStepper = ({ activeStep, steps }: GenericStepperProps) => {
  const size = useResizeHandler();
  return (
    <Stepper activeStep={activeStep}>
      {steps.map((step, index) => {
        const stepProps: { completed?: boolean } = {};
        const labelProps: { optional?: React.ReactNode } = {};
        if (step.isOptional) {
          labelProps.optional = (
            <Typography variant="caption">Optional</Typography>
          );
        }
        return (
          <Step key={step.label} {...stepProps}>
            <StepButton {...labelProps} onClick={() => step.navigation(index)}>
              {size.width > 600 ? step.label : null}
            </StepButton>
          </Step>
        );
      })}
    </Stepper>
  );
};

export default GenericStepper;
