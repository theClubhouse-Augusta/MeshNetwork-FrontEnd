import React from 'react';
import createClass from 'create-react-class';
import PropTypes from 'prop-types';
import Select from 'react-select'; 

const LOCATIONS = [
	{ label: 'the Clubhou.se', value: 'the Clubhou.se' },
	{ label: 'FourAthens', value: 'FourAthens' },
	{ label: 'SparkMacon', value: 'SparkMacon' },
];

const WHY_WOULD_YOU = [
	{ label: 'Chocolate (are you crazy?)', value: 'chocolate', disabled: true },
].concat(LOCATIONS.slice(1));

var LocationSelectField = createClass({
	displayName: 'LocationSelectField',
	propTypes: {
		label: PropTypes.string,
	},
	getInitialState () {
		return {
			removeSelected: false,
			disabled: false,
			crazy: false,
			stayOpen: true,
			value: [],
		};
	},
	handleSelectChange (value) {
		console.log('You\'ve selected:', value);
		this.setState({ value });
	},
	toggleCheckbox (e) {
		this.setState({
			[e.target.name]: e.target.checked,
		});
	},

	render () {
		const { crazy, disabled, stayOpen, value } = this.state;
		const options = crazy ? WHY_WOULD_YOU : LOCATIONS;
		return (
			<div className="section">
				
				<Select
					closeOnSelect={!stayOpen}
					disabled={disabled}
					multi
					onChange={this.handleSelectChange}
					options={options}
					placeholder="Select a location"
          			removeSelected={this.state.removeSelected}
					simpleValue
          			value={value}
         			menuStyle= {{border: '1px solid black'}}
					  wrapperStyle={{ border: '1px solid black', borderRadius: '4px'}}
					autosize
				/>

			
			</div>
		);
	}
});

module.exports = LocationSelectField;