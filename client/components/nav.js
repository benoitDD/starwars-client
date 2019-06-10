import React, {Component} from 'react'
import './nav.sass'
import NavItem from './utils/navItem'
import {withTranslation} from 'react-i18next'
import PropTypes from 'prop-types'
import withSizes from 'react-sizes'
import {compose} from '../utils'
import Dropdown from './utils/dropdown'
import IconMenu from './utils/iconMenu'

class Nav extends Component {

	items(){
		return [
			<NavItem key = 'starships' to = '/starships/'>{this.props.t('starships')}</NavItem>,
			<NavItem key = 'persons' to = '/persons/'>{this.props.t('persons')}</NavItem>,
			<NavItem key = 'planets' to = '/planets/'>{this.props.t('planets')}</NavItem>,
			<NavItem key = 'species' to = '/species/'>{this.props.t('species')}</NavItem>,
			<NavItem key = 'vehicles' to = '/vehicles/'>{this.props.t('vehicles')}</NavItem>
		]
	}

	render(){
		return (
			<nav className = 'nav'>
				{
					this.props.isSmallScreen ?
						<Dropdown data = {this.items()} 
							renderData = {data => data}
							header = {<IconMenu/>}
							displayDataChoosed = {true}
						/>
						:
						<div className = 'normal'>
							{this.items()}
						</div>
				}
			</nav>
		) 
	}
}

Nav.propTypes = {
	t: PropTypes.func.isRequired,
	isSmallScreen: PropTypes.bool.isRequired
}

const mapSizesToProps = ({ width }) => ({
	isSmallScreen: width <= 700,
})

export default compose(withTranslation(), withSizes(mapSizesToProps))(Nav)