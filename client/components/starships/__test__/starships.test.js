import React from 'react'
import renderer from 'react-test-renderer'
import {MockedProvider} from 'react-apollo/test-utils'
import wait from 'waait'
import {AllStarships} from '../../../query/starships.gql'
import Starships from '../starships'
import dataStarships from '../../test/starships.json'

const mocks = [
	{
		request: {
			query: AllStarships,
			variables: {
				pageSize: 10
			}
		},
		result: dataStarships
	}
]

test('Test starhips',async (done) => {
	const component = renderer.create(
		<MockedProvider mocks={mocks}>
			<Starships/>
		</MockedProvider>,
	)

	await wait(0)
    
	let tree = component.toJSON()
	expect(tree).toMatchSnapshot()
	done()
})

test('Test starhips loading',async (done) => {
	const component = renderer.create(
		<MockedProvider mocks={mocks}>
			<Starships/>
		</MockedProvider>,
	)
    
	let tree = component.toJSON()
	expect(tree).toMatchSnapshot()
	done()
})

test('Test starhips error',async (done) => {
	const mocksError = [
		{
			request: {
				query: AllStarships,
				variables: {
					pageSize: 10
				}
			},
			result: dataStarships,
			error: new Error('Une erreur :-)')
		}
	]

	const component = renderer.create(
		<MockedProvider mocks={mocksError}>
			<Starships/>
		</MockedProvider>,
	)

	await wait(0)
    
	let tree = component.toJSON()
	expect(tree).toMatchSnapshot()
	done()
})