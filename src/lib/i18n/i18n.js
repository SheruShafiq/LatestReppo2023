import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en";
import nl from "./locales/nl.js";
import de from "./locales/de";

i18n.use(initReactI18next).init({
  compatibilityJSON: "v4",
  lng: "de",
  fallbackLng: "en",
  resources: {
    en,
    nl,
    de,
  },
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
