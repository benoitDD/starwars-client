import React from 'react'
import PropTypes from 'prop-types'
import {LinkPlanet, LinkSpecie, LinkStarship, LinkVehicle, LinkPerson} from './links'
import './linkObjects.sass'

function LinkObjectItemImage({more}){
	if(!more || !more.imagesHeader || !more.imagesHeader.length){
		return <span  className = 'link-object-item-not-image'>Any images define</span>
	}
	const image = more.imagesHeader[0]
	return (
		<span>
			<img src = {`${process.env.URI_IMAGES}${image.filename}`} 
				alt = {image.title} title = {image.title}/>
		</span>
	)
}

LinkObjectItemImage.propTypes = {
	more: PropTypes.object,
}

function LinkObjectItem({object, Link}){
	return (
		<Link id = {object.id}>
			<span className = 'link-object-item'>
				<span>{object.name}</span>
				<LinkObjectItemImage more = {object.more} />
			</span>
		</Link>
	)
}

LinkObjectItem.propTypes = {
	object: PropTypes.object,
	Link: PropTypes.func
}

function LinkObject({title, object, Link}){
	const notDefine = <span className = 'link-object-not-define'>Not define</span>
	return (
		<div className = 'link-object'>
			<h2 className = 'link-object-title'>{title}</h2> {object ? 
				Array.isArray(object) ?
					object.length ?
						<ul className = 'link-object-list'>
							{
								object.map(item => (
									<li key = {item.id}>
										<LinkObjectItem object = {item} Link = {Link} />
									</li>
								))
							}
						</ul>
						:
						notDefine
					:
					<LinkObjectItem object = {object} Link = {Link} />
				: 
				notDefine}
		</div>
	)
}
LinkObject.propTypes = {
	title: PropTypes.string.isRequired,
	object: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
	Link: PropTypes.func
}

function Homeworld({homeworld}){
	return <LinkObject title = 'Homeworld' object = {homeworld} Link = {LinkPlanet} />
}
Homeworld.propTypes = {
	homeworld: PropTypes.object,
}

function Specie({specie}){
	return <LinkObject title = 'Specie' object = {specie} Link = {LinkSpecie} />
}
Specie.propTypes = {
	specie: PropTypes.object,
}

function Starships({starships}){
	return <LinkObject title = 'Starships' object = {starships} Link = {LinkStarship} />
}
Starships.propTypes = {
	starships: PropTypes.array,
}

function Vehicles({vehicles}){
	return <LinkObject title = 'Vehicles' object = {vehicles} Link = {LinkVehicle} />
}
Vehicles.propTypes = {
	vehicles: PropTypes.array,
}

function Persons({persons, title = 'Persons'}){
	return <LinkObject title = {title} object = {persons} Link = {LinkPerson} />
}
Persons.propTypes = {
	persons: PropTypes.array,
	title: PropTypes.string
}

function Pilots({pilots}){
	return <Persons title = 'Pilots' persons = {pilots}/>
}
Pilots.propTypes = {
	pilots: PropTypes.array,
}

function Residents({residents}){
	return <Persons title = 'Residents' persons = {residents}/>
}
Residents.propTypes = {
	residents: PropTypes.array,
}

export {Homeworld, Specie, Starships, Vehicles, Pilots, Residents, Persons}