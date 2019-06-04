import React from 'react'
import './nav.sass'
import NavItem from './utils/navItem'

function Nav(){
	return(
		<nav className = 'nav'>
			<NavItem to = '/starships/'>Starships</NavItem>
			<NavItem to = '/persons/'>Persons</NavItem>
			<NavItem to = '/planets/'>Planets</NavItem>
			<NavItem to = '/species/'>Species</NavItem>
			<NavItem to = '/vehicles/'>Vehicles</NavItem>
		</nav>
	)
}

export default Nav