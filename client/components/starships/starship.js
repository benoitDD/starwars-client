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
			label: 'Model',
			value: starship.model
		},
		{
			label: 'Starship class',
			value: starship.starshipClass
		},
		{
			label: 'Manufacturers',
			value: starship.manufacturers
		},
		{
			label: 'Cost in credits',
			value: starship.costInCredits,
			unit: 'credits'
		},
		{
			label: 'Length',
			value: starship.length,
			unit: 'm'
		},
		{
			label: 'Crew',
			value: starship.crew,
			helper: 'The number of personnel needed to run or pilot this starship'
		},
		{
			label: 'Passengers',
			value: starship.passengers,
			helper: 'The number of non-essentiel people this starship can transport'
		},
		{
			label: 'Max atmosphering speed',
			value: starship.maxAtmospheringSpeed,
			helper: 'The maximum speed of this starship in atmosphere'
		},
		{
			label: 'Hyperdrive rating',
			value: starship.hyperdriveRating,
			helper: 'The class of this starships hyperdrive'
		},
		{
			label: 'MGLT',
			value: starship.MGLT,
			helper: 'The Maximum number of Megalights this starship can travel in a standard hour'
		},
		{
			label: 'cargo capacity',
			value: starship.cargoCapacity,
			unit: 'kg'
		},
		{
			label: 'Consumables',
			value: starship.consumables,
			helper: 'The maximum length of time that this starship can provide consumables for its entire crew without having to resupply'
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