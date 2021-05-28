import React, { Component } from 'react';

type ErrorState = {
  hasError: boolean,
  err: string
}

export default class ErrorBoundary extends Component<any, ErrorState> {
	constructor(props: any) {
		super(props);
		this.state = { hasError: false, err: '' };
	}

	static getDerivedStateFromError(error: any) {
		return { hasError: true };
	}

	componentDidCatch(error: any, errorInfo: any) {
		this.setState({ err: error.message });
		console.log(error, errorInfo, JSON.stringify(errorInfo));
	}

	render() {
		if (this.state.hasError) {
			return (
				<>
					{this.props.fallback}
					<p>{this.state.err}</p>
				</>
			);
		}
		return this.props.children;
	}
}