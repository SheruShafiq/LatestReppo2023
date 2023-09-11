import {
  Box,
  Button,
  Divider,
  LinearProgress,
  Typography,
} from "@mui/material";
import { PageData, setRecentlyViewed } from "@/lib/redux/slices/layoutSlice";
import { useEffect, useState } from "react";

import ButtonIcon from "@mui/icons-material/Search";
import DefaultPageLayout from "@/components/DefaultPageLayout";
import DefaultSearchResult from "@/components/DefaultSearchResult";
import GenericDatePicker from "@/components/GenericDatePicker";
import GenericInputField from "@/components/GenericInputField";
import NoSearchResult from "@/components/NoSearchResult";
import PageHeadingComponent from "@/components/PageHeadingComponent";
import SearchResultsList from "@/components/SearchResultsList";
import Unauthorized from "@/pages/Unauthorized";
import { id } from "date-fns/locale";
import { selectSessionPermissions } from "@/lib/redux/slices/sessionSlice";
import { useAppDispatch } from "@/lib/hooks/useAppDispatch";
import { useAppSelector } from "@/lib/hooks/useAppSelector";
import useResizeHandler from "@/lib/hooks/useResizeHandler";
import { useSearchForm } from "@/lib/hooks/useSearchForm";

const Search = () => {
  const size = useResizeHandler();
  const permission = useAppSelector(selectSessionPermissions);

  if (!permission.includes("portfolio")) {
    return <Unauthorized />;
  }
  const dispatch = useAppDispatch();
  const [currentPageData, setCurrentPageData] = useState<PageData>();
  useEffect(() => {
    setCurrentPageData({
      heading: "Zoeken klant",
      subHeading: [`Portefeuille`],
      url: `/portfolio`,
    });
  }, [id]);

  useEffect(() => {
    if (currentPageData) {
      dispatch(setRecentlyViewed(currentPageData));
    }
  }, [currentPageData]);

  const {
    voornaam,
    setVoornaam,
    achternaam,
    setAchternaam,
    postcode,
    setPostcode,
    postcodeError,
    huisnummer,
    setHuisnummer,
    stad,
    setStad,
    klantnummer,
    setKlantnummer,
    polisnummer,
    setPolisnummer,
    loading,
    searchResults,
    searchError,
    datefnsDate,
    onChangeCallback,
    fetchSearchResults,
  } = useSearchForm();

  return (
    <>
      <PageHeadingComponent subtitle={"Portefeuille"} title={"Zoeken klant"} />

      <Divider
        sx={{
          mb: "2rem",
        }}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          width: "100%",
        }}
      >
        {size.width <= 900 && size.width >= 600 ? (
          <Box display={"flex"}>
            <Box
              display={"flex"}
              flex={1}
              flexDirection={"column"}
              paddingRight={"1rem"}
            >
              <GenericInputField
                label="Achternaam"
                value={achternaam}
                onChange={(event) => setAchternaam(event.target.value)}
              />

              <GenericInputField
                label="Polisnummer"
                value={polisnummer}
                onChange={(event) => setPolisnummer(event.target.value)}
              />
              <GenericDatePicker
                value={datefnsDate}
                onChange={onChangeCallback}
                label="Geboortedatum"
              />
            </Box>
            <Box display={"flex"} flex={1} flexDirection={"column"}>
              <Box display={"flex"} flexDirection={"row"}>
                <GenericInputField
                  label="Postcode"
                  value={postcode}
                  error={postcodeError}
                  onChange={(event) => setPostcode(event.target.value)}
                  style={{ flex: 2 }}
                />
                <GenericInputField
                  label="Huisn."
                  value={huisnummer}
                  onChange={(event) => setHuisnummer(event.target.value)}
                  style={{ flex: 1 }}
                />
              </Box>
              <GenericInputField
                label="Klantnummer"
                value={klantnummer}
                onChange={(event) => setKlantnummer(event.target.value)}
              />
              <Box alignSelf={"flex-end"}>
                <Button
                  variant="contained"
                  color="primary"
                  // startIcon={<Search />}
                  onClick={fetchSearchResults}
                  sx={{
                    width: "9rem",
                    alignSelf: "flex-end",
                  }}
                >
                  Zoeken
                </Button>
                {loading && (
                  <LinearProgress
                    variant="query"
                    color="info"
                    sx={{
                      position: "relative",
                      width: "9rem",
                      py: "1.03rem",
                      top: "-2.3rem",
                      left: "0",
                      borderRadius: "0.3rem",
                      opacity: 0.5,
                    }}
                  />
                )}
              </Box>
            </Box>
          </Box>
        ) : (
          <Box
            display={"flex"}
            flexDirection={"column"}
            width={{ xs: "100%", md: "15.75rem" }}
            bgcolor={"#fff"}
            zIndex={"10"}
          >
            <GenericInputField
              label="Achternaam"
              value={achternaam}
              onChange={(event) => setAchternaam(event.target.value)}
            />
            <Box
              display={"flex"}
              flexDirection={{
                xs: "column",
                md: "row",
              }}
            >
              <GenericInputField
                label="Postcode"
                value={postcode}
                error={postcodeError}
                onChange={(event) => setPostcode(event.target.value)}
                style={{ flex: 2 }}
              />
              <GenericInputField
                label="Huisn."
                value={huisnummer}
                onChange={(event) => setHuisnummer(event.target.value)}
                style={{ flex: 1 }}
              />
            </Box>
            <GenericInputField
              label="Klantnummer"
              value={klantnummer}
              onChange={(event) => setKlantnummer(event.target.value)}
            />
            <GenericDatePicker
              value={datefnsDate}
              onChange={onChangeCallback}
              label="Geboortedatum"
            />
            <GenericInputField
              label="Polisnummer"
              value={polisnummer}
              onChange={(event) => setPolisnummer(event.target.value)}
            />

            <Box>
              <Button
                variant="contained"
                color="primary"
                startIcon={<ButtonIcon />}
                onClick={fetchSearchResults}
                sx={{
                  width: "9rem",
                  alignSelf: "flex-end",
                }}
              >
                Zoeken
              </Button>
              {loading && (
                <LinearProgress
                  variant="query"
                  color="info"
                  sx={{
                    position: "relative",
                    width: "9rem",
                    py: "1.03rem",
                    top: "-2.3rem",
                    left: "0",
                    borderRadius: "0.3rem",
                    opacity: 0.5,
                  }}
                />
              )}
            </Box>
          </Box>
        )}

        <Box
          display={"flex"}
          flexDirection={"column"}
          flexGrow={1}
          alignItems={"center"}
          paddingLeft={{ xs: "0", md: "2rem" }}
          paddingTop={{ xs: "2rem", md: "0" }}
        >
          {searchResults.length === 0 && !searchError && (
            <DefaultSearchResult />
          )}
          {searchResults.length === 0 && searchError && <NoSearchResult />}
          {searchResults.length > 0 && (
            <SearchResultsList data={searchResults} />
          )}
        </Box>
      </Box>
    </>
  );
};

export default Search;
