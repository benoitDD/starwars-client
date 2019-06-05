/* eslint-disable react/prop-types */
import React, {Component} from 'react'

const context = {
	modeUpdate: true,
	toogleModeUpdate: jest.fn(),
	user: {login: 'toto'},
	setUser: jest.fn()
}

export function withContext(ComponentToAddContext){
	return class ComponentWithContext extends Component {
		render(){
			return <ComponentToAddContext {...this.props} context = {context} />
		}
	}
}

class ProviderContextConsumer extends Component {
	render(){
		return this.props.children(context)
	}
}

export const ProviderContext = {
	Consumer: ProviderContextConsumer
}