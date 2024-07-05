import React, { Component, PropsWithChildren} from 'react';
import './Error-boundary.css';

class ErrorBoundary extends Component <PropsWithChildren> {

	state = {
		hasError: false,
		error: ''
	}

	componentDidCatch(error: Error) {

		this.setState({
			hasError: true,
			error
		});
	}

	onError = () => {
        this.setState({hasError: true})
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
					<button className="error-btn" onClick = {this.onError}>Throw Error</button>
					{this.props.children}
				</div>
			) 
		}
}

export default ErrorBoundary;