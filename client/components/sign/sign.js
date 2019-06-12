import React, {Fragment} from 'react'
import {withContext}  from '../../context'
import PropTypes from 'prop-types'
import NavItem from '../utils/navItem'
import './sign.sass'
import {navigate} from '@reach/router'
import {TOKEN_AUTHENTICATION} from '../../utils'
import {withTranslation} from 'react-i18next'
import {compose} from '../../utils'
import {withApollo} from 'react-apollo'
import {SignOut} from '../../query/sign.gql'
import * as log from 'loglevel'

var logging = log.noConflict()

function Sign({context, t, client}){
	return (
		<div id = 'sign'>
			{
				context.user ?
					<button id = 'sign-signout'
						onClick = {() => {
							client.query({
								query: SignOut,
								fetchPolicy: 'network-only'
							})
								.then(response => {
									if(response.data.signOut.success){
										context.setUser(null)
										localStorage.removeItem(TOKEN_AUTHENTICATION)
										navigate('/')
									}else{
										logging.error('Error while signout !!')
									}
								})
								.catch(error => {
									navigate('/error', {state: {error: JSON.parse(JSON.stringify(error))}})
								})
						}}>
						{t('sign.out')}
					</button>
					:
					<Fragment>
						<NavItem id = 'nav-sign-in' to = '/sign-in'>{t('sign.in')}</NavItem>
						<NavItem id = 'nav-sign-up' to = '/sign-up'>{t('sign.up')}</NavItem>
					</Fragment>
			}
		</div>
	)
}

Sign.propTypes = {
	context: PropTypes.object,
	t: PropTypes.func.isRequired,
	client: PropTypes.object.isRequired,
}

export default compose(withContext, withTranslation(), withApollo)(Sign)