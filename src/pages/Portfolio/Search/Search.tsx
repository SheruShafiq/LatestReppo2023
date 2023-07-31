import {
  Box,
  Button,
  Divider,
  LinearProgress,
  Typography,
} from "@mui/material";
import ButtonIcon from "@mui/icons-material/Search";
import DefaultPageLayout from "@/components/DefaultPageLayout";
import GenericDatePicker from "@/components/GenericDatePicker";
import GenericInputField from "@/components/GenericInputField";
import SearchResultsList from "@/components/SearchResultsList";
import { useSearchForm } from "@/lib/hooks/useSearchForm";
import DefaultSearchResult from "@/components/DefaultSearchResult";
import NoSearchResult from "@/components/NoSearchResult";
import useResizeHandler from "@/lib/hooks/useResizeHandler";
import { useAppSelector } from "@/lib/hooks/useAppSelector";
import { selectSessionPermissions } from "@/lib/redux/slices/sessionSlice";
import Unauthorized from "@/pages/Unauthorized";

const Search = () => {
  const size = useResizeHandler();
  const permission = useAppSelector(selectSessionPermissions);

  if (!permission.includes("portfolio-management")) {
    return <Unauthorized />;
  }

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
      <Typography variant="body2" color={"#6C737F"}>
        Portefeuille
      </Typography>
      <Typography
        variant="h1"
        color={"#1A202C"}
        fontWeight={600}
        fontSize={24}
        lineHeight={"32px"}
        marginBottom={"0.5rem"}
      >
        Zoeken klant
      </Typography>
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
