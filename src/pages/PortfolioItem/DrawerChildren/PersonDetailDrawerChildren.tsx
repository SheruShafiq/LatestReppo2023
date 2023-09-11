import Edit from "@mui/icons-material/Edit";
import { Button, Box, Stack } from "@mui/material";
import React from "react";
import InfoDisplay from "../../../components/InfoDisplay";
import {
  selectPolicyDetailDrawerState,
  setDrawerState,
  setPolicyDetailDrawerState,
} from "../../../lib/redux/slices/layoutSlice";
import DrawerComponent from "../../../components/DrawerComponent";
import { useAppDispatch } from "../../../lib/hooks/useAppDispatch";
import { useAppSelector } from "../../../lib/hooks/useAppSelector";

export type PersonDetailDrawerChildrenProps = {
  data: any;
  setOpen: any;
  setExtraWidth: any;
  setCurrentTitle: any;
  setCurrentChildren: any;
};

function PersonDetailDrawerChildren({
  data,
  setOpen,
  setExtraWidth,
  setCurrentTitle,
  setCurrentChildren,
}: PersonDetailDrawerChildrenProps) {
  // ... rest of your code

  const dispatch = useAppDispatch();
  const drawerState = useAppSelector(selectPolicyDetailDrawerState);

  if (!data) {
    return null; // or return a loading indicator
  }

  return (
    <>
      <Box display={"flex"} justifyContent={"space-between"}>
        <Box flex={1}>
          <InfoDisplay
            label={"Relatienummer"}
            value={data?.relations[0].external_number}
          />
        </Box>
        <Box flex={1}>
          <InfoDisplay label={"Volledige naam"} value={data?.name} />
        </Box>
      </Box>
      <Box display={"flex"} justifyContent={"space-between"}>
        <Box flex={1}>
          <InfoDisplay
            label={"Voornaam"}
            value={data?.relations[0].first_name}
          />
        </Box>
        <Box flex={1}>
          <InfoDisplay
            label={"Achternaam"}
            value={data?.relations[0].last_name}
          />
        </Box>
      </Box>
      <Box display={"flex"} justifyContent={"space-between"}>
        <Box flex={1}>
          <InfoDisplay
            label={"Geboortedatum"}
            value={data?.relations[0].birthdate}
          />
        </Box>
      </Box>
      <Box display={"flex"} justifyContent={"space-between"}>
        <Box flex={1}>
          <InfoDisplay
            label={"Voorletter(s)"}
            value={data?.relations[0].initials}
          />
        </Box>
        <Box flex={1}>
          <InfoDisplay label={"Geslacht"} value={data?.relations[0].gender} />
        </Box>
      </Box>
      <Box display={"flex"} justifyContent={"space-between"}>
        <Box flex={1}>
          <InfoDisplay
            label={"Adres"}
            value={`${data?.street} ${data?.housenumber}${data?.housenumber_addition}`}
          />
        </Box>
        <Box flex={1}>
          <InfoDisplay label={"Postcode"} value={"1241BW (?)"} />
        </Box>
      </Box>
      <Box display={"flex"} justifyContent={"space-between"}>
        <Box flex={1}>
          <InfoDisplay label={"Plaats"} value={data?.city} />
        </Box>
        <Box flex={1}>
          <InfoDisplay label={"Telefoonnummer"} value={data?.phone_number} />
        </Box>
      </Box>
      <Box display={"flex"} justifyContent={"space-between"}>
        <Box flex={1}>
          <InfoDisplay label={"E-mail"} value={data?.email} />
        </Box>
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
        onClick={() => {
          setExtraWidth(17.125);
          setCurrentTitle("Wijziging doorvoeren");
          setCurrentChildren("mutation");
        }}
      >
        Wijzigingen doorvoeren
      </Button>
    </>
  );
}

export default PersonDetailDrawerChildren;
