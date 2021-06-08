import { useReducer } from 'react';

import ErrorBoundary from '../error-boundary'
import { IInitialState, Store } from '../../util/store';
import reducer from '../../util/reducer';

const Provider = ({ initialState, children }: { initialState: IInitialState, children: JSX.Element}) => {
  const [ state, dispatch ] = useReducer(reducer, initialState);
  // const dispatchBase = (dispatch) => (action) => action instanceof Function ? action(dispatch) : dispatch(action)
  return (
    <Store.Provider value={{ state, dispatch }}>
      <ErrorBoundary fallback={<h1>Something went wrong</h1>}>
        {children}
      </ErrorBoundary>
    </Store.Provider>
  )
}

export default Provider;