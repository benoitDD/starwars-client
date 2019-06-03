import React, {Component} from 'react'
import {LinkStarship} from '../utils/links'
import {AllStarships} from '../../query/starships.gql'
import Pagination from '../utils/pagination'

class Starships extends Component {
	render(){
		return (
			<Pagination query = {AllStarships} nameQuery = 'allStarships' nameObjects = 'starships'>
				{
					starship => {
						return (
							<LinkStarship id = {starship.id}>
								{starship.name}
							</LinkStarship>
						)
					}
				}
			</Pagination>
		)
	}
}

export default Starships