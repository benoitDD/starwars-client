import React from 'react'
import renderer from 'react-test-renderer'
import {MockedProvider} from 'react-apollo/test-utils'
import wait from 'waait'
import {Starship} from '../../../query/starships.gql'
import StarshipComponent from '../starship'
import dataStarship from '../../test/starship.json'

jest.mock('../../../hoc/updateActive.js')
jest.mock('../../../hoc/componentPrivate.js')
jest.mock('../../../context.js')

const id = dataStarship.data.starship.id

const mocks = [
	{
		request: {
			query: Starship,
			variables: {
				id
			}
		},
		result: dataStarship
	}
]

test('Test Starship', async (done) => {
	const component = renderer.create(
		<MockedProvider mocks={mocks}>
			<StarshipComponent id = {id}/>
		</MockedProvider>,
	)

	await wait(0)
    
	let tree = component.toJSON()
	expect(tree).toMatchSnapshot()
	done()
})

test('Test Starship loading',async (done) => {
	const component = renderer.create(
		<MockedProvider mocks={mocks}>
			<StarshipComponent id = {id}/>
		</MockedProvider>,
	)
    
	let tree = component.toJSON()
	expect(tree).toMatchSnapshot()
	done()
})

test('Test Starship error', async (done) => {
	const mocks = [
		{
			request: {
				query: Starship,
				variables: {
					id
				}
			},
			result: dataStarship,
			error: new Error('Une erreur :-)')
		}
	]

	const component = renderer.create(
		<MockedProvider mocks={mocks}>
			<StarshipComponent id = {id}/>
		</MockedProvider>,
	)

	await wait(0)
    
	let tree = component.toJSON()
	expect(tree).toMatchSnapshot()
	done()
})