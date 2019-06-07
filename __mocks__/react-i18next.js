// eslint-disable-next-line no-undef
const React = require('react')

const i18n = {
	language: 'fr',
	options: {
		fallbackLng: ['en']
	},
	changeLanguage: jest.fn()
}

const t = jest.fn(m => m)

// eslint-disable-next-line no-undef
exports.withTranslation = function(){
	return Comp => {
		return class ComponentWithTranslate extends React.Component {
			render(){
				return React.createElement(
					Comp,
					{...this.props, t, i18n}
				)
			}
		}
	}
}