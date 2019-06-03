import React from 'react'
import {withContext} from '../context'
import PropTypes from 'prop-types'
import './modeUpdate.sass'

function ModeUpdate({context: {toogleModeUpdate, modeUpdate}}){
	return (
		<button id = 'mode-update' onClick = {toogleModeUpdate}>
			{modeUpdate ? 'Normal' : 'Update' }
		</button>
	)
}

ModeUpdate.propTypes = {
	context: PropTypes.object.isRequired
}

export default withContext(ModeUpdate)