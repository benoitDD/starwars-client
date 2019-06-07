import React, {Component} from 'react'
import {Mutation} from 'react-apollo'
import {AddImageHeader as AddImageHeaderQuery} from '../../query/commun.gql'
import PropTypes from 'prop-types'
import mime from 'mime-types'
import './addImageHeader.sass'
import updateActive from '../../hoc/updateActive'
import componentPrivate from '../../hoc/componentPrivate'
import HandleError from './handleError'
import {compose} from '../../utils'
import {withTranslation} from 'react-i18next'

class AddImageForm extends Component {
	constructor(props){
		super(props)
		this.state = {
			title: '',
			description: '',
			filename: undefined,
			errorTitle: null,
			errorFile: null
		}
		this.file = React.createRef()
	}

	changeValueInput = e => {
		this.setState({[e.target.name]:e.target.value})
	}

	addImage = e => {
		e.preventDefault()
		if(!this.formValid()){
			return
		}
		this.props.addImage({
			title: this.state.title,
			description: this.state.description,
			file: this.file.current.files[0]
		})
	}

	formValid() {
		var error = {
			errorTitle: null,
			errorFile: null
		}
		const {title} = this.state
		if(!title || !title.trim().length){
			error.errorTitle = 'title.must.be.fill'
		}
		if(!this.file.current.files[0] 
			|| !['png', 'jpg', 'jpeg'].includes(mime.extension(this.file.current.files[0].type))){
			error.errorFile = 'image.must.be.valid'
		}
		this.setState(error)
		return Object.keys(error).reduce((valid, key) => valid && !error[key], true)
	}

	errorServerKey(key){
		const {response} = this.props
		if(!response || !response.details || !response.details.length){
			return false
		}
		const error = response.details.find(detail => (
			detail.key === key
		))
		return error && error.message
	}

	errorServer(){
		return this.props.response && this.props.response.message
	}

	successAddImage(){
		return this.props.response && this.props.response.success && this.props.t('image.added')
	}

	render(){
		return (
			<form className = 'add-image-form'>
				<div className = 'add-image-form-items'>
					<div className = 'add-image-form-item'>
						<div className = 'add-image-form-item-inputs'>
							<label htmlFor = 'title'>{this.props.t('title')}</label>
							<input id = 'title' type = 'text' name = 'title' value = {this.state.title} onChange = {this.changeValueInput}/>
						</div>
						<div className = 'add-image-form-error'>
							{(this.state.errorTitle && this.props.t(this.state.errorTitle)) 
								|| this.errorServerKey('title')}
						</div>
					</div>
					<div className = 'add-image-form-item'>
						<div className = 'add-image-form-item-inputs'>
							<label htmlFor = 'description'>{this.props.t('description')}</label>
							<input id = 'description' type = 'text' name = 'description' value = {this.state.description} onChange = {this.changeValueInput}/>
						</div>
						<div className = 'add-image-form-error'>
							{this.errorServerKey('description')}
						</div>
					</div>
					<div className = 'add-image-form-item'>
						<div className = 'add-image-form-item-inputs'>
							<label htmlFor = 'image'>{this.props.t('image')}</label>
							<input id = 'image' type = 'file' ref = {this.file} accept="image/png, image/jpeg, image/jpg" />
						</div>
						<div className = 'add-image-form-error'>
							{(this.state.errorFile && this.props.t(this.state.errorFile))
								|| this.errorServerKey('image')}
						</div>
					</div>
					<button type = 'submit' onClick = {this.addImage}>{this.props.t('add')}</button>
				</div>
				<div>
					{this.errorServer() || this.successAddImage()
					|| (this.props.error && <HandleError error = {this.props.error}/>)}
				</div>
			</form>
		)
	}
}

AddImageForm.propTypes = {
	addImage: PropTypes.func.isRequired,
	response: PropTypes.object,
	error: PropTypes.object,
	t: PropTypes.func.isRequired
}

const AddImageFormTranslate = withTranslation()(AddImageForm)

function AddImageHeader(props){
	return (
		<Mutation mutation = {AddImageHeaderQuery} >
			{(addImageHeader, {data, error}) => {
				const addImage = image => {
					addImageHeader({ variables: { 
						inputAddImage: {
							idExternal: props.id,
							type: props.typeObject,
							imageHeader: image
						}
					}})
				}
				return <AddImageFormTranslate addImage={addImage} response = {data && data.addImageHeader} error = {error} />
			}}
		</Mutation>
	)
}

AddImageHeader.propTypes = {
	id: PropTypes.string.isRequired,
	typeObject: PropTypes.string.isRequired
}

export default compose(updateActive, componentPrivate)(AddImageHeader)