import React, {Component} from 'react'
import {Query} from 'react-apollo'
import {Person as PersonQuery} from '../../query/persons.gql'
import PropTypes from 'prop-types'
import Properties from '../utils/properties'
import {Homeworld, Specie, Starships, Vehicles} from '../utils/linkObjects'
import AddImageHeader from '../utils/addImageHeader'
import Images from '../utils/images'
import '../objects.sass'
import Loading from '../utils/loading'
import HandleError from '../utils/handleError'

function getProperties(person){
	return [
		{
			label: 'Birth year',
			value: person.birthYear
		},
		{
			label: 'Eye color',
			value: person.eyeColor
		},
		{
			label: 'Gender',
			value: person.gender
		},
		{
			label: 'Hair color',
			value: person.hairColor
		},
		{
			label: 'Height',
			value: person.height,
			unit: 'cm'
		},
		{
			label: 'Mass',
			value: person.mass,
			unit: 'kg'
		},
		{
			label: 'Skin color',
			value: person.skinColor
		}
	]
}

class Person extends Component {
	render(){
		return (
			<Query query = {PersonQuery} variables = {{id:this.props.id}} fetchPolicy = "network-only">
				{
					({data, loading, error}) => {
						if (loading) return <div className = 'object_loading'><Loading/></div>
						if (error) return <HandleError error = {error}/>
						const {person} = data
						const properties = getProperties(person)
						return (
							<section>
								<h1>{person.name}</h1>
								<article>
									<Images images = {person.more && person.more.imagesHeader} idOwn = {person.id} />
									<AddImageHeader id = {person.id} typeObject = 'Person' />
									<div className = 'object_descriptions'>
										<Properties properties = {properties}/>
										<Homeworld homeworld = {person.homeworld} />
										<Specie specie = {person.specie}/>
										<Starships starships = {person.starships ? person.starships.starships : undefined} />
										<Vehicles vehicles = {person.vehicles ? person.vehicles.vehicles : undefined} />
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

Person.propTypes = {
	id: PropTypes.string,
	path: PropTypes.string
}

export default Person