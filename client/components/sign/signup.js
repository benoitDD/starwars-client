import React, {Component} from 'react'
import {navigate} from '@reach/router'
import {SignUp as SignUpQuery} from '../../query/sign.gql'
import PropTypes from 'prop-types'
import './signup.sass'
import {Mutation} from 'react-apollo'
import HandleError from '../utils/handleError'
import Loading from '../utils/loading'
import {withTranslation} from 'react-i18next'

class SignUpForm extends Component {

	constructor(props){
		super(props)
		this.state = {
			login: '',
			password: ''
		}
	}

	onChangeValue(e){
		this.setState({[e.target.name]: e.target.value})
	}

	signUp(e){
		e.preventDefault()
		this.props.signUp({
			variables: {
				login: this.state.login,
				password: this.state.password
			}
		})
	}

	render(){
		return (
			<div id = 'signup'>
				<h1>{this.props.t('sign.up')}</h1>
				<form id = 'signup-form'>
					<div className = 'signup-input-item'>
						<label htmlFor = 'signup-login'>{this.props.t('login')}</label>
						<input id = 'signup-login' type = 'text' value = {this.state.login} 
							placeholder = {this.props.t('your.login')}
							name = 'login' onChange = {e => this.onChangeValue(e)} />
					</div>
					<div className = 'signup-input-item'>
						<label htmlFor = 'signup-password'>{this.props.t('password')}</label>
						<input id = 'signup-password' type = 'password' value = {this.state.password} 
							placeholder = {this.props.t('your.password')}
							name = 'password' onChange = {e => this.onChangeValue(e)} />
					</div>
					<div id = 'signup-button'>
						<button type = 'submit' onClick = {(e) => this.signUp(e)}>
							{this.props.t('sign.up')}
						</button>
					</div>
					{
						this.props.loading  && (
							<div id = 'signup-loading'>
								<Loading width = '50px' />
							</div>
						)
					}
					{
						this.props.response && !this.props.response.signUp.success && (
							<div className = 'signup-error'>
								{this.props.response.signUp.message}
							</div>
						)
					}
					{
						this.props.errorServer && (
							<div className =  'signup-error'>
								<HandleError error = {this.props.errorServer}/>
							</div>
						)
					}
				</form>
			</div>
		)
	}
}

SignUpForm.propTypes = {
	signUp: PropTypes.func.isRequired,
	response: PropTypes.object,
	errorServer: PropTypes.object,
	loading: PropTypes.bool,
	t: PropTypes.func.isRequired
}

const SignUpFormTranslate = withTranslation()(SignUpForm)

class SignUp extends Component {
	render(){
		return (
			<Mutation mutation = {SignUpQuery} onCompleted = {
				data => {
					if(data.signUp.success){
						navigate('/sign-in', {state: {message: 'sign.up.succes', i18n: true}})
					}
				}
			} >
				{(signUp, {data, error, loading}) => {
					return <SignUpFormTranslate signUp = {signUp} response = {data} 
						errorServer = {error} loading = {loading} />
				}}
			</Mutation>
		)
	}
}

export default SignUp