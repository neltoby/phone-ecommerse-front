import Typography from '@material-ui/core/Typography';
import { lazy, Suspense } from 'react';
import { useRouteMatch  } from 'react-router-dom'
import { Helmet } from 'react-helmet';
import { makeStyles, Theme, createStyles} from '@material-ui/core/styles'

import LoadingComponent from '../loading-component';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    display: 'flex',
    width: '75%',
    justifyContent: 'space-around',
    // paddingRight: theme.spacing(),
    flexWrap: 'wrap',
    marginBottom: theme.spacing(5),
    [theme.breakpoints.down('md')]: {
      width: '100%',
      justifyContent: 'space-around'
    }
  }
}))

const Search = lazy(() => import('../search'));
const Category = lazy(() => import('../category'));
const HomeComponent = lazy(() => import('../home-component'));
const NoPage = lazy(() => import('../no-page'));

const src = 'https://res.cloudinary.com/thronetechnologies/image/upload/c_scale,h_200,w_200/v1622142723/Iphones/IphoneGroup_boubqr.webp'

const LoadBody = () => {
  const cs = useStyles();
  const searchPath = useRouteMatch (
    {
      path: '/search', 
      exact: true, 
      strict: true
    }
  );
  const homePath = useRouteMatch (
    {
      path: '/', 
      exact: true, 
      strict: true
    }
  );
  const categoryPath = useRouteMatch (
    {
      path: '/category', 
      exact: true, 
      strict: true
    }
  );
  const categoryPathWithParam = useRouteMatch (
    {
      path: '/category/:type', 
      exact: true, 
      strict: true
    }
  );
  
  return (
    <Typography
      component='div'
      className={cs.root}
    >
      <Helmet>
        <link rel='icon' href={src} />
      </Helmet>
      {
        searchPath !== null ? 
          <Suspense 
            fallback={
              <LoadingComponent 
                width='100%' 
                height='100%' 
                title='Loading search...'
              />
            }
          >
            <Search /> 
          </Suspense>
          : homePath !== null ? 
            <Suspense 
              fallback={
                <LoadingComponent 
                  width='100%' 
                  height='100%' 
                  title='Collecting data ...'
                />
              }
            >
              <HomeComponent /> 
            </Suspense>
            : categoryPath !== null ?
              <Suspense 
                fallback={
                  <LoadingComponent 
                    width='100%' 
                    height='100%' 
                    title='Loading data'
                  />
                }
              >
                <Category type={null}/>
              </Suspense>             
              : categoryPathWithParam ? 
                <Suspense 
                  fallback={
                    <LoadingComponent 
                      width='100%' 
                      height='100%' 
                      title='Loading data'
                    />
                  }
                >
                  <Category 
                    type={categoryPathWithParam.params} 
                    param={true} 
                  />
                </Suspense> 
                :
                  <Suspense 
                    fallback={
                      <></>
                    }
                  >
                    <NoPage />
                  </Suspense>
      }
    </Typography>
  )
}

export default LoadBody
