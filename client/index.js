import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'
import {ApolloClient} from 'apollo-client'
import {InMemoryCache, IntrospectionFragmentMatcher} from 'apollo-cache-inmemory'
import {ApolloProvider} from 'react-apollo'
import introspectionQueryResultData from './fragmentTypes.json'
import {createUploadLink} from 'apollo-upload-client'
import {Context} from './context'

const fragmentMatcher = new IntrospectionFragmentMatcher({
	introspectionQueryResultData
})
const cache = new InMemoryCache({fragmentMatcher})
const link = createUploadLink({uri: process.env.URI_API})
const client = new ApolloClient({
	cache,
	link
})

ReactDOM.render(
	<ApolloProvider client={client}>
		<Context>
			<App />
		</Context>
	</ApolloProvider>
	, document.getElementById('root'))
