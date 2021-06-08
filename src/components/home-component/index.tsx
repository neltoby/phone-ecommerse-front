import { useRef, useEffect } from 'react';
import { useQuery } from 'react-query';
import {Helmet} from "react-helmet";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import { actionCreator, ActionTypes } from '../../util/action';
import { useGlobalStore, PageTitle } from '../../util/store';
import LoadingComponent from '../loading-component';
import LoadingError from '../loading-error';
import PhoneCard from '../phone-card';
import isJson from '../../util/is-json';

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

const HomeComponent = () => {
  const cs = useStyles();
  const { 
    state: { 
      page, 
      currentDisplay, 
      pageTitle, 
      morePages,
    }, 
    dispatch 
  } = useGlobalStore()
  const { isLoading, isError } = useQuery(
    ['getSalesRecord', page], 
    () => {
      if(pageTitle !== PageTitle.HOME) {
        dispatch(actionCreator(ActionTypes.PAGE_TITLE, PageTitle.HOME));
        dispatch(actionCreator(ActionTypes.RESET_ALL_RES));
        dispatch(actionCreator(ActionTypes.RESET_CURRENT_DISPLAY));
      }
      return fetch(`${process.env.REACT_APP_URL}?req=sell&page=${page+1}&limit=2`)
        .then((res) => res.json())
    }, 
    { 
      keepPreviousData : true, 
      cacheTime: 0,
      staleTime: 0,
      onSuccess: (data: any) => {
        data = isJson(data);
        if(!data.error){
          dispatch(actionCreator(ActionTypes.HOME_ALL_RES, data.sellList));
          dispatch(actionCreator(ActionTypes.HOME_CURRENT_DISPLAY, data.sellList));
          dispatch(actionCreator(ActionTypes.PAGINATOR, data.paginator));
          dispatch(actionCreator(ActionTypes.STOP_LOADING_MORE_PAGE));
        }
      },
    }
  );

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
  const callback = (entries: IntersectionObserverEntry[]) => {
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

  return (
    <div
      className={cs.root}
      ref={root}
    >
      <Helmet>
        <meta charSet="utf-8" />
        <title>Phones from us!</title>
      </Helmet>
      {
        isLoading 
          ? <LoadingComponent 
              title='Loading ...' 
              height='100%'
              width='100%'
            /> 
          : 
            isError 
              ? <LoadingError /> 
              : 
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

export default HomeComponent
