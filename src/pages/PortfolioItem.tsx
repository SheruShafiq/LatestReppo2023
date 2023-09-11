import {
  Typography,
  Divider,
  Box,
  Button,
  IconButton,
  Skeleton,
} from "@mui/material";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../lib/hooks/useAppSelector";
import {
  selectSessionCsrf,
  selectSessionExpiresAt,
  selectSessionPermissions,
  setSessionExpiresAt,
} from "../lib/redux/slices/sessionSlice";
import InfoDisplay from "../components/InfoDisplay";
import AddressMap from "../components/AddressMap";
import PortfolioTabs from "../components/PortfolioTabs";
import Edit from "@mui/icons-material/Edit";
import useResizeHandler from "../lib/hooks/useResizeHandler";
import Unauthorized from "./Unauthorized";
import { useAppDispatch } from "../lib/hooks/useAppDispatch";
import {
  selectPolicyDetailDrawerState,
  setPolicyDetailDrawerState,
} from "../lib/redux/slices/layoutSlice";
import DrawerComponent from "../components/DrawerComponent";
import MutationDrawerParent from "../components/MutationDrawerParent";
import apiService from "../lib/api/apiService";
import { userData } from "../lib/types/Data";

const PortfolioItem = () => {
  const permission = useAppSelector(selectSessionPermissions);

  if (!permission.includes("portfolio-management")) {
    return <Unauthorized />;
  }

  const { id } = useParams<{ id: string }>();
  const csrfToken = useAppSelector(selectSessionCsrf);
  const drawerState = useAppSelector(selectPolicyDetailDrawerState);
  const [data, setData] = React.useState<userData>(null);
  const [address, setAddress] = React.useState<string | null>(null);
  const size = useResizeHandler();
  const dispatch = useAppDispatch();

  // fetch data from API endpoint /api/relations/{id}

  const fetchData = async () => {
    const res = await fetch(`/api/relations/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": csrfToken,
      },
    });

    // const res = await apiService<{ expiryDate: string }>({
    //   url: `/api/relations/${id}`,
    //   method: "GET",
    // })

    const responseData: userData = await res.json();
    setData(responseData);

    dispatch(setSessionExpiresAt(res.headers.get("x-session-expires")));
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (data) {
      setAddress(
        `${data?.street} ${data?.housenumber}${data?.housenumber_addition},  ${data?.city}`
      );
    }
  }, [data]);

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
            onClick={() => dispatch(setPolicyDetailDrawerState(!drawerState))}
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
        open={drawerState}
        setOpen={() => dispatch(setPolicyDetailDrawerState(!drawerState))}
        title="Wijziging doorvoeren"
        children={<MutationDrawerParent data={data} />}
        width={17.125}
        zIndex={2}
      />
    </>
  );
};

export default PortfolioItem;
