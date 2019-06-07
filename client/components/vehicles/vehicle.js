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
			label: 'model',
			value: vehicle.model
		},
		{
			label: 'vehicle.class',
			value: vehicle.vehicleClass
		},
		{
			label: 'manufacturers',
			value: vehicle.manufacturers
		},
		{
			label: 'cost.in.credits',
			value: vehicle.costInCredits,
			unit: 'credits'
		},
		{
			label: 'length',
			value: vehicle.length,
			unit: 'm'
		},
		{
			label: 'crew',
			value: vehicle.crew,
			helper: 'crew.helper'
		},
		{
			label: 'passengers',
			value: vehicle.passengers,
			helper: 'passengers.helper'
		},
		{
			label: 'max.atmosphering.speed',
			value: vehicle.maxAtmospheringSpeed,
			helper: 'max.atmosphering.speed.helper'
		},
		{
			label: 'cargo.capacity',
			value: vehicle.cargoCapacity,
			unit: 'kg'
		},
		{
			label: 'consumables',
			value: vehicle.consumables,
			helper: 'consumables.helper'
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