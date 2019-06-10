import React, {Component} from 'react'
import './dropdown.sass'
import PropTypes from 'prop-types'

class Dropdown extends Component {
	constructor(props){
		super(props)
		this.state = {
			display: false,
			choose: props.choose
		}
	}

	toogleDisplay(){
		this.setState(state => ({display: !state.display}))
	}

	display(bool){
		this.setState({display: bool})
	}

	choose(object){
		this.setState({choose: object})
	}

	getData(){
		return !this.props.displayDataChoosed && this.state.choose ?
			this.props.data.filter(o => o != this.state.choose)
			:
			this.props.data
	}

	render(){
		return (
			<div className = 'dropdown'
				onClick = {() => this.toogleDisplay()}
				onMouseEnter = {() => this.display(true)}
				onMouseLeave = {() => this.display(false)}
			>
				<header className = 'dropdown_header'>
					{
						this.state.choose && this.props.renderHeader ?
							this.props.renderHeader(this.state.choose)
							:
							this.props.header
					}
				</header>
				{
					this.state.display && (
						<div className = 'dropdown_body'>
							{
								this.getData().map((object, index) => (
									<div key = {index} className = 'dropdown_body_item'
										onClick = {() => this.choose(object)}>
										{this.props.renderData(object)}
									</div>
								))
							}
						</div>
					)
				}
			</div>
		)
	}
}

Dropdown.propTypes = {
	data: PropTypes.array.isRequired,
	renderData: PropTypes.func.isRequired,
	renderHeader: PropTypes.func,
	header: PropTypes.node,
	displayDataChoosed: PropTypes.bool,
	choose: PropTypes.object
}

export default Dropdown