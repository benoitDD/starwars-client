import React, {Component} from 'react'
import {Query} from 'react-apollo'
import PropTypes from 'prop-types'
import './pagination.sass'
import Loading from '../utils/loading'
import HandleError from '../utils/handleError'
import {withTranslation} from 'react-i18next'

class Pagination extends Component {

	constructor(props){
		super(props)
		this.state = {
			error: null
		}
	}

	getData(data){
		return data[this.props.nameQuery]
	}

	getPageInfo(data){
		return this.getData(data).pageInfo
	}

	fetchMore(fetchMoreFunc, variables){
		fetchMoreFunc({
			variables,
			updateQuery: (prev, {fetchMoreResult}) => {
				return fetchMoreResult
			}
		}).catch(error => this.setState({error}))
	}

	previousButton(data, fetchMore){
		const pageInfo = this.getPageInfo(data)
		return (
			<button disabled = {!pageInfo.hasPreviousPage} onClick = {() => 
				this.fetchMore(fetchMore, {before: pageInfo.startCursor})
			}>
				{this.props.t('previous')}
			</button>
		)
	}

	nextButton(data, fetchMore){
		const pageInfo = this.getPageInfo(data)
		return (
			<button disabled = {!pageInfo.hasNextPage} onClick = {() => 
				this.fetchMore(fetchMore, {after: pageInfo.endCursor})
			}>
				{this.props.t('next')}
			</button>
		)
	}

	render(){
		return (
			<Query query = {this.props.query} variables = {{pageSize: 10}}>
				{
					({data, loading, error, fetchMore}) => {
						if (loading) return <div id = 'pagination-loading'><Loading/></div>
						const _error = error || this.state.error
						if (_error) return <HandleError error = {_error}/>
						const pagination = this.getData(data)
						const pageInfo = this.getPageInfo(data)
						return (
							<div className = 'pagination'>
								<div className = 'pagination-header'>
									<span>{pageInfo.totalCount} {this.props.t('item.s')}</span>
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
	children: PropTypes.func.isRequired,
	t: PropTypes.func.isRequired
}


export default withTranslation()(Pagination)