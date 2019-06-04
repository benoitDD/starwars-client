import React, {Component} from 'react'
import {withApollo} from 'react-apollo'
import {withContext}  from '../../context'
import {navigate} from '@reach/router'
import {compose} from '../../utils'
import {SignIn as SignInQuery} from '../../query/sign.gql'
import PropTypes from 'prop-types'
import './signin.sass'
import HandleError from '../utils/handleError'
import Loading from '../utils/loading'
import {TOKEN_AUTHENTICATION} from '../../utils'

class SignIn extends Component {

	constructor(props){
		super(props)
		this.state = {
			login: '',
			password: '',
			error: null,
			errorServer: null,
			loading: false
		}
	}

	onChangeValue(e){
		this.setState({[e.target.name]: e.target.value})
	}

	signIn(e){
		e.preventDefault()
		this.setState({error: null, errorServer: null, loading: true}, () => {
			this.props.client.query({
				query: SignInQuery,
				variables: {
					login: this.state.login,
					password: this.state.password
				},
				fetchPolicy: 'network-only'
			})
				.then(response => {
					var state = {loading: false}
					if(response.data.signIn.success){
						localStorage.setItem(TOKEN_AUTHENTICATION, response.data.signIn.token)
						this.props.context.setUser(response.data.signIn.user)
						navigate('/')
					}else{
						state.error = response.data.signIn.message
					}
					this.setState(state)
				})
				.catch(errorServer => {
					this.setState({errorServer, loading: false})
				})
		})
	}

	render(){
		return (
			<div id = 'signin'>
				<h1>Connexion</h1>
				{
					this.props.location && this.props.location.state && this.props.location.state.message
						&& (
							<p id = 'signin-message-outside'>{
								this.props.location.state.message}
							</p>
						)
				}
				<form id = 'signin-form'>
					<div className = 'signin-input-item'>
						<label htmlFor = 'signin-login'>Login</label>
						<input id = 'signin-login' type = 'text' value = {this.state.login} 
							placeholder = 'Your login'
							name = 'login' onChange = {e => this.onChangeValue(e)} />
					</div>
					<div className = 'signin-input-item'>
						<label htmlFor = 'signin-password'>Password</label>
						<input id = 'signin-password' type = 'password' value = {this.state.password} 
							placeholder = 'Your password'
							name = 'password' onChange = {e => this.onChangeValue(e)} />
					</div>
					<div id = 'signin-button'>
						<button type = 'submit' onClick = {(e) => this.signIn(e)}>Se connecter</button>
					</div>
					{
						this.state.loading  && (
							<div id = 'signin-loading'>
								<Loading width = '50px' />
							</div>
						)
					}
					{
						this.state.error && (
							<div className =  'signin-error'>
								{this.state.error}
							</div>
						)
					}
					{
						this.state.errorServer && (
							<div className =  'signin-error'>
								<HandleError error = {this.state.errorServer}/>
							</div>
						)
					}
				</form>
			</div>
		)
	}
}

SignIn.propTypes = {
	client: PropTypes.object.isRequired,
	context: PropTypes.object.isRequired,
	location: PropTypes.object
}

export default compose(withContext, withApollo)(SignIn)