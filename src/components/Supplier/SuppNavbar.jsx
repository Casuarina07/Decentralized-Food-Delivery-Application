import React from 'react';
import { Router } from '@reach/router'
import Home from './Home'
import Orders from './Orders'
import Sell from './Sell'
import Profile from './Profile'
import ResponsiveNavigation from '../ResponsiveNavigation'
import logo from '../logo.svg'
import '../Navbar.css';

function SuppNavbar({ account }) {
	const navLinks = [
		{
			text: 'Home',
			path: '/',
			icon: 'ion-ios-home'
		},
		{
			text: 'Orders',
			path: '/orders',
			icon: 'ion-ios-business'
		},
		{
			text: 'Sell',
			path: '/sell',
			icon: 'ion-ios-bonfire'
		},
        {
			text: 'Profile',
			path: '/profile',
			icon: 'ion-ios-business'
		}
	]

	return (
		<div className="App">
			<ResponsiveNavigation
				navLinks={ navLinks }
				logo={ logo }
        account = { account }
				// background="#fff"
				// hoverBackground="#ddd"
				// linkColor="#777"
			/>
			<Router>
				<Home path="/" />
				<Orders path="/orders" />
				<Sell path="/sell" />
        <Profile path="/profile" account={ account } />
			</Router>
		</div>
	);
}
export default SuppNavbar;
