import React from 'react'
import Nav from './nav'
import './header.sass'
import Sign from './sign/sign'

function Header(){
	return(
		<header className = 'header'>
			<span className = 'brand'>STARWARS UNIVERSE</span>
			<Nav/>
			<Sign/>
		</header>
	)
}

export default Header