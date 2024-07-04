import React, {Component} from 'react';
import ErrorBoundary from '../Error-boundary/Error-boundary';
import Search from '../Search-panel/Search-panel';
import View from '../View/View';
import './App.css'

export default class App extends Component {
	
	state = {
		search: ''
	}

	onUpdateSearch = (search: string) =>{
        this.setState({search})
    }

	render() {
			return (
				<ErrorBoundary>
					<div className="app">
						<div className="header">RS School. Task 1</div>
						<Search onUpdateSearch= {this.onUpdateSearch}/>
						<View search = {this.state.search}/>
					</div>
				</ErrorBoundary>
			)
	}
}

