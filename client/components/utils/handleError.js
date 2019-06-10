import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {TOKEN_AUTHENTICATION} from '../../utils'
import {withContext} from '../../context'
import {navigate} from '@reach/router'

class HandleError extends Component {

	componentDidMount(){
		const code = this.getCodeError()
		if(code === 'TOKEN_EXPIRED'){
			localStorage.removeItem(TOKEN_AUTHENTICATION)
			this.props.context.setUser(null)
			navigate('/sign-in', {state: {message: 'session.expired.reconnect', i18n: true}})
		}
	}

	getCodeError(){ 
		const graphqlError = this.getGraphqlError(this.getError())
		return graphqlError && graphqlError.extensions && graphqlError.extensions.code
		
	}

	getGraphqlError(error){
		if(!error){
			return
		}
		if(error.graphQLErrors && error.graphQLErrors.length){
			return error.graphQLErrors[0]
		}else if(error.networkError && error.networkError.result && 
            error.networkError.result.errors && error.networkError.result.errors.length){
			return error.networkError.result.errors[0]
		}
		return
	}

	messageCodeErreur(code, message){
		switch(code){
		case 'INTERNAL_SERVER_ERROR':
			return 'Une erreur interne du serveur s\'est produite, attendez un moment et recharger la page'
		case 'TOKEN_INVALID':
			return 'Le token d\'authentification est invalide'
		case 'TOKEN_EXPIRED':
			return 'Le token d\'authentification a expiré, il faut vous re-connecter'
		default:
			return `Le code erreur ${code} est inconnu avec son message: ${message}`
		}
	}

	handleCodeError(code, message){
		return (
			<div>
				{
					this.messageCodeErreur(code, message)
				}
			</div>
		)
	}

	handleGraphQLError(graphQLError){
		if(graphQLError.extensions && graphQLError.extensions.code){
			return this.handleCodeError(graphQLError.extensions.code, graphQLError.message)
		}
		return <div>Une erreur s&apos;est produite{graphQLError.message}</div>
	}

	getError(){
		var {error} = this.props
		if(!error){
			error = this.props.location && this.props.location.state && this.props.location.state.error
		}
		return error
	}

	render() {
		const error = this.getError()
		const graphqlError = this.getGraphqlError(error)
		if(graphqlError){
			return this.handleGraphQLError(graphqlError)
		}
		return <div>Une erreur inconnue s&apos;est produite {error && error.message && ': ' + error.message}</div>
	}
}

HandleError.propTypes = {
	error: PropTypes.object,
	location: PropTypes.object,
	context: PropTypes.object
}

export default withContext(HandleError)