import React, {Component} from 'react'
import {Query} from 'react-apollo'
import {Starship as StarshipQuery} from '../../query/starships.gql'
import PropTypes from 'prop-types'
import Properties from '../utils/properties'
import {Pilots} from '../utils/linkObjects'
import Images from '../utils/images'
import AddImageHeader from '../utils/addImageHeader'
import '../objects.sass'
import Loading from '../utils/loading'
import HandleError from '../utils/handleError'

function getProperties(starship){
	return [
		{
			label: 'model',
			value: starship.model
		},
		{
			label: 'starship.class',
			value: starship.starshipClass
		},
		{
			label: 'manufacturers',
			value: starship.manufacturers
		},
		{
			label: 'cost.in.credits',
			value: starship.costInCredits,
			unit: 'credits'
		},
		{
			label: 'length',
			value: starship.length,
			unit: 'm'
		},
		{
			label: 'crew',
			value: starship.crew,
			helper: 'crew.helper'
		},
		{
			label: 'passengers',
			value: starship.passengers,
			helper: 'passengers.helper'
		},
		{
			label: 'max.atmosphering.speed',
			value: starship.maxAtmospheringSpeed,
			helper: 'max.atmosphering.speed.helper'
		},
		{
			label: 'hyperdrive.rating',
			value: starship.hyperdriveRating,
			helper: 'hyperdrive.rating.helper'
		},
		{
			label: 'mglt',
			value: starship.MGLT,
			helper: 'mglt.helper'
		},
		{
			label: 'cargo.capacity',
			value: starship.cargoCapacity,
			unit: 'kg'
		},
		{
			label: 'consumables',
			value: starship.consumables,
			helper: 'consumables.helper'
		}
	]
}

class Starship extends Component {
	render(){
		return (
			<Query query = {StarshipQuery} variables = {{id:this.props.id}} fetchPolicy = "network-only">
				{
					({data, loading, error}) => {
						if (loading) return <div className = 'object_loading'><Loading/></div>
						if (error) return <HandleError error = {error}/>
						const {starship} = data
						const properties = getProperties(starship)
						return (
							<section>
								<h1>{starship.name}</h1>
								<article>
									<Images images = {starship.more && starship.more.imagesHeader} idOwn = {starship.id} />
									<AddImageHeader id = {starship.id} typeObject = 'Starship' />
									<div className = 'object_descriptions'>
										<Properties properties = {properties}/>
										<Pilots pilots = {starship.persons ? starship.persons.persons : undefined} />
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

Starship.propTypes = {
	id: PropTypes.string,
	path: PropTypes.string
}

export default Starship