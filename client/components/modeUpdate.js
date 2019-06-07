import React from 'react'
import {withContext} from '../context'
import PropTypes from 'prop-types'
import './modeUpdate.sass'
import componentPrivate from '../hoc/componentPrivate'
import {compose} from '../utils'
import {withTranslation} from 'react-i18next'

function ModeUpdate({context: {toogleModeUpdate, modeUpdate}, t}){
	return (
		<button id = 'mode-update' onClick = {toogleModeUpdate}>
			{modeUpdate ? t('normal') : t('update')}
		</button>
	)
}

ModeUpdate.propTypes = {
	context: PropTypes.object.isRequired,
	t: PropTypes.func.isRequired
}

export default compose(withContext, componentPrivate, withTranslation())(ModeUpdate)