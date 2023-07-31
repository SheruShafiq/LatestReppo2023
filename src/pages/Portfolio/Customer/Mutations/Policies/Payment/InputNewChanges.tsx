import { Box, Typography, Stack } from "@mui/material";
import PolicyIcon from "@/assets/Policy.svg";
import NavigationButtons from "@/components/NavigationButtons";
import GrowBox from "@/components/GrowBox";
import RadioInput from "@/components/RadioInput";
import IbanInput from "@/components/IbanInput";
import InfoHeader from "@/components/InfoHeader";

export type InputNewChangesProps = {
  handleNext: () => void;
  handleBack: () => void;
  newData: any[];
  paymentFrequency: string[];
  handleFrequencyChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    index: any
  ) => void;
  paymentMethod: string[];
  handleMethodChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    index: any
  ) => void;
  handleIbanChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => void;
  handleIbanBlur: (index: number) => void;
  iban: string[];
  ibanValidation: (boolean | null)[];
  isButtonDisabled: boolean;
};

const InputNewChanges: React.FC<InputNewChangesProps> = ({
  handleNext,
  handleBack,
  newData,
  paymentFrequency,
  handleFrequencyChange,
  paymentMethod,
  handleMethodChange,
  handleIbanChange,
  iban,
  isButtonDisabled,
}) => {
  return (
    <>
      {newData.map((data: any, index: any) => (
        <div key={index}>
          <Box>
            <Typography sx={{ pt: "12px", ml: "0px", pl: "8px" }}>
              Kies de nieuwe betaalgegevens voor de geselecteerde polissen
            </Typography>
          </Box>
          <Stack px={"0.5rem"} mt={"2rem"}>
            <InfoHeader
              title={data.policy_details.external_number}
              subtitle={`${data.person_details.first_name} ${data.person_details.last_name}`}
              subtitle2={data.policy_details.product_name}
            />
            <Stack px={"0.5rem"}>
              <Box display={"flex"} flexDirection={"row"} py={"1rem"}>
                <RadioInput
                  title={"Betaalfrequentie"}
                  radioGroupValue={paymentFrequency[index] || ""}
                  handleChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    handleFrequencyChange(event, index)
                  }
                  options={["Maand", "Kwartaal", "Jaar"]}
                />
                <RadioInput
                  title={"Betaalwijze"}
                  radioGroupValue={paymentMethod[index] || ""}
                  handleChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    handleMethodChange(event, index)
                  }
                  options={["Acceptgiro", "Aut. incasso"]}
                />
              </Box>
              <IbanInput
                value={iban[index] || ""}
                change={(event: any) => {
                  handleIbanChange(event, index);
                }}
              />
            </Stack>
          </Stack>
        </div>
      ))}

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

export default InputNewChanges;
