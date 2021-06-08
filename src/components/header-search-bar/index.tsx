import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { Button, TextField, Typography, Hidden } from '@material-ui/core';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { ChangeEvent, FC } from 'react';
import ReorderIcon from '@material-ui/icons/Reorder';

import { useGlobalStore, Colors } from '../../util/store';
import { actionCreator, ActionTypes } from '../../util/action';
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '45%',
    padding: theme.spacing(2),
    [theme.breakpoints.down('md')]: {
      width: '100%',
      paddingRight: theme.spacing(2),
    }
  },
  icon: {
    width: '15%',
    padding: theme.spacing(1),
    marginRight: theme.spacing(2)
  },
  title: {
    width: '100%',
    fontWeight: 'bold',
    fontFamily: 'monospace',
    fontSize: '1.6rem',
    [theme.breakpoints.down('md')]: {
      width: '80%',
      paddingRight: theme.spacing(2),
    }
  },
  text: {
    width: '100%',
    fontSize: '1.6rem',
    textTransform: 'uppercase',
    marginBottom: theme.spacing(2),
    color: (prop: Colors) => prop.color,
    [theme.breakpoints.down('md')]: {
      display: 'flex',
      width: '100%',
      justifyContent: 'space-between',
    }
  },
  search: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between'
  },
  textField: {
    width: '70%',
    fontSize: '0.8rem',
    backgroundColor: (prop: Colors) => prop.inputBackgroundColor,
    color: (prop: Colors) => prop.inputFontColor,
    [theme.breakpoints.down('sm')]: {
      width: '55%',
    }
  },
  searchButton: {
    width: '25%',
    color: '#fff',
    backgroundColor: '#007ee5',
    [theme.breakpoints.down('sm')]: {
      width: '40%',
    }
  }
}));

const HeaderSearchBar: FC = () => {
  const { state: { themeColor, searchInput, openDrawer }, dispatch } = useGlobalStore();
  const cs = useStyles(themeColor);
  const history = useHistory();

  const onClick = () => {
    if(searchInput.trim().length){
      history.push(`/search?q=${searchInput}`);
    }else{
      // toast should display tat button is not pressed
    }
  }

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(actionCreator(ActionTypes.SEARCH_INPUT, e.currentTarget.value));
  }

  const toggleFxn = () => {
    const val = openDrawer ? ActionTypes.CLOSE : ActionTypes.OPEN;
		dispatch(actionCreator(val));
  }

  return (
    <Typography component='div' className={cs.root}>
      <Typography component='div' className={cs.text}>
        <Hidden mdUp implementation="js">
          <span className={cs.icon} onClick={toggleFxn}>
              <ReorderIcon />
          </span>
        </Hidden>
        <Typography className={cs.title} component='div'>
          Shop our latest available stock here
        </Typography>
      </Typography>
      <Typography component='div' className={cs.search}>
        <TextField 
          size='small'
          className={cs.textField}
          variant='outlined' 
          label='Enter Search Term(e.g IPhone x, 128GB, A1)' 
          onChange={onChange}
          value={searchInput}
        />
        <Button 
          size='small'
          variant='contained' 
          className={cs.searchButton} 
          endIcon={<ArrowForwardIcon />}
          onClick={onClick}
        >
          Search
        </Button>
      </Typography>
    </Typography>
  )
}

export default HeaderSearchBar