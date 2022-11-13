import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import detector from "i18next-browser-languagedetector";
import locale_en from './locales/locale_en.json';
import locale_it from "./locales/locale_it.json";

const resources = {
  it: {
    translation: locale_it,
  },
  en: {
    translation: locale_en,
  },
};

i18n
  .use(detector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
