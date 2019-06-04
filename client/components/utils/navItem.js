import React from 'react'
import {Link} from '@reach/router'
import './navItem.sass'

export default function NavItem(props){
	return <Link {...props}  
		getProps={({ isCurrent }) => {
			return isCurrent ? {className:  'nav-item-active'} : {className:  'nav-item'}
		}}/>
}