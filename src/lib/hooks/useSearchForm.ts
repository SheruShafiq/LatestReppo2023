import { useState } from "react";
import { format, parse } from "date-fns";
import { SearchResultType } from "../types/SearchResultType";
import { validPostalCode } from "../helper/Regex";
import { useAppDispatch } from "./useAppDispatch";
import { setSessionExpiresAt } from "../redux/slices/sessionSlice";

export const useSearchForm = () => {
  const [voornaam, setVoornaam] = useState<string>("");
  const [achternaam, setAchternaam] = useState<string>("");
  const [postcode, setPostcode] = useState<string>("");
  const [postcodeError, setPostcodeError] = useState<boolean>(false);
  const [huisnummer, setHuisnummer] = useState<string>("");
  const [stad, setStad] = useState<string>("");
  const [klantnummer, setKlantnummer] = useState<string>("");
  const [polisnummer, setPolisnummer] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<SearchResultType[]>([]);
  const [searchError, setSearchError] = useState<boolean>(false);

  const referenceDate = new Date(1970, 0, 1, 0, 0, 0);
  const dateFormat = "dd/MM/yyyy";
  const [geboortedatum, setGeboortedatum] = useState<string>("");
  const datefnsDate = parse(geboortedatum, dateFormat, referenceDate);

  function onChangeCallback(dateObject: any) {
    let formattedDateString = format(dateObject, dateFormat);
    setGeboortedatum(formattedDateString);
  }

  const isFormValid = () => {
    if (postcode) {
      if (!validPostalCode.test(postcode)) {
        setPostcodeError(true);
        return false;
      }
      setPostcodeError(false);
      return true;
    } else {
      return true;
    }
  };

  const fetchSearchResults = async () => {
    // const dispatch = useAppDispatch();
    setLoading(true);
    if (!isFormValid()) {
      setLoading(false);
      return;
    }

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (achternaam) {
      headers["last_name"] = achternaam;
    }
    if (postcode) {
      headers["postal_code"] = postcode;
    }
    if (huisnummer) {
      headers["house_number"] = huisnummer;
    }
    if (stad) {
      headers["city"] = stad;
    }
    if (klantnummer) {
      headers["customer_number"] = klantnummer;
    }
    if (polisnummer) {
      headers["policy_number"] = polisnummer;
    }
    if (geboortedatum) {
      headers["birth_date"] = geboortedatum;
    }

    const data = await fetch("/api/relations/search", {
      method: "GET",
      headers,
    });

    const result = await data.json();
    // dispatch(setSessionExpiresAt(result.headers.get("x-session-expires")));
    setSearchResults(result);
    setLoading(false);
  };

  return {
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
  };
};
