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
import SelectRelations from "./SelectRelations";
import { ReportProblem } from "@mui/icons-material";
import useResizeHandler from "@/lib/hooks/useResizeHandler";
import { useAppDispatch } from "@/lib/hooks/useAppDispatch";
import { useAppSelector } from "@/lib/hooks/useAppSelector";
import AerClient from "@/lib/api/AerClient";
import { validPostalCode } from "@/lib/helper/Regex";

function Address(): JSX.Element {
  const dispatch = useAppDispatch();
  const size = useResizeHandler();
  const steps = ["Selecteer personen", "Wijziging", "Bevestigen"];
  const [currentStepperLocation, setCurrentStepperLocation] = useState(0);
  const [newData, setNewData] = useState<any[]>([]);
  const oldData = useAppSelector(selectOldData);
  const [selectedPersons, setSelectedPersons] = useState<string[]>([]);
  const personDetails =
    oldData?.data?.relations?.map((relation: any) => ({
      name: `${relation.first_name} ${relation.last_name}`,
      id: relation.external_number,
    })) || [];

  const handlePersonSelect = (personId: string) => {
    setSelectedPersons((prevSelectedPersons) => {
      if (prevSelectedPersons.includes(personId)) {
        return prevSelectedPersons.filter((id) => id !== personId);
      } else {
        return [...prevSelectedPersons, personId];
      }
    });
  };

  const disabled = selectedPersons.length === 0;
  useEffect(() => {
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
  }, [selectedPersons]);

  const [psCode, setPsCode] = useState("");
  const [addition, setAddition] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [data, setData] = useState<any>({});
  const [values, setValues] = useState<any>([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isPostBusAddress, setIsPostBusAddress] = useState(false);
  const [invalidAddress, setInvalidAddress] = useState(false);
  const [city, setCity] = useState("");
  const [psValid, setPsValid] = useState(false);
  const fetchFullAddress = async () => {
    if (isPostBusAddress) {
      return;
    }
    const service = new AerService(AerClient);
    try {
      const response = await service.getAddressLookup(psCode, houseNumber);

      if (response && !response.error) {
        setData(response);
        setInvalidAddress(false);
      } else {
        setInvalidAddress(true);
      }
    } catch (error) {
      console.log("An error occurred:", error);
      setInvalidAddress(true);
    }
  };

  useEffect(() => {
    if (psCode && houseNumber) {
      fetchFullAddress();
    }
  }, [psCode, houseNumber]);
  const [hsValid, setHsValid] = useState(false);

  // Last useEffect that setsNewData
  useEffect(() => {
    if (isPostBusAddress) {
      const newUserData = oldData.data.relations
        .filter((relation: any) =>
          newData.some(
            (item: any) => item.relation_id === relation.external_number
          )
        )
        .map((relation: any) => ({
          relation_id: relation.external_number,
          postal_code: psCode,
          housenumber: houseNumber,
          city: city,
          isPostBus: true,
        }));

      setNewData(newUserData);
    } else {
      const newUserData = oldData.data.relations
        .filter((relation: any) =>
          newData.some(
            (item: any) => item.relation_id === relation.external_number
          )
        )
        .map((relation: any) => ({
          relation_id: relation.external_number,
          postal_code: psCode,
          housenumber: houseNumber,
          city: data.city,
          street: data.street,
          addition: addition,
        }));

      setNewData(newUserData);
    }
  }, [psCode, houseNumber, addition, currentStepperLocation, city, data]);

  const handleHouseNumber = (e: any) => {
    // Checks if e is a number, and if it is, set it as the house number otherwise sets invalidAddress to true
    if (isNaN(e)) {
      setHsValid(false);
      setHouseNumber(e);
    } else {
      setHsValid(true);
      setHouseNumber(e);
    }
  };

  useEffect(() => {
    if (data.extOptions) {
      const transformedArray = data.extOptions
        .slice(1)
        .map((val: string) => ({ label: val.trim(), value: val.trim() }));

      if (transformedArray.length > 0) {
        setValues(transformedArray);
      }
    }
  }, [data]);

  const handlSelectedAdditionoeging = (e: any) => {
    setAddition(e.target.value);
  };

  useEffect(() => {
    const validPostalCode = /^[1-9][0-9]{3}\s?[a-zA-Z]{2}$/;

    if (!isPostBusAddress) {
      setIsButtonDisabled(
        !(psCode && houseNumber && data.street && data.city && !invalidAddress)
      );
    } else {
      if (validPostalCode.test(psCode) && houseNumber && city && hsValid) {
        setIsButtonDisabled(false);
      } else {
        console.log(validPostalCode.test(psCode));
        setIsButtonDisabled(true);
      }
    }
  }, [psCode, houseNumber, data, addition, invalidAddress, hsValid, city]);

  const handleRadioChange = (e: any) => {
    setIsPostBusAddress(e.target.value === "Ja");
  };

  const sendData = async () => {
    dispatch(setDrawerState(false));
    for (let i = 0; i < newData.length; i++) {
      const data = {
        relation_id: newData[i].relation_id,
        postal_code: newData[i].postal_code,
        housenumber: parseInt(newData[i].housenumber),
      } as any;

      const service = new AerService(AerClient);
      const response = await service.postMutationAddress(data);
    }
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

  const currentScreen = () => {
    switch (currentStepperLocation) {
      case 0:
        return (
          <SelectRelations
            handlePersonSelect={handlePersonSelect}
            personDetails={personDetails}
            selectedPersons={selectedPersons}
            oldData={oldData}
            isButtonDisabled={disabled}
            handleNext={handleNext}
            handleBack={handleBack}
          />
        );
      case 1:
        return (
          <InputNewChanges
            setCity={setCity}
            city={city}
            hsValid={hsValid}
            isPostBusAddress={isPostBusAddress}
            handleRadioChange={handleRadioChange}
            psCode={psCode}
            setPsCode={setPsCode}
            handleHouseNumber={handleHouseNumber}
            data={data}
            values={values}
            handlSelectedadditionoeging={handlSelectedAdditionoeging}
            isButtonDisabled={isButtonDisabled}
            houseNumber={houseNumber}
            setAddition={setAddition}
            addition={addition}
            handleNext={handleNext}
            handleBack={handleBack}
          />
        );
      case 2:
        return (
          <CheckAndSubmit
            newData={newData}
            oldData={oldData}
            handleNext={handleNext}
            handleBack={handleBack}
          />
        );
      default:
        return (
          <SelectRelations
            handlePersonSelect={handlePersonSelect}
            personDetails={personDetails}
            selectedPersons={selectedPersons}
            oldData={oldData}
            isButtonDisabled={disabled}
            handleNext={handleNext}
            handleBack={handleBack}
          />
        );
    }
  };

  useEffect(() => {
    dispatch(setInFlow(true));
  }, []);

  return (
    <>
      <Stepper
        activeStep={currentStepperLocation}
        sx={{
          width: { xs: "106%", sm: "102%" },
          ml: "-0.5rem",
          overflowX: "clip",
        }}
      >
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
            error?: boolean;
            icon?: React.ReactNode;
          } = {};

          if (invalidAddress && index === 1) {
            labelProps.optional = (
              <Typography variant="caption" color="error">
                Invalid Address
              </Typography>
            );
            labelProps.icon = <ReportProblem sx={{ color: "red" }} />;
          }

          return (
            <Step key={label} {...stepProps}>
              <StepButton
                {...labelProps}
                onClick={() => {
                  setCurrentStepperLocation(index);
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

export default Address;
