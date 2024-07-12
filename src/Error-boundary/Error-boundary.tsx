import React, { Component, PropsWithChildren} from 'react';
import './Error-boundary.css';
import '../Error-indicator/Error-indicator'
import ErrorIndicator from '../Error-indicator/Error-indicator';

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
				<ErrorIndicator/>
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