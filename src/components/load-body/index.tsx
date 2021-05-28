import { lazy, Suspense } from 'react';
import { useRouteMatch  } from 'react-router-dom'

import LoadingComponent from '../loading-component';

const Search = lazy(() => import('../search'));
const Category = lazy(() => import('../category'));
const HomeComponent = lazy(() => import('../home-component'));
const NoPage = lazy(() => import('../no-page'));

const LoadBody = () => {
  const searchPath = useRouteMatch ({path: '/search', exact: true, strict: true});
  const homePath = useRouteMatch ({path: '/', exact: true, strict: true});
  const categoryPath = useRouteMatch ({path: '/category', exact: true, strict: true});
  const categoryPathWithParam = useRouteMatch ({path: '/category/:type', exact: true, strict: true});

  return (
    <>
      {
        searchPath !== null ? 
          <Suspense fallback={<LoadingComponent width='100%' height='100%' title='Loading search...'/>}>
            <Search /> 
          </Suspense>
          : homePath !== null ? 
            <Suspense fallback={<LoadingComponent width='100%' height='100%' title='Collecting data ...'/>}>
              <HomeComponent /> 
            </Suspense>
            : categoryPath !== null ?
              <Suspense fallback={<LoadingComponent width='100%' height='100%' title='Loading data'/>}>
                <Category />
              </Suspense>             
              : categoryPathWithParam ? 
                <Suspense fallback={<LoadingComponent width='100%' height='100%' title='Loading data'/>}>
                  <Category param={true} />
                </Suspense> 
                :
                  <Suspense fallback={<></>}>
                    <NoPage />
                  </Suspense>
      }
    </>
  )
}

export default LoadBody
