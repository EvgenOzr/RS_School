import React, { Component, PropsWithChildren} from 'react';
import './Error-boundary.css';

class ErrorBoundary extends Component <PropsWithChildren> {

	state = {
		hasError: false,
		error: ''
	}

	static getDerivedStateFromError() {
		// Update state so the next render will show the fallback UI.
		return { hasError: true };
	  }

	onError = () => {
        this.setState({hasError: true})
    }
	
	render() {
		if(this.state.hasError){
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