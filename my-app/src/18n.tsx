import i18n from 'i18next'
import Backend from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

i18n.use(Backend).use(LanguageDetector).use(initReactI18next).init({
    fallbackLng: 'ru',
    debug: false,
    backend: {
        /* translation file path */
        loadPath: '/i-service/locales/{{lng}}/{{ns}}.json'
    },
    interpolation: {
        escapeValue: false, // not needed for react as it escapes by default
    }
})

export default i18n