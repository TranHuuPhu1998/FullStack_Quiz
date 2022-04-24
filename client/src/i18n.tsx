import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';

import translationEN from 'locales/en/translation.json';
import translationJP from 'locales/ja/translation.json';

// the translations
// (tip move them in a JSON file and import them)
const resources = {
  en: {
    translation: translationEN
  },
  ja: {
    translation: translationJP
  },
};

i18n.use(LanguageDetector).use(initReactI18next).init({
  resources,
  lng:"ja",
  keySeparator:".",
  nonExplicitSupportedLngs:true,
  load:'languageOnly',
  interpolation: {
    escapeValue: false,
  }
})

export default i18n;
