import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'
import {ApolloClient} from 'apollo-client'
import {InMemoryCache, IntrospectionFragmentMatcher} from 'apollo-cache-inmemory'
import {ApolloProvider} from 'react-apollo'
import introspectionQueryResultData from './fragmentTypes.json'
import {createUploadLink} from 'apollo-upload-client'
import {Context} from './context'
import {setContext} from 'apollo-link-context'
import TrySignIn from './components/trySignIn'

const setHeaderLink = setContext((_, {headers}) => {
	const tokenAuth = localStorage.getItem('token')
	headers = {...headers}
	if(tokenAuth){
		headers.authorization = 'Bearer ' + tokenAuth
	}
	return {headers}
})

const fragmentMatcher = new IntrospectionFragmentMatcher({
	introspectionQueryResultData
})
const cache = new InMemoryCache({fragmentMatcher})
const link = createUploadLink({uri: process.env.URI_API})
const client = new ApolloClient({
	cache,
	link: setHeaderLink.concat(link)
})

ReactDOM.render(
	<ApolloProvider client={client}>
		<Context>
			<TrySignIn>
				<App />
			</TrySignIn>
		</Context>
	</ApolloProvider>
	, document.getElementById('root'))
