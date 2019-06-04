import React, {Component, Fragment} from 'react'
import Header from './components/header'
import Sections from './components/sections'
import './scss/app.sass'
import Search from './components/search/search'
import ModeUpdate from './components/modeUpdate'

class App extends Component {

	render(){
		return (
			<Fragment>
				<Header/>
				<div className = 'main'>
					<ModeUpdate/>
					<div className = 'part1'>
						<Search/>
					</div>
					<div className = 'part2'>
						<Sections/>
					</div>
				</div>
			</Fragment>
		)
	}
}

export default App