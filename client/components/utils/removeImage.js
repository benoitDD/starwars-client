import React from 'react'
import {Mutation} from 'react-apollo'
import PropTypes from 'prop-types'
import {RemoveImage as RemoveImageQuery} from '../../query/commun.gql'
import './removeImage.sass'
import updateActive from '../../hoc/updateActive'

function RemoveImage({idImage, idExternal}){
	return (
		<Mutation mutation = {RemoveImageQuery} >
			{(removeImage) => {
				return (
					<span className = 'remove-image' onClick = {() => {
						removeImage({ variables: { 
							inputRemoveImage: {
								idExternal,
								idImage
							}
						} })
					}}>&#10060;</span>
				)
			}}
		</Mutation>
	)
}

RemoveImage.propTypes = {
	idImage: PropTypes.string.isRequired,
	idExternal: PropTypes.string.isRequired
}

export default updateActive(RemoveImage)