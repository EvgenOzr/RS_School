import React, { Component, PropsWithChildren} from 'react';
import './Error-boundary.css';
import '../Error-indicator/Error-indicator'
import ErrorIndicator from '../Error-indicator/Error-indicator';
import PropTypes from 'prop-types'


class ErrorBoundary extends Component <PropsWithChildren> {

	state = {
		hasError: false,
		error: ''
	}
	static propTypes: { children: PropTypes.Requireable<PropTypes.ReactNodeLike>; };

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

ErrorBoundary.propTypes = {
	children: PropTypes.node
}

export default ErrorBoundary;