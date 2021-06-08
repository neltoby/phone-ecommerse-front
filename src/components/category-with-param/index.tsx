import { useQuery } from 'react-query';
import {Helmet} from "react-helmet";
import { FC, memo } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import LoadingComponent from '../loading-component';
import LoadingError from '../loading-error';
import PhoneCard from '../phone-card';
import NoResultFound from '../no-result-found';
import { useGlobalStore, PageTitle } from '../../util/store';
import { actionCreator, ActionTypes } from '../../util/action';
import isJson from '../../util/is-json';
import { selectImage } from '../image-decider';

type Prop = {
  type: string,
}

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  loading: {
    width: '100%',
    backgroundColor: '#fff',
    height: '1.5rem',
  }
}))

const errorText = 'We do not have your phone of choice yet!';

const CategoryParam: FC<Prop> = ({type}) => {
  const cs = useStyles();
  const { 
    state: { 
      categoryTags, 
      currentDisplay, 
      pageTitle, 
    }, 
    dispatch 
  } = useGlobalStore();
  const { isLoading, error, data } = useQuery(
    ['getCategory', type], 
    () => {
      if(pageTitle !== PageTitle.CATEGORY) {
        dispatch(actionCreator(ActionTypes.PAGE_TITLE, PageTitle.CATEGORY));
        dispatch(actionCreator(ActionTypes.RESET_CURRENT_DISPLAY));
        dispatch(actionCreator(ActionTypes.RESET_ALL_RES));
      }
      if(!categoryTags.includes(type)) return Promise.reject(errorText);
      return fetch(`${process.env.REACT_APP_URL}/category/${type}`)
        .then((res) => res.json())
    }, 
    { 
      onSuccess: (data: any) => {
        data = isJson(data);
        if(data.error) return
        dispatch(actionCreator(ActionTypes.ALL_RES, data.category));
        dispatch(actionCreator(ActionTypes.CURRENT_DISPLAY, data.category));
        dispatch(actionCreator(ActionTypes.PAGINATOR, isJson(data.paginator)));
      },
    }
  );

  return (
    <div
      className={cs.root}
    >
    {
      isLoading 
        ? <LoadingComponent 
            title={`Searching for ${type}`} 
            height='100%'
            width='100%'
          /> 
        : error 
          ? <LoadingError 
              title={error === errorText ? errorText : ' Could not load Resource.'}
            />
          : data.error
            ? <LoadingError 
                title={data.error}
              /> 
            : currentDisplay.length 
              ?
                <>
                  <Helmet>
                    <meta charSet="utf-8" />
                    <title>{type}</title>
                    <link rel='icon' href={selectImage(type)} />
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
    </div>
  )
}

const CategoryWithParam = memo(CategoryParam);

export default CategoryWithParam
