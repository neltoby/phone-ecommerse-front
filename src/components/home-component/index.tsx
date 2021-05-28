import { useQuery } from 'react-query';
import {Helmet} from "react-helmet";

import { actionCreator, ActionTypes } from '../../util/action';
import { useGlobalStore } from '../../util/store';

const HomeComponent = () => {
  const { state: { page }, dispatch } = useGlobalStore()
  const { isLoading, isError, data } = useQuery(['getSalesRecord', page], () => {
		return fetch(`${process.env.REACT_APP_URL}?req=sell&page=${page+1}&limit=3`)
			.then((res) => res.json())
	}, 
  { 
    keepPreviousData : true, 
    onSuccess: (data: any) => dispatch(actionCreator(ActionTypes.ALL_RES, data)),
  });

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Phones from us!</title>
      </Helmet>
      <h3>This is home component</h3>
    </>
  )
}

export default HomeComponent
