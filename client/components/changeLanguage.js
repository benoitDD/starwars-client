import React, {Component} from 'react'
import {withTranslation} from 'react-i18next'
import es from '../images/es.png'
import en from '../images/en.png'
import fr from '../images/fr.png'
import './changeLanguage.sass'
import Dropdown from './utils/dropdown'
import PropTypes from 'prop-types'

const languages = [
	{
		code: 'es',
		image: es,
		label: 'spanish'
	},
	{
		code: 'en',
		image: en,
		label: 'english'
	},
	{
		code: 'fr',
		image: fr,
		label: 'french'
	}
]

class ChangeLanguage extends Component {

	languageCurrent(){
		return languages.find(lng => lng.code === this.props.i18n.language) ||
			languages.find(lng => lng.code === this.props.i18n.options.fallbackLng[0])
	}

	constructor(props){
		super(props)
		this.state = {
			language: this.languageCurrent()
		}
	}

	render(){
		return (
			<div className = 'changeLanguage'>
				<Dropdown data = {languages}
					choose = {this.state.language}
					renderData = {language => (
						<div className = 'changeLanguage_langage'
							onClick = {() => this.props.i18n.changeLanguage(language.code)}
						>
							<img src = {language.image} alt = {language.code}/>
							<span className = 'changeLanguage_label'>{this.props.t(language.label)}</span>
						</div>
					)}
                
					renderHeader = {language => (
						<div className = 'changeLanguage_langage'>
							<img src = {language.image} alt = {language.code}/>
							<span className = 'changeLanguage_label'>{this.props.t(language.label)}</span>
						</div>
					)}
					displayDataChoosed = {false}
				/>
			</div>
		)
	}
}

ChangeLanguage.propTypes = {
	i18n: PropTypes.object.isRequired,
	t: PropTypes.func.isRequired
}

export default withTranslation()(ChangeLanguage)