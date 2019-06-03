import React from 'react'
import PropTypes from 'prop-types'

function getGraphqlError(error){
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

function messageCodeErreur(code, message){
	switch(code){
	case 'INTERNAL_SERVER_ERROR':
		return 'Une erreur interne du serveur s\'est produite, attendez un moment et recharger la page'
	case 'BAD_USER_INPUT':
		return message
	default:
		return `Le code erreur ${code} est inconnu`
	}
}

function handleCodeError(code, message){
	return (
		<div>
			{
				messageCodeErreur(code, message)
			}
		</div>
	)
}

function handleGraphQLError(graphQLError){
	if(graphQLError.extensions && graphQLError.extensions.code){
		return handleCodeError(graphQLError.extensions.code, graphQLError.message)
	}
	return <div>Une erreur s&apos;est produite{graphQLError.message}</div>
}

function HandleError({error}) {
	const graphqlError = getGraphqlError(error)
	if(graphqlError){
		return handleGraphQLError(graphqlError)
	}
	return <div>Une erreur inconnue s&apos;est produite {error && error.message && ': ' + error.message}</div>
}

HandleError.propTypes = {
	error: PropTypes.object
}

export default HandleError