import {
  Fade,
  Button,
  Box,
  Typography,
  Stack,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import MutationPaymentStep1 from "./MutationPaymentStep1";
import MutationPaymentStep3 from "./MutationPaymentStep3";
import { CurrentScreenProps } from "../../../components/MutationDrawerParent";
import { validateIBAN } from "../../../lib/helper/Regex";
import PolicyIcon from "../../../assets/Policy.svg";
const MutationPaymentStep2: React.FC<CurrentScreenProps> = ({
  handleNext,
  handleBack,
  setStepperActive,
  newData,
  setNewData,
}) => {
  const [paymentFrequency, setPaymentFrequency] = useState<string[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<string[]>([]);
  const [iban, setIban] = useState<string[]>([]);
  const [formCompleted, setFormCompleted] = useState<boolean>(false);

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
            MutationPayment_method: event.target.value,
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
    }
  };

  const handleIbanBlur = (
    event: React.FocusEvent<HTMLInputElement>,
    index: number
  ) => {
    const updatedValidation = [...ibanValidation];
    updatedValidation[index] = validateIBAN.test(iban[index]);
    setIbanValidation(updatedValidation);
  };
  useEffect(() => {
    const isFormCompleted =
      paymentFrequency.length === newData.length &&
      paymentMethod.length === newData.length &&
      iban.length === newData.length &&
      ibanValidation.every((validation) => validation === true);
    setFormCompleted(isFormCompleted);
  }, [paymentFrequency, paymentMethod, iban, ibanValidation, newData]);
  return (
    <>
      {newData.map((data: any, index: any) => (
        <div key={index}>
          <Box>
            <Typography sx={{ pt: "12px", ml: "0px", pl: "8px" }}>
              Kies de nieuwe betaalgegevens voor de geselecteerde polissen
            </Typography>
          </Box>
          <Stack px={"0.5rem"}>
            <Box sx={{ pt: "3rem" }} display={"flex"} flexDirection={"row"}>
              <img src={PolicyIcon} height={"40px"}></img>

              <Stack>
                <Typography
                  pl={"1rem"}
                  fontFamily={"Inter"}
                  fontStyle={"normal"}
                  fontWeight={"600"}
                  fontSize={"18px"}
                  lineHeight={"26px"}
                  color={"#1E293B"}
                >
                  {data.policy_details.external_number}
                </Typography>
                <Typography
                  px={"1rem"}
                  fontFamily={"Inter"}
                  fontStyle={"normal"}
                  fontWeight={"400"}
                  fontSize={"16px"}
                  lineHeight={"26px"}
                  color={"#1E293B"}
                >
                  {data.person_details.first_name}{" "}
                  {data.person_details.last_name}
                </Typography>
              </Stack>
              <Typography
                fontFamily={"Inter"}
                fontStyle={"normal"}
                fontWeight={"400"}
                fontSize={"18px"}
                lineHeight={"26px"}
                color={"#1E293B"}
                pl={"6px"}
              >
                | {data.policy_details.product_name}
              </Typography>
            </Box>
            <Stack px={"0.5rem"}>
              <Box display={"flex"} flexDirection={"row"} py={"1rem"}>
                <Stack id={"Betaalfrequentie"} paddingRight={"13rem"}>
                  <Typography
                    fontFamily={"Inter"}
                    fontStyle={"normal"}
                    fontWeight={"400"}
                    fontSize={"14px"}
                    lineHeight={"26px"}
                    color={"#6C737F"}
                  >
                    Betaalfrequentie
                  </Typography>

                  <FormControl>
                    <RadioGroup
                      aria-labelledby="demo-controlled-radio-buttons-group"
                      name="controlled-radio-buttons-group"
                      value={paymentFrequency[index] || ""}
                      onChange={(event) => handleFrequencyChange(event, index)}
                    >
                      <FormControlLabel
                        value="Maand"
                        control={<Radio />}
                        label="Maand"
                      />
                      <FormControlLabel
                        value="Kwartaal"
                        control={<Radio />}
                        label="Kwartaal"
                      />
                      <FormControlLabel
                        value="Jaar"
                        control={<Radio />}
                        label="Jaar"
                      />
                    </RadioGroup>
                  </FormControl>
                </Stack>
                <Stack>
                  <Typography
                    fontFamily={"Inter"}
                    fontStyle={"normal"}
                    fontWeight={"400"}
                    fontSize={"14px"}
                    lineHeight={"26px"}
                    color={"#6C737F"}
                  >
                    Betaalwijze
                  </Typography>

                  <FormControl>
                    <RadioGroup
                      aria-labelledby="demo-controlled-radio-buttons-group"
                      name="controlled-radio-buttons-group"
                      value={paymentMethod[index] || ""}
                      onChange={(event) => handleMethodChange(event, index)}
                    >
                      <FormControlLabel
                        value="Acceptgiro"
                        control={<Radio />}
                        label="Acceptgiro"
                      />
                      <FormControlLabel
                        value="Aut. incasso"
                        control={<Radio />}
                        label="Aut. incasso"
                      />
                    </RadioGroup>
                  </FormControl>
                </Stack>
              </Box>
              <TextField
                id="iban"
                label="IBAN"
                variant="outlined"
                value={iban[index] || ""}
                onChange={(event: any) => {
                  handleIbanChange(event, index);
                }}
                onBlur={(event: any) => {
                  handleIbanBlur(event, index);
                }}
                sx={{ height: "2.5rem" }}
                size="small"
                error={ibanValidation[index] === false}
              />
            </Stack>
          </Stack>
        </div>
      ))}

      {/* Buttons */}
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
              handleBack(MutationPaymentStep1);
            }}
          >
            STAP TERUG
          </Button>
          <Button
            variant="contained"
            sx={{ width: { xs: "22rem", sm: "8.5rem" } }}
            onClick={() => {
              handleNext(MutationPaymentStep3);
            }}
            disabled={!formCompleted}
          >
            VOLGENDE
          </Button>
        </Box>
      </Fade>
    </>
  );
};

export default MutationPaymentStep2;
