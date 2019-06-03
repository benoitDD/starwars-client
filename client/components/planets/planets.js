import React, {Component} from 'react'
import {LinkPlanet} from '../utils/links'
import {AllPlanets} from '../../query/planets.gql'
import Pagination from '../utils/pagination'

class Planets extends Component {
	render(){
		return (
			<Pagination query = {AllPlanets} nameQuery = 'allPlanets' nameObjects = 'planets'>
				{
					planet => {
						return (
							<LinkPlanet id = {planet.id}>
								{planet.name}
							</LinkPlanet>
						)
					}
				}
			</Pagination>
		)
	}
}

export default Planets