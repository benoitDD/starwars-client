import React, {Component} from 'react'

function displayAfter(ms = 500){
	return ComponentToDisplayAfter => {
		return class DisplayAfter extends Component {

			constructor(props){
				super(props)
				this.state = {
					display: false
				}
			}

			componentDidMount(){
				this.idTimeOut = setTimeout(() => {
					this.setState({display: true})
				}, ms)
			}
    
			componentWillUnmount(){
				clearTimeout(this.idTimeOut)
			}

			render(){
				return this.state.display && <ComponentToDisplayAfter {...this.props}/>
			}
		}
	}
}

export default displayAfter