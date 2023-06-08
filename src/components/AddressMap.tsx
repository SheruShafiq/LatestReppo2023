import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LatLngExpression } from "leaflet";
import GenericFallback from "./GenericFallback";
import { Box, Skeleton } from "@mui/material";
import { useAppSelector } from "../lib/hooks/useAppSelector";
import {
  selectSessionCsrf,
  setSessionExpiresAt,
} from "../lib/redux/slices/sessionSlice";
import { useAppDispatch } from "../lib/hooks/useAppDispatch";

export type AddressMapProps = {
  postalCode: string;
  houseNumber: string;
};

const AddressMap = ({ postalCode, houseNumber }: AddressMapProps) => {
  const [position, setPosition] = useState<LatLngExpression | undefined>(
    undefined
  );
  const [error, setError] = useState<string | undefined>(undefined);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchLatLng = async () => {
      try {
        //fetch data from API endpoint /api/address/geocode
        const response = await fetch(
          "/api/address/geocode?" +
            new URLSearchParams({
              postal_code: postalCode,
              housenumber: houseNumber,
            }),
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const results = await response.json();
        // TODO: Fix this cause it's causing errors in tests
        // dispatch(setSessionExpiresAt(response.headers.get("x-session-expires")));

        if (results.latitude && results.longitude) {
          setPosition([
            parseFloat(results.latitude),
            parseFloat(results.longitude),
          ]);
        } else {
          setError("Invalid Address.");
        }
      } catch (error) {
        setError("Failed to fetch location data.");
      }
    };
    if (postalCode && houseNumber) {
      fetchLatLng();
    }
  }, [postalCode, houseNumber]);

  if (error) {
    return <GenericFallback title={error} />;
  }

  if (!postalCode || !houseNumber) {
    return <></>;
  }

  if (!position) {
    return (
      <Skeleton
        variant="rounded"
        width={"100%"}
        height={"100%"}
        sx={{ my: -0.38 }}
        id="map-skeleton"
        data-testid="map-skeleton"
      />
    );
  }

  return (
    <MapContainer
      center={position}
      zoom={16}
      style={{ height: "100%", width: "100%" }}
      data-testid="map-container"
      id="map-container"
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Box id="map-marker">
        <Marker position={position} data-testid="map-marker" />
      </Box>
    </MapContainer>
  );
};

export default AddressMap;
