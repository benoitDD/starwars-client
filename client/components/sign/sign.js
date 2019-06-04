import React, {Fragment} from 'react'
import {withContext}  from '../../context'
import PropTypes from 'prop-types'
import NavItem from '../utils/navItem'
import './sign.sass'
import {navigate} from '@reach/router'
import {TOKEN_AUTHENTICATION} from '../../utils'

function Sign({context}){
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
							Sign out
					</button>
					:
					<Fragment>
						<NavItem to = '/sign-in'>Sign in</NavItem>
						<NavItem to = '/sign-up'>Sign up</NavItem>
					</Fragment>
			}
		</div>
	)
}

Sign.propTypes = {
	context: PropTypes.object
}

export default withContext(Sign)