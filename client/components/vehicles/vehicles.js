import React, {Component} from 'react'
import {LinkVehicle} from '../utils/links'
import {AllVehicles} from '../../query/vehicles.gql'
import Pagination from '../utils/pagination'

class Vehicles extends Component {
	render(){
		return (
			<Pagination query = {AllVehicles} nameQuery = 'allVehicles' nameObjects = 'vehicles'>
				{
					vehicle => {
						return (
							<LinkVehicle id = {vehicle.id}>
								{vehicle.name}
							</LinkVehicle>
						)
					}
				}
			</Pagination>
		)
	}
}

export default Vehicles