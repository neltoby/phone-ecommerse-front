import queryString, { ParsedQuery } from 'query-string';
import { lazy, Suspense } from 'react';
import { useLocation } from 'react-router-dom';
import LoadingComponent from '../loading-component';

const NoQueryParameter = lazy(() => import('../no-query-parameter'));
const SearchByString = lazy(() => import('../search-by-string'));
const SearchByPrice = lazy(() => import('../search-by-price'));


// const fetch

const Search = () => {
  const location = useLocation();
  const query: ParsedQuery = queryString.parse(location.search);
  if(!Object.keys(query).length) return <NoQueryParameter />
  if(query.q) 
  return (
    <Suspense 
      fallback={
        <LoadingComponent 
          height='100%'
          width='100%'
          title={`Searching for phones with this property - ${query.q}`} 
        />
      }
    >
      <SearchByString query={query.q as string}/>
    </Suspense>
  )
  if(query.min && query.max) 
  return (
    <Suspense 
      fallback={
        <LoadingComponent 
          height='100%'
          width='100%'
          title={`Searching for phones within this range: ${query.min} - ${query.max}`} 
        />
      }
    >
      <SearchByPrice min={query.min as string} max={query.max as string} />
    </Suspense>
  )
  return (
    <>
      <h3>Invalid search parameter</h3>
    </>
  )
}

export default Search
