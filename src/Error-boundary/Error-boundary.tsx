import React, { Component, PropsWithChildren} from 'react';
import './Error-boundary.css';

class ErrorBoundary extends Component <PropsWithChildren> {

	state = {
		hasError: false,
		error: ''
	}

	componentDidCatch(error: Error) {
		console.log(error);
		
		this.setState({
			hasError: true,
			error
		});
	}

	render() {
		if(this.state.hasError){
			console.log(this.state);
			
			return (
				<div className="error-indicator">
					<span className="error">Error</span>
					<span>
						An error occured!
					</span>
					<span>{this.state.error}</span>
				</div>
			)
		}
			return(
				<div>
					{this.props.children}
				</div>
			) 
		}
}

export default ErrorBoundary;