import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
    .use(initReactI18next)
    .init({
        lng: "it",
        fallbackLng: 'en',
        debug: true,
        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        },
        resources: {
            it: {
                translation: {
                    "Welcome": "Benvenuto",
                    "Please login": "Accedi per sbloccare tutti i contenuti dell'app.",
                    "Login with Google": "Accedi con Google",
                    "Login with Twitter": "Accedi con Twitter",
                }
            }
        }
    });

export default i18n;
