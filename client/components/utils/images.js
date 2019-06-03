import React from 'react'
import PropTypes from 'prop-types'
import RemoveImage from './removeImage'
import './images.sass'

function Images({images, idOwn}){
	if(!images || !images.length){
		return ''
	}
	return (
		<div className = 'images'>
			{
				images.map((image, index) => (
					<div className = 'images-item' key = {index}>
						<RemoveImage idImage = {image._id} idExternal = {idOwn}/>
						<img className = 'images-item-image' src = {`${process.env.URI_IMAGES}${image.filename}`} 
							alt = {image.title} title = {image.title}/>
					</div>
				))
			}
		</div>
	)
}

Images.propTypes = {
	images: PropTypes.arrayOf(PropTypes.shape({
		filename: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired
	})),
	idOwn: PropTypes.string.isRequired
}

export default Images