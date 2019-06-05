import React, {Component} from 'react'
import {ProviderContext} from '../context'

function componentPrivate(ComponentWillBePrivate){
	return class ComponentPrivate extends Component {
		render(){
			return (
				<ProviderContext.Consumer>
					{
						({user}) => {
							if(!user){
								return ''
							}
							return <ComponentWillBePrivate {...this.props}/>
						}
					}
				</ProviderContext.Consumer>
			)
		}
	}
}

export default componentPrivate