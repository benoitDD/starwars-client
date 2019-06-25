import React, {Component, Fragment} from 'react'
import Header from './components/header'
import Sections from './components/sections'
import './scss/app.sass'
import Search from './components/search/search'
import ModeUpdate from './components/modeUpdate'
import withSizes from 'react-sizes'
import PropTypes from 'prop-types'
import {ProviderPart1} from './utils'

class App extends Component {

	constructor(props){
		super(props)
		this.state = {
			displayPart1Small: false
		}
	}

	handleSmallScrenPart1(){
		return (
			<Fragment>
				<div onClick = {this.tooglePart1Small} 
					className = {`toogle-part1 ${this.state.displayPart1Small ? 'left' : 'right'}`} />

				{
					this.state.displayPart1Small &&
						this.part1()
				}
			</Fragment>
		)
			
	}

	part1(){
		return (
			<div className = 'part1'>
				<Search/>
			</div>
		)
	}

	tooglePart1Small = () =>{
		this.setState(state => ({displayPart1Small: !state.displayPart1Small}))
	}

	render(){
		return (
			<Fragment>
				<Header/>
				<div className = 'main'>
					<ModeUpdate/>
					<ProviderPart1.Provider value = {{
						displayPart1Small: this.props.isSmallScreen && this.state.displayPart1Small,
						tooglePart1Small: this.tooglePart1Small
					}}>
						{
							this.props.isSmallScreen ?
								this.handleSmallScrenPart1()
								:
								this.part1()
						}
					</ProviderPart1.Provider>
					<div className = 'part2'>
						<Sections/>
					</div>
				</div>
			</Fragment>
		)
	}
}

App.propTypes = {
	isSmallScreen: PropTypes.bool.isRequired
}

const mapSizesToProps = ({ width }) => ({
	isSmallScreen: width < 700,
})

export default withSizes(mapSizesToProps)(App)