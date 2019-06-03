import React, {Component} from 'react'
import {Query} from 'react-apollo'
import PropTypes from 'prop-types'
import './pagination.sass'

class Pagination extends Component {

	constructor(props){
		super(props)
	}

	getData(data){
		return data[this.props.nameQuery]
	}

	getPageInfo(data){
		return this.getData(data).pageInfo
	}

	previousButton(data, fetchMore){
		const pageInfo = this.getPageInfo(data)
		return (
			<button disabled = {!pageInfo.hasPreviousPage} onClick = {() => fetchMore({
				variables: {
					before: pageInfo.startCursor
				},
				updateQuery: (prev, {fetchMoreResult}) => {
					return fetchMoreResult
				}
			})}>
					Précedent
			</button>
		)
	}

	nextButton(data, fetchMore){
		const pageInfo = this.getPageInfo(data)
		return (
			<button disabled = {!pageInfo.hasNextPage} onClick = {() => fetchMore({
				variables: {
					after: pageInfo.endCursor
				},
				updateQuery: (prev, {fetchMoreResult}) => {
					return fetchMoreResult
				}
			})}>
					Suivant
			</button>
		)
	}

	render(){
		return (
			<Query query = {this.props.query} variables = {{pageSize: 10}}>
				{
					({data, loading, error, fetchMore}) => {
						if (loading) return <div>Loading</div>
						if (error) return <div>Error: {error.message}</div>
						const pagination = this.getData(data)
						const pageInfo = this.getPageInfo(data)
						return (
							<div className = 'pagination'>
								<div className = 'pagination-header'>
									<span>{pageInfo.totalCount} élément(s)</span>
									<span className = 'pagination-actions'>
										{this.previousButton(data, fetchMore)}
										{this.nextButton(data, fetchMore)}
									</span>
								</div>
								<ul className = 'pagination-list'>
									{
										pagination[this.props.nameObjects].map(object => (
											<li key = {object.id} className = 'pagination-list-item'>
												{
													this.props.children(object)
												}
											</li>
										))
									}
								</ul>
							</div>
						)
					}   
				}
			</Query>
		)
	}
}

Pagination.propTypes = {
	query: PropTypes.object.isRequired,
	nameQuery: PropTypes.string.isRequired,
	nameObjects: PropTypes.string.isRequired,
	children: PropTypes.func.isRequired
}


export default Pagination