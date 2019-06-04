import React, {Component} from 'react'
import {LinkPerson} from '../utils/links'
import {AllPersons} from '../../query/persons.gql'
import Pagination from '../utils/pagination'

class Persons extends Component {
	render(){
		return (
			<Pagination query = {AllPersons} nameQuery = 'allPersons' nameObjects = 'persons'>
				{
					person => {
						return (
							<LinkPerson id= {person.id}>
								{person.name}
							</LinkPerson>
						)
					}
				}
			</Pagination>
		)
	}
}

export default Persons