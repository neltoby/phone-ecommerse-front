import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import LoadingComponent from '../loading-component';
import Provider from '../provider';
import { initialState } from '../../util/store';
const Home = lazy(() => import('../../pages'));

const App = () => {
	return (
		<Provider initialState={initialState}>
			<Router>
				<Suspense fallback={<LoadingComponent start={true} />}>
						<Route path="/">
							<Home />
						</Route>
				</Suspense>
			</Router>
		</Provider>
	);
};

export default App;