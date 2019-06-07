import React, {Component} from 'react'
import {Query} from 'react-apollo'
import {Specie as SpecieQuery} from '../../query/species.gql'
import PropTypes from 'prop-types'
import Properties from '../utils/properties'
import {Persons, Homeworld} from '../utils/linkObjects'
import Images from '../utils/images'
import AddImageHeader from '../utils/addImageHeader'
import '../objects.sass'
import Loading from '../utils/loading'
import HandleError from '../utils/handleError'

function getProperties(specie){
	return [
		{
			label: 'classification',
			value: specie.classification
		},
		{
			label: 'designation',
			value: specie.designation
		},
		{
			label: 'average.height',
			value: specie.averageHeight,
			unit: 'cm'
		},
		{
			label: 'average.life.span',
			value: specie.averageLifespan,
			unit: 'y'
		},
		{
			label: 'eye.colors',
			value: specie.eyeColors
		},
		{
			label: 'hair.colors',
			value: specie.hairColors
		},
		{
			label: 'skin.colors',
			value: specie.skinColors
		},
		{
			label: 'language',
			value: specie.language
		}
	]
}

class Specie extends Component {
	render(){
		return (
			<Query query = {SpecieQuery} variables = {{id:this.props.id}} fetchPolicy = "network-only">
				{
					({data, loading, error}) => {
						if (loading) return <div className = 'object_loading'><Loading/></div>
						if (error) return <HandleError error = {error}/>
						const {specie} = data
						const properties = getProperties(specie)
						return (
							<section>
								<h1>{specie.name}</h1>
								<article>
									<Images images = {specie.more && specie.more.imagesHeader} idOwn = {specie.id} />
									<AddImageHeader id = {specie.id} typeObject = 'Specie' />
									<div className = 'object_descriptions'>
										<Properties properties = {properties}/>
										<Persons persons = {specie.persons ? specie.persons.persons : undefined} />
										<Homeworld homeworld = {specie.planet} />
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

Specie.propTypes = {
	id: PropTypes.string,
	path: PropTypes.string
}

export default Specie