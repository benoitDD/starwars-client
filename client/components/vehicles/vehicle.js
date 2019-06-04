import React, {Component} from 'react'
import {Query} from 'react-apollo'
import {Vehicle as VehicleQuery} from '../../query/vehicles.gql'
import PropTypes from 'prop-types'
import Properties from '../utils/properties'
import {Pilots} from '../utils/linkObjects'
import Images from '../utils/images'
import AddImageHeader from '../utils/addImageHeader'
import '../objects.sass'
import Loading from '../utils/loading'
import HandleError from '../utils/handleError'

function getProperties(vehicle){
	return [
		{
			label: 'Model',
			value: vehicle.model
		},
		{
			label: 'Vehicle class',
			value: vehicle.vehicleClass
		},
		{
			label: 'Manufacturers',
			value: vehicle.manufacturers
		},
		{
			label: 'Cost in credits',
			value: vehicle.costInCredits,
			unit: 'credits'
		},
		{
			label: 'Length',
			value: vehicle.length,
			unit: 'm'
		},
		{
			label: 'Crew',
			value: vehicle.crew,
			helper: 'The number of personnel needed to run or pilot this starship'
		},
		{
			label: 'Passengers',
			value: vehicle.passengers,
			helper: 'The number of non-essentiel people this starship can transport'
		},
		{
			label: 'Max atmosphering speed',
			value: vehicle.maxAtmospheringSpeed,
			helper: 'The maximum speed of this starship in atmosphere'
		},
		{
			label: 'Cargo capacity',
			value: vehicle.cargoCapacity,
			unit: 'kg'
		},
		{
			label: 'Consumables',
			value: vehicle.consumables,
			helper: 'The maximum length of time that this starship can provide consumables for its entire crew without having to resupply'
		}
	]
}

class Vehicle extends Component {
	render(){
		return (
			<Query query = {VehicleQuery} variables = {{id:this.props.id}} fetchPolicy = "network-only">
				{
					({data, loading, error}) => {
						if (loading) return <div className = 'object_loading'><Loading/></div>
						if (error) return <HandleError error = {error}/>
						const {vehicle} = data
						const properties = getProperties(vehicle)
						return (
							<section>
								<h1>{vehicle.name}</h1>
								<article>
									<Images images = {vehicle.more && vehicle.more.imagesHeader} idOwn = {vehicle.id} />
									<AddImageHeader id = {vehicle.id} typeObject = 'Vehicle' />
									<div className = 'object_descriptions'>
										<Properties properties = {properties}/>
										<Pilots pilots = {vehicle.persons ? vehicle.persons.persons : undefined} />
									</div>
								</article>
							</section>
						)
					}
				}
			</Query>
		)
	}
}

Vehicle.propTypes = {
	id: PropTypes.string,
	path: PropTypes.string
}

export default Vehicle