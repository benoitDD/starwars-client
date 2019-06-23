import {Component} from 'react'
import {withContext} from '../context'
import {withApollo} from 'react-apollo'
import PropTypes from 'prop-types'
import {TOKEN_AUTHENTICATION, compose} from '../utils'
import {ReloadSignIn} from '../query/sign.gql'
import {navigate} from '@reach/router'

class TrySignIn extends Component {

	constructor(props){
		super(props)
		this.state = {
			queryDidit: false
		}
	}
    
	componentDidMount(){
		if(localStorage.getItem(TOKEN_AUTHENTICATION)){
			this.props.client.query({
				query: ReloadSignIn,
				fetchPolicy: 'network-only'
			}).then(response => {
				if(response.data.reloadSignIn.success){
					this.props.context.setUser(response.data.reloadSignIn.user)
				}
				this.setState({queryDidit: true})
			}).catch(error => {
				this.setState({queryDidit: true}, () =>{
					navigate('/error', {state: {error: JSON.parse(JSON.stringify(error))}})
				})
			})
		} else{
			this.setState({queryDidit: true})
		}
	}

	render(){
		return this.state.queryDidit && this.props.children
	}
}

TrySignIn.propTypes = {
	context: PropTypes.object.isRequired,
	client: PropTypes.object.isRequired,
	children: PropTypes.node.isRequired
}

export default compose(withContext, withApollo)(TrySignIn)