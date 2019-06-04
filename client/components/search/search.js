import React, {Component} from 'react'
import {withApollo} from 'react-apollo'
import {Search as SearchQuery} from '../../query/search.gql'
import PropTypes from 'prop-types'
import {LinkPerson, LinkPlanet, LinkSpecie, LinkStarship, LinkVehicle} from '../utils/links'
import './search.sass'
import Loading from '../utils/loading'
import HandleError from '../utils/handleError'

class Search extends Component{
	constructor(props){
		super(props)
		this.state = {
			text: '',
			loading: false,
			results: null,
			error: null
		}
	}
    
	seek = e => {
		e.preventDefault()
		this.setState({loading: true, error: null}, () => {
			this.props.client.query({
				query: SearchQuery,
				variables: {text: this.state.text},
				errorPolicy: 'none'
			})
				.then(response => {
					this.setState({results: response.data.search, loading: false})
				}).catch(error => {
					this.setState({error})
				})
		})
	}

	groupByResults(results){
		return results.reduce((acc, object) => {
			acc[object.__typename].push(object)
			return acc
		}, {
			Person: [],
			Planet: [],
			Specie: [],
			Starship: [],
			Vehicle: []
		})
	}

	displayResult(objects, title, Link){
		return (
			<div key = {title} className = 'search-results-per-type'>
				<h1 className = 'search-results-per-type-title'>{title}</h1>
				{
					objects && objects.length ? 
						(
							<ul className = 'search-results-per-type-results'>
								{
									objects.map(object => (
										<li key = {object.id}>
											<Link id = {object.id}>
												{object.name}
											</Link>
										</li>
									))
								}
							</ul>
						)
						:
						'Any matching'
				}
			</div>
		)
	}

	displayResults(){
		const {results} = this.state
		if(!results){
			return
		}else if(!results.length){
			return 'Any results'
		}
		const resultsGroupBy = this.groupByResults(results)
		return [].concat(
			this.displayResult(resultsGroupBy.Person, 'Persons', LinkPerson),
			this.displayResult(resultsGroupBy.Planet, 'Planets', LinkPlanet),
			this.displayResult(resultsGroupBy.Specie, 'Species', LinkSpecie),
			this.displayResult(resultsGroupBy.Starship, 'Starships', LinkStarship),
			this.displayResult(resultsGroupBy.Vehicle, 'Vehicles', LinkVehicle),
		)
	}
	
	render(){
		return (
			<section className = 'search'>
				<form className = 'search-form'>
					<input type = 'text' value = {this.text} onChange = {e => this.setState({text: e.target.value})} />
					<button type = 'submit' onClick = {this.seek}>Seek</button>
				</form>
				<div className = 'search-results'>
					{
						this.state.error ? 
							<HandleError error = {this.state.error}/>
							:
							this.state.loading ?
								<div className = 'search-results-loading'>
									<Loading width = '50px'/>
								</div>
								:
								this.displayResults()
					}
				</div>
			</section>
		)
	}
}

Search.propTypes = {
	client: PropTypes.object,
}

export default withApollo(Search)