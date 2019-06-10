import React, {Component} from 'react'

export function compose(...functions){
	return (...args) => {
		const res = functions.reverse().reduce((acc, f) => (f(acc)), ...args)
		return res
	}
}

export const TOKEN_AUTHENTICATION = 'token'

export const ProviderPart1 = React.createContext()

export function withProviderPart1(ComponentToAddPart1){
	return class ComponentWithPart1 extends Component {
		render(){
			return (
				<ProviderPart1.Consumer>
					{
						context => {
							return <ComponentToAddPart1 {...this.props} {...context} />
						}
					}
				</ProviderPart1.Consumer>
			)
		}
	}
}