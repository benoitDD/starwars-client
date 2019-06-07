import React from 'react'
import './nav.sass'
import NavItem from './utils/navItem'
import {withTranslation} from 'react-i18next'
import PropTypes from 'prop-types'

function Nav({t}){
	return(
		<nav className = 'nav'>
			<NavItem to = '/starships/'>{t('starships')}</NavItem>
			<NavItem to = '/persons/'>{t('persons')}</NavItem>
			<NavItem to = '/planets/'>{t('planets')}</NavItem>
			<NavItem to = '/species/'>{t('species')}</NavItem>
			<NavItem to = '/vehicles/'>{t('vehicles')}</NavItem>
		</nav>
	)
}

Nav.propTypes = {
	t: PropTypes.func.isRequired
}

export default withTranslation()(Nav)