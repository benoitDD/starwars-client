import React from 'react'
import {Link} from '@reach/router'
import './nav.sass'

function NavItem(props){
	return <Link {...props}  
		getProps={({ isCurrent }) => {
			return isCurrent ? {className:  'active'} : {}
		}}/>
}

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