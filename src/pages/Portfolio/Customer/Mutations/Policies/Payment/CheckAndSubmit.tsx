import { Box, Typography } from "@mui/material";
import React from "react";
import NavigationButtons from "@/components/NavigationButtons";
import ShowChangesTable, { DataObject } from "@/components/ShowChangesTable";
import InfoHeader from "@/components/InfoHeader";
import GrowBox from "@/components/GrowBox";

export type CheckAndSubmitProps = {
  handleNext: () => void;
  handleBack: () => void;
  newData: any;
  loading: boolean;
  setLoading: (prev: boolean) => void;
};

const CheckAndSubmit: React.FC<CheckAndSubmitProps> = ({
  loading,
  setLoading,
  handleBack,
  handleNext,
  newData,
}) => {
  console.log(newData);

  const sideLabels = ["Betaalfrequentie", "Betaalwijze", "IBAN"];

  return (
    <>
      <Box>
        <Typography sx={{ pt: "12px", ml: "0px", pl: "8px" }}>
          Controleer de gegevens
        </Typography>
      </Box>
      <Box px={"0.5rem"} my={"1rem"}>
        {newData.map((data: any, index: number) => {
          const oldData: DataObject = {
            Betaalfrequentie: data.policy_details.premium_frequency,
            Betaalwijze: data.policy_details.payment_method,
            IBAN: data.policy_details.iban,
          };

          const mockNewData: any = {
            Betaalfrequentie: data.policy_details.MutationPreiumFrequence,
            Betaalwijze: data.policy_details.MutationPaymentMethod,
            IBAN: data.policy_details.MutationIban,
          };
          return (
            <Box
              id={"showChanges"}
              pt={index == 0 ? "1rem" : "3rem"}
              overflow={"hidden"}
            >
              <InfoHeader
                title={data.policy_details.external_number}
                subtitle={`${data.person_details.first_name} ${data.person_details.last_name}`}
                subtitle2={data.policy_details.product_name}
              />
              <Box my={"1rem"}>
                <ShowChangesTable
                  oldData={oldData}
                  newData={mockNewData}
                  sideLabels={sideLabels}
                />
              </Box>
            </Box>
          );
        })}
      </Box>
      <GrowBox />
      <NavigationButtons
        handleBack={handleBack}
        handleNext={handleNext}
        loading={loading}
        setLoading={setLoading}
        disabled={false}
        backText={"STAP TERUG"}
        nextText={"DOORVOEREN WIJZIGING"}
        isLast={true}
      />
    </>
  );
};

export default CheckAndSubmit;
