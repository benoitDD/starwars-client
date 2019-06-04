import React from 'react'
import PropTypes from 'prop-types'
import {Link} from '@reach/router'
import './link.sass'

function LinkDefault(props){
	return <Link className = 'link' {...props} />
}

function LinkPlanet({id, ...rest}){
	return <LinkDefault to = {`/planet/${id}`} {...rest}/>
}
LinkPlanet.propTypes = {
	id: PropTypes.string.isRequired,
}

function LinkPerson({id, ...rest}){
	return <LinkDefault to = {`/person/${id}`} {...rest}/>
}
LinkPerson.propTypes = {
	id: PropTypes.string.isRequired,
}

function LinkSpecie({id, ...rest}){
	return <LinkDefault to = {`/specie/${id}`} {...rest}/>
}
LinkSpecie.propTypes = {
	id: PropTypes.string.isRequired,
}

function LinkStarship({id, ...rest}){
	return <LinkDefault to = {`/starship/${id}`} {...rest}/>
}
LinkStarship.propTypes = {
	id: PropTypes.string.isRequired,
}

function LinkVehicle({id, ...rest}){
	return <LinkDefault to = {`/vehicle/${id}`} {...rest}/>
}
LinkVehicle.propTypes = {
	id: PropTypes.string.isRequired,
}

export {LinkPlanet, LinkPerson, LinkSpecie, LinkStarship, LinkVehicle}