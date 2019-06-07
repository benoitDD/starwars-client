import i18n from 'i18next'
import {initReactI18next} from 'react-i18next'
import XHR from 'i18next-xhr-backend'
import LanguageDetector from 'i18next-browser-languagedetector'

const options = {
	fallbackLng: 'en',//Use 'en' if language is not available
	ns: ['translations'],
	defaultNS: 'translations',
	keySeparator: false,
	backend: {
		loadPath: process.env.URI_I18N
	}
}

i18n
	.use(XHR)
	.use(initReactI18next)
	.use(LanguageDetector)
	.init(options)

export default i18n