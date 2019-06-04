import React, {Component} from 'react'
import PropTypes from 'prop-types'

const ProviderContext = React.createContext()

class Context extends Component {
	constructor(props){
		super(props)
		this.state = {
			modeUpdate: true,
			toogleModeUpdate: this.toogleModeUpdate.bind(this),
			user: null,
			setUser: this.setUser.bind(this)
		}
	}

	setUser(user){
		this.setState({user: user})
	}

	toogleModeUpdate(){
		this.setState(({modeUpdate}) => ({modeUpdate: !modeUpdate}))
	}
  
	render(){
		return (
			<ProviderContext.Provider value = {this.state}>
				{this.props.children}
			</ProviderContext.Provider>
		)
	}
}

Context.propTypes = {
	children: PropTypes.node.isRequired
}

function withContext(ComponentToAddContext){
	return class ComponentWithContext extends Component {
		render(){
			return (
				<ProviderContext.Consumer>
					{
						context => {
							return <ComponentToAddContext {...this.props} context = {context} />
						}
					}
				</ProviderContext.Consumer>
			)
		}
	}
}

export {Context, ProviderContext, withContext}