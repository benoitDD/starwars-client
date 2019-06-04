import React from 'react'
import {Router} from '@reach/router'
import Starships from './starships/starships'
import Starship from './starships/starship'
import Persons from './persons/persons'
import Person from './persons/person'
import Planets from './planets/planets'
import Planet from './planets/planet'
import Species from './species/species'
import Specie from './species/specie'
import Vehicles from './vehicles/vehicles'
import Vehicle from './vehicles/vehicle'
import SignIn from './sign/signin'
import SignUp from './sign/signup'
import HandleError from './utils/handleError'

function Sections(){
	return(
		<section>
			<Router>
				<Starships path = '/starships'/>
				<Starship path = '/starship/:id'/>
				<Persons path = '/persons'/>
				<Person path = '/person/:id'/>
				<Planets path = '/planets'/>
				<Planet path = '/planet/:id'/>
				<Species path = '/species'/>
				<Specie path = '/specie/:id'/>
				<Vehicles path = '/vehicles'/>
				<Vehicle path = '/vehicle/:id'/>
				<SignUp path = '/sign-up'/>
				<SignIn path = '/sign-in'/>
				<HandleError path = '/error'/>
			</Router>
		</section>
	)
}

export default Sections