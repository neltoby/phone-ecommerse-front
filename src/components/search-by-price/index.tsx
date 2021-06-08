import { FC, memo, useRef, useEffect, useMemo } from 'react';
import { useQuery } from 'react-query';
import {Helmet} from 'react-helmet';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'

import { useGlobalStore, PageTitle } from '../../util/store';
import LoadingComponent from '../loading-component';
import LoadingError from '../loading-error';
import NoResultFound from '../no-result-found';
import PhoneCard from '../phone-card';
import { actionCreator, ActionTypes } from '../../util/action';
import isJson from '../../util/is-json';

type Prop = {
  min: string,
  max: string,
}

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  rolling: {
    height: '3rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
    alignSelf: 'self-end',
    width: '100%'
  },
  loading: {
    width: '100%',
    height: '1.5rem',
  }
}))

const SearchByP: FC<Prop> = ({ min, max }) => {
  const cs = useStyles();
  const { 
    state: { 
      currentDisplay, 
      pageTitle, 
      morePages, 
      page,
    }, 
    dispatch 
  } = useGlobalStore()
  const { isLoading, isError, data } = useQuery(['searchByPrice', min, max, page], () => {
    if(pageTitle !== PageTitle.SEARCH_BY_PRICE) {
      dispatch(actionCreator(ActionTypes.PAGE_TITLE, PageTitle.SEARCH_BY_PRICE));
      dispatch(actionCreator(ActionTypes.RESET_ALL_RES));
      dispatch(actionCreator(ActionTypes.RESET_CURRENT_DISPLAY))
    }
		return fetch(`${process.env.REACT_APP_URL}/search?min=${min}&max=${max}&page=${page+1}&limit=1`)
			.then((res) => res.json())
	}, 
  { 
    keepPreviousData : true, 
    cacheTime: 0,
    staleTime: 0,
    onSuccess: (data: any) => {
      if(data.constructor === Object && data.error) {
        return
      }
      data = isJson(data)
      dispatch(actionCreator(ActionTypes.HOME_ALL_RES, isJson(data.data)));
      dispatch(actionCreator(ActionTypes.HOME_CURRENT_DISPLAY, isJson(data.data)));
      dispatch(actionCreator(ActionTypes.PAGINATOR, data.paginator));
      dispatch(actionCreator(ActionTypes.STOP_LOADING_MORE_PAGE));
    },
  });

  const root = useRef<HTMLDivElement>(null);
  const target = useRef<HTMLDivElement>(null)

	const options = {
    root: root.current,
    rootMargin: '0px',
    threshold: 0.1
  };

  const checkFxn = () => {
    dispatch(actionCreator(ActionTypes.PAGE))
  }
  const callback = () => (entries: IntersectionObserverEntry[]) => {
    entries.forEach(entry => {
      if(entry.intersectionRatio > 0){
        checkFxn()
      }
    });   
  }

  const observer = new IntersectionObserver(callback, options);

  useEffect(() => {
    if(target.current !== null){
        observer.observe(target.current)
    }
  }, [target])

  useEffect(() => {
    dispatch(actionCreator(ActionTypes.RESET_PAGE));
    dispatch(actionCreator(ActionTypes.RESET_ALL_RES));
    dispatch(actionCreator(ActionTypes.RESET_CURRENT_DISPLAY));
  }, [max, min])

  return (
    <div
      className={cs.root}
      ref={root}
    >
    {
      isLoading 
        ? <LoadingComponent 
            title={`Searching for phones within the range of ${min} to ${max}`} 
            height='100%'
            width='100%'
          /> 
        : isError 
          ? <LoadingError />
          : currentDisplay.length ?
            <>
              <Helmet>
                <meta charSet="utf-8" />
                <title>{min} - {max} ranges of our phones!</title>
              </Helmet>
              {
                currentDisplay.map((item, i) => {
                  return <PhoneCard 
                        key={i}
                        phone_name={item.phone_name} 
                        category={item.category}
                        storage={item.storage}
                        condition={item.condition}
                        price={item.price}
                      />
                })
              }
            </>
            : <NoResultFound />
    }
    {
      morePages && (
        <div ref={target} className={cs.rolling}>
          Loading ...
        </div>
      )
    }
    <div ref={target} className={cs.loading}></div>
    </div>
  )
}

const SearchByPrice = memo(SearchByP);

export default SearchByPrice;
