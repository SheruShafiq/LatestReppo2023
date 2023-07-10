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
  Grid,
  styled,
} from "@mui/material";
import React from "react";
import {
  CurrentScreenProps,
  newDataPayment,
} from "../../../components/MutationDrawerParent";
import MutationPaymentStep1 from "./MutationPaymentStep1";
import PolicyIcon from "../../../assets/Policy.svg";
import MutationDrawerFinished from "./MutationDrawerFinished";
import MutationPaymentStep2 from "./MutationPaymentStep2";
import MutationDrawerStep0 from "./MutationDrawerStep0";
import { setPolicyDetailDrawerState } from "../../../lib/redux/slices/layoutSlice";
import { useAppDispatch } from "../../../lib/hooks/useAppDispatch";
import LoadingButton from "@mui/lab/LoadingButton";

const MutationPaymentStep3: React.FC<CurrentScreenProps> = ({
  handleNext,
  handleBack,
  setStepperActive,
  oldData,
  newData,
  setCurrentStepperLocation,
}) => {
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

  const dispatch = useAppDispatch();
  const [loading, setLoading] = React.useState(false);
  if (!setStepperActive || !setCurrentStepperLocation) return null;
  return (
    <>
      <Box>
        <Typography sx={{ pt: "12px", ml: "0px", pl: "8px" }}>
          Controleer de gegevens
        </Typography>
      </Box>
      {newData.map((newPayment: newDataPayment, index: number) => (
        <React.Fragment key={index}>
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
                  {newPayment.policy_details.external_number}
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
                  {newPayment.person_details.first_name}{" "}
                  {newPayment.person_details.last_name}
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
                | {newPayment.policy_details.product_name}
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
                Betaalfrequentie
              </Label>
              <Label
                sx={{
                  width: { xs: "120%", sm: "100%" },
                }}
                align="right"
              >
                Betaalwijze
              </Label>
              <Label
                sx={{
                  width: { xs: "120%", sm: "100%" },
                }}
                align="right"
              >
                IBAN
              </Label>
            </Grid>
            <Grid item xs={1}>
              <OldDataLabel sx={{ pt: { xs: "0rem", sm: "0rem" } }}>
                Oude gegevens
              </OldDataLabel>
              <Label sx={{ pl: { xs: "1rem", sm: "0rem" } }}>
                {newPayment?.policy_details.premium_frequency}
              </Label>
              <Label sx={{ pl: { xs: "1rem", sm: "0rem" } }}>
                {newPayment?.policy_details.payment_method}
              </Label>
              <Label sx={{ pl: { xs: "1rem", sm: "0rem" } }}>
                {newPayment?.policy_details.iban}
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
                {newPayment?.policy_details.MutationPreiumFrequence}
              </NewDataLabel>
              <NewDataLabel
                sx={{
                  pl: { xs: "1rem", sm: "0.5rem" },
                  width: { xs: "150%", sm: "100%" },
                  paddingRight: { xs: "120%", sm: "0%" },
                }}
              >
                {newPayment?.policy_details.MutationPayment_method}
              </NewDataLabel>
              <NewDataLabel
                sx={{
                  pl: { xs: "1rem", sm: "0.5rem" },
                  width: { xs: "150%", sm: "100%" },
                  paddingRight: { xs: "120%", sm: "0%" },
                }}
              >
                {newPayment?.policy_details.MutationIban}
              </NewDataLabel>
            </Grid>
          </Grid>
        </React.Fragment>
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
            onClick={() => {
              handleBack(MutationPaymentStep2);
            }}
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
              }, 2000); //
            }}
            loading={loading}
          >
            DOORVOEREN WIJZIGING
          </LoadingButton>
        </Box>
      </Fade>
    </>
  );
};

export default MutationPaymentStep3;
