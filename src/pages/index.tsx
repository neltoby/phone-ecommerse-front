import { QueryClient, QueryClientProvider } from 'react-query';

import IndexHome from '../components/index-component';
import ErrorBoundary from '../components/error-boundary';
import LoadBody from '../components/load-body';
import SideBar from '../components/side-bar';

const queryClient = new QueryClient();

const Home = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<IndexHome
				side={
					<ErrorBoundary 
						fallback={
							<h4>Could not load page</h4>
						}
					>
						<SideBar />
					</ErrorBoundary>
				}
				right={
					<ErrorBoundary 
						fallback={
							<h4>Could not load page</h4>
						}
					>
						<LoadBody />
					</ErrorBoundary>
				}
			/>
		</QueryClientProvider>
	);
};

export default Home;