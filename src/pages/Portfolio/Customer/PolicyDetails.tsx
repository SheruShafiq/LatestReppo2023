import Edit from "@mui/icons-material/Edit";
import { Button, Box, Stack } from "@mui/material";
import React from "react";
import InfoDisplay from "@/components/InfoDisplay";

function PolicyDetails(data: any, name: any) {
  if (!data) {
    return null; // or return a loading indicator
  }

  return (
    <Stack height={"100%"}>
      <Box display={"flex"} justifyContent={"space-between"}>
        <Box flex={1}>
          <InfoDisplay label={"Polisnummer"} value={data?.external_number} />
        </Box>
        <Box flex={1}>
          <InfoDisplay label={"Verzekeringnemer"} value={name} />
        </Box>
      </Box>
      <Box>
        <InfoDisplay label={"Verzekerde"} value={name} />
      </Box>
      <Box>
        <InfoDisplay label={"Product"} value={data?.product_name} />
      </Box>
      <Box display={"flex"} justifyContent={"space-between"}>
        <Box flex={1}>
          <InfoDisplay label={"Dekking"} value={`€${data?.coverage}`} />
        </Box>
        <Box flex={1}>
          <InfoDisplay
            label={"Indicatie"}
            value={data?.indexation ? "Ja" : "Nee"}
          />
        </Box>
      </Box>
      <Box display={"flex"} justifyContent={"space-between"}>
        <Box flex={1}>
          <InfoDisplay label={"Premie"} value={data?.premium} />
        </Box>
        <Box flex={1}>
          <InfoDisplay
            label={"Premiefrequentie"}
            value={data?.premium_frequency === "M" ? "Maand" : "Jaar"}
          />
        </Box>
      </Box>
      <Box>
        <InfoDisplay label={"Einddatum"} value={data?.premium_enddate} />
      </Box>
      <Box>
        <InfoDisplay
          label={"Distributie Kosten"}
          value={`€${data?.distribution_costs}`}
        />
      </Box>
      <Box display={"flex"} flexDirection={"column"} flexGrow={1} />
      <Button
        variant="outlined"
        startIcon={<Edit />}
        fullWidth
        sx={{
          marginBottom: "1.5rem",
          color: "#3C4653",
          borderColor: "#3C4653",
        }}
      >
        Wijzigingen doorvoeren
      </Button>
    </Stack>
  );
}

export default PolicyDetails;
