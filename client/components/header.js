import React from 'react'
import Nav from './nav'
import './header.sass'

function Header(){
	return(
		<header className = 'header'>
			<span className = 'brand'>STARWARS UNIVERSE</span>
			<Nav/>
			<div>
				<span>sign in</span>
				<span>sign up</span>
			</div>
		</header>
	)
}

export default Header