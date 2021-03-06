import React, {Component} from 'react'
import {Query} from 'react-apollo'
import {Planet as PlanetQuery} from '../../query/planets.gql'
import PropTypes from 'prop-types'
import Properties from '../utils/properties'
import {Residents} from '../utils/linkObjects'
import Images from '../utils/images'
import AddImageHeader from '../utils/addImageHeader'
import '../objects.sass'
import Loading from '../utils/loading'
import HandleError from '../utils/handleError'

function getProperties(planet){
	return [
		{
			label: 'diameter',
			value: planet.diameter,
			unit: 'km'
		},
		{
			label: 'rotation.period',
			value: planet.rotationPeriod,
			unit: 'h'
		},
		{
			label: 'orbital.period',
			value: planet.orbitalPeriod,
			unit: 'd'
		},
		{
			label: 'gravity',
			value: planet.gravity
		},
		{
			label: 'population',
			value: planet.population,
			helper: 'average.population.helper'
		},
		{
			label: 'climates',
			value: planet.climates
		},
		{
			label: 'terrains',
			value: planet.terrains
		},
		{
			label: 'surface.water',
			value: planet.surfaceWater,
			unit: '%'
		}
	]
}

class Planet extends Component {
	render(){
		return (
			<Query query = {PlanetQuery} variables = {{id:this.props.id}} fetchPolicy = "network-only">
				{
					({data, loading, error}) => {
						if (loading) return <div className = 'object_loading'><Loading/></div>
						if (error) return <HandleError error = {error}/>
						const {planet} = data
						const properties = getProperties(planet)
						return (
							<section>
								<h1>{planet.name}</h1>
								<article>
									<Images images = {planet.more && planet.more.imagesHeader} idOwn = {planet.id} />
									<AddImageHeader id = {planet.id} typeObject = 'Planet' />
									<div className = 'object_descriptions'>
										<Properties properties = {properties}/>
										<Residents residents = {planet.persons ? planet.persons.persons : undefined} />
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

Planet.propTypes = {
	id: PropTypes.string,
	path: PropTypes.string
}

export default Planet