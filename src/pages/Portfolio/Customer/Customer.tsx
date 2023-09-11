import { Box, Button, Divider, Skeleton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  selectDrawerState,
  selectInFlow,
  selectWarningActive,
  setDrawerState,
  setWarningActive,
} from "@/lib/redux/slices/mutationSlice";

import AddressMap from "@/components/AddressMap";
import AerClient from "@/lib/api/AerClient";
import AerService from "@/lib/api/AerService";
import DrawerComponent from "@/components/DrawerComponent";
import Edit from "@mui/icons-material/Edit";
import InfoDisplay from "@/components/InfoDisplay";
import Mutations from "./Mutations/Mutations";
import PortfolioTabs from "@/pages/Portfolio/Customer/PortfolioTabs";
import Unauthorized from "../../Unauthorized";
import { selectSessionPermissions } from "@/lib/redux/slices/sessionSlice";
import { setRecentlyViewed } from "@/lib/redux/slices/layoutSlice";
import { useAppDispatch } from "@/lib/hooks/useAppDispatch";
import { useAppSelector } from "@/lib/hooks/useAppSelector";
import { useParams } from "react-router-dom";
import useResizeHandler from "@/lib/hooks/useResizeHandler";
import { userData } from "@/lib/types/Data";

const Customer = () => {
  const isWarningActive = useAppSelector(selectWarningActive);
  const permission = useAppSelector(selectSessionPermissions);

  const inFLow = useAppSelector(selectInFlow);
  if (!permission.includes("portfolio")) {
    return <Unauthorized />;
  }
  const [data, setData] = React.useState<userData>(null);
  const [address, setAddress] = React.useState<string | null>(null);
  const size = useResizeHandler();
  const dispatch = useAppDispatch();
  // fetch data from API endpoint /api/relations/{id}
  useEffect(() => {
    const service = new AerService(AerClient);
    const fetchData = async () => {
      const response = await service.getRelationsId(id);
      setData(response);
    };

    fetchData();
  }, []);
  const { id } = useParams<{ id: string }>();
  const [currentPageData, setCurrentPageData] = useState();
  useEffect(() => {
    if (data)
      setCurrentPageData({
        heading: data?.name,
        subHeading: [`Relatienummer: ${data?.relations?.[0].external_number}`],
        url: `/portfolio/${id}`,
      });
  }, [data, id]);

  useEffect(() => {
    if (currentPageData) {
      dispatch(setRecentlyViewed(currentPageData));
    }
  }, [currentPageData]);

  useEffect(() => {
    if (data) {
      setAddress(
        `${data?.street} ${data?.housenumber}${data?.housenumber_addition},  ${data?.city}`
      );
    }
  }, [data]);

  const drawerState = useAppSelector(selectDrawerState);
  function setWarningActiveFunc(state: boolean) {
    dispatch(setWarningActive(state));
  }

  return (
    <>
      <Box display="flex" alignItems="center">
        <Box>
          <Typography variant="body2" color="#6C737F">
            Portefeuille - klantbeeld
          </Typography>
          {data?.name ? (
            <Typography
              variant="h1"
              color="#1A202C"
              fontWeight={600}
              fontSize={24}
              lineHeight="32px"
              marginBottom="0.5rem"
            >
              {data?.name}
            </Typography>
          ) : (
            <Skeleton
              variant="text"
              animation={false}
              height="45px"
              sx={{ my: -0.38 }}
            />
          )}
        </Box>
        <Box flexGrow={1} />
        <Box>
          <Button
            variant="outlined"
            startIcon={<Edit />}
            sx={{
              width: { xs: "auto", sm: "280px" },
              color: "#3C4653",
              borderColor: "#3C4653",
            }}
            onClick={() => dispatch(setDrawerState(!drawerState))}
          >
            {size.width > 600 ? "Wijzigingen doorvoeren" : "Wijzigen"}
          </Button>
        </Box>
      </Box>
      <Divider sx={{ mb: "2rem" }} />
      <Box
        display="flex"
        width="100%"
        flexDirection={{ xs: "column", sm: "row" }}
      >
        <Box flex={1}>
          <InfoDisplay
            label="Telefoonnummer"
            value={data?.phone_number || ""}
          />
          <InfoDisplay
            label="Mobiel nummer"
            value={data?.mobile_number || ""}
          />
          <InfoDisplay label="Openstaand bedrag" value="€45,23 (?)" />
          <InfoDisplay
            label="Uitvaartwensen"
            value={data?.relations?.length ? "Ja" : "Nee"}
          />
        </Box>
        <Box flex={1}>
          <InfoDisplay label="Email" value={data?.email || ""} />
          <InfoDisplay
            label="IBAN"
            value={data?.relations?.[0]?.policies?.[0]?.iban || ""}
          />
          <InfoDisplay label="Adres" value={address || ""} />
          <InfoDisplay label="Toegang MijnOmgeving" value="Ja (?)" />
        </Box>
        {size.width > 899 && (
          <Box flex={1}>
            <AddressMap postalCode="2031WL" houseNumber="1" />
          </Box>
        )}
      </Box>
      <PortfolioTabs data={data} />
      <DrawerComponent
        width={17.125}
        open={drawerState}
        setOpen={() => dispatch(setDrawerState(!drawerState))}
        title="Wijziging doorvoeren"
        inFlow={inFLow}
        isWarningActive={isWarningActive}
        setWarningActive={setWarningActiveFunc}
        children={<Mutations data={data} />}
      />
    </>
  );
};

export default Customer;
