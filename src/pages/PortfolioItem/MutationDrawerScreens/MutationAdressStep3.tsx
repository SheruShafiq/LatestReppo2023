import React, { useEffect } from "react";
import {
  Box,
  Button,
  Fade,
  Grid,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import { useAppSelector } from "../../../lib/hooks/useAppSelector";
import MutationDrawerFinished from "./MutationDrawerFinished";
import MuatationAdressStep2 from "./MutationAdressStep2";
import { CurrentScreenProps } from "../../../components/MutationDrawerParent";
import AerService, { IPostMutationAddress } from "../../../lib/api/AerService";
import AerClient from "../../../lib/api/AerClient";
import MutationDrawerStep0 from "./MutationDrawerStep0";
import { set } from "date-fns";
import { useAppDispatch } from "../../../lib/hooks/useAppDispatch";
import { setPolicyDetailDrawerState } from "../../../lib/redux/slices/layoutSlice";
import { LoadingButton } from "@mui/lab";
import PolicyIcon from "../../../assets/Policy.svg";
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
  const newAdress = props.newData[0];
  const oldAdress = props.oldData;
  const newData = props.newData;
  const setStepperActive = props.setStepperActive;
  const setCurrentStepperLocation = props.setCurrentStepperLocation;
  const { handleNext, handleBack } = props;
  const dispatch = useAppDispatch();
  const [loading, setLoading] = React.useState(false);
  const sendData = async () => {
    for (let i = 0; i < newData.length; i++) {
      const data = {
        relation_id: newData[i].relation_id,
        postal_code: newData[i].postal_code,
        housenumber: parseInt(newData[i].housenumber),
      } as IPostMutationAddress;
      const service = new AerService(AerClient);
      const response = await service.postMutationAddress(data);
    }
  };
  if (!setStepperActive || !setCurrentStepperLocation) {
    return <></>;
  }

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
      {oldAdress.data.relations
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
        .map(({ relation, matchingNewAddress }: any) => (
          <Stack key={relation.external_number} id={"InfoBox"}>
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
                    {relation.first_name} {relation.last_name}
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
                    {relation.external_number}
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
                  | {relation.birthdate}
                </Typography>
              </Box>
            </Stack>
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
                paddingRight={"5rem"}
              >
                <Typography
                  variant="body1"
                  color={"white"}
                  fontSize={16}
                  fontWeight={500}
                  paddingBottom={"1rem"}
                  lineHeight={"26px"}
                >
                  {"."}
                </Typography>
                <Label
                  sx={{
                    width: { xs: "120%", sm: "100%" },
                  }}
                  align="right"
                >
                  PostCode
                </Label>
                <Label
                  sx={{
                    width: { xs: "120%", sm: "100%" },
                  }}
                  align="right"
                >
                  Adress
                </Label>
                <Label
                  sx={{
                    width: { xs: "120%", sm: "100%" },
                  }}
                  align="right"
                >
                  Woonplaats
                </Label>
              </Grid>
              <Grid item xs={1}>
                <OldDataLabel sx={{ pt: { xs: "0rem", sm: "0rem" } }}>
                  Oude gegevens
                </OldDataLabel>
                <Label sx={{ pl: { xs: "1rem", sm: "0rem" } }}>
                  {oldAdress?.data.postal_code}
                </Label>
                <Label sx={{ pl: { xs: "1rem", sm: "0rem" } }}>
                  {oldAdress?.data.street} {oldAdress?.data.housenumber}
                  {oldAdress?.data.housenumber_addition}
                </Label>
                <Label sx={{ pl: { xs: "1rem", sm: "0rem" } }}>
                  {oldAdress?.data.city}
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
                  {newAdress?.postal_code}
                </NewDataLabel>
                <NewDataLabel
                  sx={{
                    pl: { xs: "1rem", sm: "0.5rem" },
                    width: { xs: "150%", sm: "100%" },
                    paddingRight: { xs: "120%", sm: "0%" },
                  }}
                >
                  {newAdress?.street} {newAdress?.housenumber}
                  {newAdress?.toev}
                </NewDataLabel>
                <NewDataLabel
                  sx={{
                    pl: { xs: "1rem", sm: "0.5rem" },
                    width: { xs: "150%", sm: "100%" },
                    paddingRight: { xs: "120%", sm: "0%" },
                  }}
                >
                  {newAdress?.city}
                </NewDataLabel>
              </Grid>
            </Grid>
          </Stack>
        ))}
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

          <LoadingButton
            variant="contained"
            sx={{ width: { xs: "22rem", sm: "14rem" } }}
            onClick={() => {
              setLoading(true);
              setTimeout(() => {
                handleBack(MutationDrawerStep0);
                setStepperActive(false);
                setCurrentStepperLocation(-1);
                dispatch(setPolicyDetailDrawerState(false));
                sendData();
              }, 2000); //
            }}
            loading={loading}
          >
            DOORVOEREN WIJZIGING
          </LoadingButton>
        </Box>
      </Fade>
    </Box>
  );
}
export default MutationAddressStep3;
