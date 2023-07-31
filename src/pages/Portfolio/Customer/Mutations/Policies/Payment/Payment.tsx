import { Stepper, Step, StepButton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

import {
  selectOldData,
  setDrawerState,
  setInFlow,
  setReset,
  setWarningActive,
} from "@/lib/redux/slices/mutationSlice";
import InputNewChanges from "./InputNewChanges";
import CheckAndSubmit from "./CheckAndSubmit";
import AerService from "@/lib/api/AerService";
import AerClient from "@/lib/api/AerClient";
import SelectRelations from "./SelectRelations";
import useResizeHandler from "@/lib/hooks/useResizeHandler";
import { useAppDispatch } from "@/lib/hooks/useAppDispatch";
import { useAppSelector } from "@/lib/hooks/useAppSelector";
import { validateIBAN } from "@/lib/helper/Regex";

function Payment(): JSX.Element {
  const dispatch = useAppDispatch();
  const size = useResizeHandler();
  const steps = ["Selecteer personen", "Wijziging", "Bevestigen"];
  const [currentStepperLocation, setCurrentStepperLocation] = useState(0);
  const expectedSteps = [0, 1, 2];
  const [newData, setNewData] = useState<any[]>([]);
  const oldData = useAppSelector(selectOldData);

  const sendData = async () => {
    dispatch(setDrawerState(false));
  };

  const handleNext = () => {
    if (currentStepperLocation === 2) {
      setCurrentStepperLocation(0);
      sendData();
    } else {
      setCurrentStepperLocation((prevLocation) => prevLocation + 1);
    }
  };

  const handleBack = () => {
    if (currentStepperLocation === 0) {
      dispatch(setWarningActive(false));
      dispatch(setReset(true));
    } else {
      setCurrentStepperLocation((prevLocation) => prevLocation - 1);
    }
  };
  const [selectAll, setSelectAll] = useState<boolean>();
  const [isButtonDsiabled, setisButtonDsiabled] = useState<boolean>(true);

  useEffect(() => {
    if (newData.length > 0) {
      setisButtonDsiabled(false);
    } else {
      setisButtonDsiabled(true);
    }
  }, [newData]);

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
  }, [selectAll, setNewData]);

  const handleCheckboxChange = (person: any, policy: any) => {
    const policyIndex = newData.findIndex(
      (data: any) => data.policy_id === policy.id
    );

    if (policyIndex !== -1) {
      // Policy already exists in newData, remove it
      if (setNewData) {
        setNewData((prevData: any) => {
          const updatedData = [...prevData];
          updatedData.splice(policyIndex, 1);
          return updatedData;
        });
      }
    } else {
      // Policy doesn't exist in newData, add it with the corresponding mutation
      const newPolicyData = {
        policy_id: policy.id,
        policy_details: {
          ...policy,
          MutationPreiumFrequence: "",
          MutationPaymentMethod: "",
          MutationIban: "",
        },
        person_details: person,
      };

      if (setNewData) {
        setNewData((prevData: any) => [...prevData, newPolicyData]);
      }
    }
  };

  const [loading, setLoading] = React.useState(false);

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
  }, [selectAll, setNewData]);

  useEffect(() => {
    dispatch(setInFlow(true));
  }, []);

  const [paymentFrequency, setPaymentFrequency] = useState<string[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<string[]>([]);
  const [iban, setIban] = useState<string[]>([]);
  const [formCompleted, setFormCompleted] = useState<boolean>(true);

  const handleFrequencyChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const updatedFrequency = [...paymentFrequency];
    updatedFrequency[index] = event.target.value;
    setPaymentFrequency(updatedFrequency);

    const updatedData = newData.map((data: any, dataIndex: number) => {
      if (dataIndex === index) {
        return {
          ...data,
          policy_details: {
            ...data.policy_details,
            MutationPreiumFrequence: event.target.value,
          },
        };
      }
      return data;
    });
    if (setNewData) {
      setNewData(updatedData);
    }
  };

  const handleMethodChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const updatedMethod = [...paymentMethod];
    updatedMethod[index] = event.target.value;
    setPaymentMethod(updatedMethod);

    const updatedData = newData.map((data: any, dataIndex: number) => {
      if (dataIndex === index) {
        return {
          ...data,
          policy_details: {
            ...data.policy_details,
            MutationPaymentMethod: event.target.value,
          },
        };
      }
      return data;
    });
    if (setNewData) {
      setNewData(updatedData);
    }
  };

  const [ibanValidation, setIbanValidation] = useState<(boolean | null)[]>(
    newData.map(() => null)
  );

  const handleIbanChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const updatedIban = [...iban];
    updatedIban[index] = event.target.value;
    setIban(updatedIban);

    const updatedData = newData.map((data: any, dataIndex: number) => {
      if (dataIndex === index) {
        return {
          ...data,
          policy_details: {
            ...data.policy_details,
            MutationIban: event.target.value,
          },
        };
      }
      return data;
    });
    if (setNewData) {
      setNewData(updatedData);
      console.log(newData);
    }
  };

  const handleIbanBlur = (index: number) => {
    const updatedValidation = [...ibanValidation];
    updatedValidation[index] = validateIBAN.test(iban[index]);
    setIbanValidation(updatedValidation);
  };

  useEffect(() => {
    if (iban[0])
      if (iban[0].length === 18) {
        const updatedValidation = [...ibanValidation];
        updatedValidation[0] = validateIBAN.test(iban[0]);
        setIbanValidation(updatedValidation);
      } else {
        setIbanValidation([false]);
      }
  }, [iban]);

  useEffect(() => {
    if (
      paymentFrequency.length === newData.length &&
      paymentMethod.length === newData.length &&
      iban.length === newData.length &&
      ibanValidation[0]
    ) {
      setFormCompleted(false);
    } else {
      setFormCompleted(true);
    }
  }, [paymentFrequency, paymentMethod, ibanValidation, newData]);

  const currentScreen = () => {
    switch (currentStepperLocation) {
      case 0:
        return (
          <SelectRelations
            selectAll={selectAll}
            handleCheckboxChange={handleCheckboxChange}
            oldData={oldData}
            handleNext={handleNext}
            handleBack={handleBack}
            setSelectAll={setSelectAll}
            isButtonDisabled={isButtonDsiabled}
            newData={newData}
          />
        );
      case 1:
        return (
          <InputNewChanges
            handleNext={handleNext}
            handleBack={handleBack}
            newData={newData}
            paymentFrequency={paymentFrequency}
            handleFrequencyChange={handleFrequencyChange}
            paymentMethod={paymentMethod}
            iban={iban}
            isButtonDisabled={formCompleted}
            handleMethodChange={handleMethodChange}
            handleIbanChange={handleIbanChange}
            handleIbanBlur={handleIbanBlur}
            ibanValidation={ibanValidation}
          />
        );
      case 2:
        return (
          <CheckAndSubmit
            newData={newData}
            handleNext={handleNext}
            handleBack={handleBack}
            loading={loading}
            setLoading={setLoading}
          />
        );
      default:
        return (
          <SelectRelations
            handleCheckboxChange={handleCheckboxChange}
            oldData={oldData}
            handleNext={handleNext}
            handleBack={handleBack}
            setSelectAll={setSelectAll}
            isButtonDisabled={isButtonDsiabled}
            newData={newData}
            selectAll={selectAll}
          />
        );
    }
  };

  return (
    <>
      <Stepper activeStep={currentStepperLocation}>
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
            error?: boolean;
            icon?: React.ReactNode;
          } = {};

          // if (invalidAddress && index === 1) {
          //   labelProps.optional = (
          //     <Typography variant="caption" color="error">
          //       Invalid Address
          //     </Typography>
          //   );
          //   labelProps.icon = <ReportProblem sx={{ color: "red" }} />;
          // }

          const expectedStep = expectedSteps[index];

          return (
            <Step key={label} {...stepProps}>
              <StepButton
                {...labelProps}
                onClick={() => {
                  setCurrentStepperLocation(expectedStep);
                }}
              >
                {size.width > 600 ? label : null}
              </StepButton>
            </Step>
          );
        })}
      </Stepper>

      {currentScreen()}
    </>
  );
}

export default Payment;
