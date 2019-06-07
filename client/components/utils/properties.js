import React from 'react'
import PropTypes from 'prop-types'
import './properties.sass'
import {withTranslation} from 'react-i18next'

function getValue(value, unknow){
	if(!value){
		return unknow
	}
	if(Array.isArray(value)){
		if(!value.length){
			return unknow
		}
		return (
			<ul className = 'propertie-value-array'>
				{
					value.map((v, index) => (
						<li key = {index} className = {`propertie-value-array-item ${index % 2 == 0 ? 'peer' : 'odd' }`}>
							{
								getValue(v, unknow)
							}
						</li>
					))
				}
			</ul>
		)
	}else{
		return value
	}
}

function getUnit(unit){
	return unit ? <div className = 'properties-unit'>{unit}</div> : ''
}

function Properties({properties, t}){
	return (
		<div className = 'properties'>
			<h2 className = 'properties-title'>Properties</h2>
			<ul className = 'properties-attributes'>
				{
					properties.map((property, index) => (
						<li key = {index} title = {t(property.helper)} 
							className = {`${index % 2 == 0 ? 'peer' : 'odd'}${property.helper ? ' helper' : ''}`}>
							<div className = 'propertie-label'>{t(property.label)}</div>
							<div className = 'propertie-value-unit'>
								<div className = 'propertie-value'>
									{getValue(property.value, 'not define')}
								</div>
								{getUnit(property.unit)}
							</div>
						</li>
					))
				}
			</ul>
		</div>
	)
}

Properties.propTypes = {
	properties: PropTypes.arrayOf(PropTypes.shape({
		label: PropTypes.string.isRequired,
		value: PropTypes.oneOfType([PropTypes.string, PropTypes.number,
			PropTypes.arrayOf(PropTypes.string),
			PropTypes.arrayOf(PropTypes.number)]),
		unit: PropTypes.string,
		helper: PropTypes.string
	})).isRequired,
	t: PropTypes.func.isRequired
}

export default withTranslation()(Properties)