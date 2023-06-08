import React from "react";
import { Box, Button, Fade, Grid, styled, Typography } from "@mui/material";
import { useAppSelector } from "../../../lib/hooks/useAppSelector";
import MutationDrawerFinished from "./MutationDrawerFinished";
import MuatationAdressStep2 from "./MutationAdressStep2";
import { CurrentScreenProps } from "../../../components/MutationDrawerParent";

const Header = styled(Typography)({
  color: "black",
  pt: "1rem",
  pl: "0.5rem",
});

const Label = styled(Typography)({
  color: "#1A202C",
  fontSize: 16,
  fontWeight: 400,
  lineHeight: "26px",
  paddingTop: "0.5rem",
  paddingBottom: "0.5rem",
});

const BoldLabel = styled(Label)({
  fontWeight: 500,
});

const OldDataLabel = styled(Label)({
  paddingBottom: "1rem",
  lineHeight: "26px",
  fontWeight: 500,
});

const NewDataLabel = styled(OldDataLabel)({
  paddingLeft: "1rem",
  backgroundColor: "#E4EAF2",
  paddingTop: "0.5rem",
  paddingBottom: "0.5rem",
  fontWeight: 400,
});
function MutationAddressStep3(props: CurrentScreenProps): JSX.Element {
  const newAdress = props.newData;
  const oldAdress = props.oldData;
  const { handleNext, handleBack } = props;
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
      <Grid
        container
        columns={3}
        sx={{
          pt: "2rem",
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
        }}
      >
        <Grid
          item
          xs={1}
          sx={{
            display: { xs: "none", sm: "block" },
          }}
        >
          <Typography
            variant="body1"
            color={"white"}
            fontSize={16}
            fontWeight={500}
            paddingBottom={"1rem"}
            lineHeight={"26px"}
          >
            XX
          </Typography>
          <Label
            sx={{
              width: { xs: "120%", sm: "100%" },
            }}
          >
            PostCode
          </Label>
          <Label
            sx={{
              width: { xs: "120%", sm: "100%" },
            }}
          >
            Adress
          </Label>
          <Label
            sx={{
              width: { xs: "120%", sm: "100%" },
            }}
          >
            Woonplaats
          </Label>
        </Grid>
        <Grid item xs={1}>
          <OldDataLabel sx={{ pt: { xs: "0rem", sm: "0rem" } }}>
            Oude gegevens
          </OldDataLabel>
          <Label sx={{ pl: { xs: "1rem", sm: "0rem" } }}>
            {oldAdress.data.postal_code}
          </Label>
          <Label sx={{ pl: { xs: "1rem", sm: "0rem" } }}>
            {oldAdress.data.street} {oldAdress.data.housenumber}
            {oldAdress.data.housenumber_addition}
          </Label>
          <Label sx={{ pl: { xs: "1rem", sm: "0rem" } }}>
            {oldAdress.data.city}
          </Label>
        </Grid>
        <Grid item xs={1}>
          <OldDataLabel sx={{ pt: { xs: "2.2rem", sm: "0rem" } }}>
            Nieuwe gegevens
          </OldDataLabel>
          <NewDataLabel
            sx={{
              pl: { xs: "1rem", sm: "0.5rem" },
              width: { xs: "150%", sm: "100%" },
              paddingRight: { xs: "120%", sm: "0%" },
            }}
          >
            {newAdress.postCode}
          </NewDataLabel>
          <NewDataLabel
            sx={{
              pl: { xs: "1rem", sm: "0.5rem" },
              width: { xs: "150%", sm: "100%" },
              paddingRight: { xs: "120%", sm: "0%" },
            }}
          >
            {newAdress.street} {newAdress.houseNumber}
            {newAdress.toevoeging}
          </NewDataLabel>
          <NewDataLabel
            sx={{
              pl: { xs: "1rem", sm: "0.5rem" },
              width: { xs: "150%", sm: "100%" },
              paddingRight: { xs: "120%", sm: "0%" },
            }}
          >
            {newAdress.city}
          </NewDataLabel>
        </Grid>
      </Grid>
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
            onClick={() => handleBack(MuatationAdressStep2)}
          >
            STAP TERUG
          </Button>

          <Button
            variant="contained"
            sx={{ width: { xs: "22rem", sm: "14rem" } }}
            onClick={() => handleNext(MutationDrawerFinished)}
          >
            DOORVOEREN WIJZIGING
          </Button>
        </Box>
      </Fade>
    </Box>
  );
}
export default MutationAddressStep3;
