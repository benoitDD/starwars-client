import React, {Component} from 'react'
import {ProviderContext} from '../context'

function updateActive(ComponentUpdateActive){
	return class UpdateActive extends Component {
		render(){
			return (
				<ProviderContext.Consumer>
					{
						({modeUpdate}) => {
							return modeUpdate && <ComponentUpdateActive {...this.props}/>
						}
					}
				</ProviderContext.Consumer>
			)
		}
	}
}

export default updateActive