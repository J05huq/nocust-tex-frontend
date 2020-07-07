import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'

import en from './en.json'
import zh from './zh.json'

export const initI18n = (language?: string) => {
  i18next
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
      fallbackLng: 'en',
      interpolation: { escapeValue: false }, // React already does escaping
      lng: language,
      resources: {
        en: { translation: en }, // 'common' is our custom namespace
        zh: { translation: zh },
      },
      react: { useSuspense: false },
    })
}
