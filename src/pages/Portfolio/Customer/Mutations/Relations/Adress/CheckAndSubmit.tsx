import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import NavigationButtons from "@/components/NavigationButtons";
import ShowChangesTable, { DataObject } from "@/components/ShowChangesTable";
import InfoHeader from "@/components/InfoHeader";
import GrowBox from "@/components/GrowBox";
import { use } from "i18next";

export type CheckAndSubmitProps = {
  oldData: any;
  newData: any;
  handleBack: () => void;
  handleNext: () => void;
};

function CheckAndSubmit({
  oldData,
  newData,
  handleBack,
  handleNext,
}: CheckAndSubmitProps) {
  const [sideLabels, setSideLabels] = React.useState<string[]>([]);
  const [adress, setAdress] = React.useState<string>("");

  useEffect(() => {
    if (newData[0].isPostBus) {
      setSideLabels(["Postcode", "Postbus", "Plaatsnaam"]);
      setAdress(`${newData[0]?.housenumber}`);
    } else {
      setAdress(
        `${newData[0]?.street} ${newData[0]?.housenumber}${newData[0]?.addition}`
      );
      setSideLabels(["Postcode", "Adres", "Woonplaats"]);
    }
  }, []);
  const [loading, setLoading] = React.useState(false);
  console.log(newData[0]);
  return (
    <Box
      sx={{ width: "100%" }}
      height={"100%"}
      display={"flex"}
      flexDirection={"column"}
    >
      <Typography sx={{ color: "black", pt: "0.75rem", pl: "0.5rem" }}>
        Controleer de gegevens
      </Typography>

      {oldData.data.relations
        .filter((relation: any) =>
          newData.some(
            (newAddress: any) =>
              newAddress.relation_id === relation.external_number
          )
        )
        .map((relation: any) => {
          const matchingNewAddresses = newData.filter(
            (newAddress: any) =>
              newAddress.relation_id === relation.external_number
          );

          return matchingNewAddresses.map((matchingNewAddress: any) => ({
            relation,
            matchingNewAddress,
          }));
        })
        .flat()
        .map(({ relation }: any) => (
          <Box
            key={relation.external_number}
            pt={relation.external_number == 0 ? "1rem" : "3rem"}
            overflow={"hidden"}
          >
            <InfoHeader
              subtitle={relation.external_number}
              title={`${relation.first_name} ${relation.last_name}`}
              subtitle2={relation.birthdate}
            />
            <Box id={"adressChanges"} ml={"-63px"}>
              <ShowChangesTable
                newData={{
                  Postcode: newData[0]?.postal_code,
                  Adres: adress,
                  Woonplaats: newData[0].city,
                }}
                oldData={{
                  Postcode: oldData?.data.postal_code,
                  Adres: `${oldData.data?.street} ${oldData.data?.housenumber}${oldData.data.housenumber_addition}`,
                  Woonplaats: oldData?.data?.city,
                }}
                sideLabels={sideLabels}
              />
            </Box>
          </Box>
        ))}
      <GrowBox />
      <NavigationButtons
        handleNext={handleNext}
        handleBack={handleBack}
        disabled={true}
        backText="STAP TERUG"
        nextText="DOORVOEREN WIJZIGING"
        isLast={true}
        loading={loading}
        setLoading={setLoading}
      />
    </Box>
  );
}
export default CheckAndSubmit;
