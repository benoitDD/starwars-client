import React from 'react'
import Nav from './nav'
import './header.sass'
import Sign from './sign/sign'
import ChangeLanguage from './changeLanguage'

function Header(){
	return(
		<header className = 'header'>
			<span className = 'brand'><span>STARWARS UNIVERSE</span></span>
			<Nav/>
			<Sign/>	
			<ChangeLanguage/>
		</header>
	)
}

export default Header