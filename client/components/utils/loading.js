import React from 'react'
import './loading.sass'
import PropTypes from 'prop-types'
import displayAfter from '../../hoc/displayAfter'

function Loading(props) {
	const {width = '100px', speed = '1s', color = 'red'} = props
	const style = {
		borderColor: color,
		width: width,
		height: width,
		animationDuration: speed
    
	}
	return <span style = {style} className = 'spinner'></span>
}

Loading.propTypes = {
	width: PropTypes.string,
	speed: PropTypes.string,
	color: PropTypes.string
}

export default displayAfter()(Loading)