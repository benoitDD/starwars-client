import React, {Component} from 'react'
import {LinkSpecie} from '../utils/links'
import {AllSpecies} from '../../query/species.gql'
import Pagination from '../utils/pagination'

class Species extends Component {
	render(){
		return (
			<Pagination query = {AllSpecies} nameQuery = 'allSpecies' nameObjects = 'species'>
				{
					specie => {
						return (
							<LinkSpecie id = {specie.id}>
								{specie.name}
							</LinkSpecie>
						)
					}
				}
			</Pagination>
		)
	}
}

export default Species