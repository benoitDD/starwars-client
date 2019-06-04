import fetch from 'node-fetch'
import fs from 'fs'
import * as log from 'loglevel'

fetch(process.env.URI_API, {
	method: 'POST',
	headers: {
		'Content-Type': 'application/json'
	},
	body: JSON.stringify({
		variables: {},
		query: `
      {
        __schema {
          types {
            kind
            name
            possibleTypes {
              name
            }
          }
        }
      }
    `,
	}),
})
	.then(result => result.json())
	.then(result => {
		// here we're filtering out any type information unrelated to unions or interfaces
		const filteredData = result.data.__schema.types.filter(
			type => type.possibleTypes !== null,
		)
		result.data.__schema.types = filteredData
		fs.writeFile('./client/fragmentTypes.json', JSON.stringify(result.data), err => {
			if (err) {
				log.error('Error writing fragmentTypes file', err)
			} else {
				log.log('Fragment types successfully extracted!')
			}
		})
	})