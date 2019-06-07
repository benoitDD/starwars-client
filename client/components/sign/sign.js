import React, {Fragment} from 'react'
import {withContext}  from '../../context'
import PropTypes from 'prop-types'
import NavItem from '../utils/navItem'
import './sign.sass'
import {navigate} from '@reach/router'
import {TOKEN_AUTHENTICATION} from '../../utils'
import {withTranslation} from 'react-i18next'
import {compose} from '../../utils'

function Sign({context, t}){
	return (
		<div id = 'sign'>
			{
				context.user ?
					<button id = 'sign-signout'
						onClick = {() => {
							context.setUser(null)
							localStorage.removeItem(TOKEN_AUTHENTICATION)
							navigate('/')
						}}>
						{t('sign.out')}
					</button>
					:
					<Fragment>
						<NavItem to = '/sign-in'>{t('sign.in')}</NavItem>
						<NavItem to = '/sign-up'>{t('sign.up')}</NavItem>
					</Fragment>
			}
		</div>
	)
}

Sign.propTypes = {
	context: PropTypes.object,
	t: PropTypes.func.isRequired
}

export default compose(withContext, withTranslation())(Sign)