import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en.json';
import ptBR from './ptBR.json';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: en,
    },
    ptBR: {
      translation: ptBR,
    },
  },
  lng: 'ptBR',
  fallbackLng: 'ptBR',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
