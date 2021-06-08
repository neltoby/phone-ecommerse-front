import { FC } from 'react';
import { useHistory } from 'react-router';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import ListItemText from '@material-ui/core/ListItemText';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

import { Colors, LoadIphoneEnum, useGlobalStore } from '../../util/store';
import SliderComponent from '../slider-component';
import Storage from '../storage';
import RadioButton from '../radio-buttons';
import Themes from '../themes';
import Modal from '../modal';
import ModalChild from '../modal-child';
import { actionCreator, ActionTypes } from '../../util/action';
import LoadingIphones from '../loading-iphones';

type SideBarProps = {
  modal: boolean
}

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    backgroundColor: (prop: Colors) => prop.cardBg,
    color: (prop: Colors) => prop.cardFontColor,
    paddingBottom: theme.spacing(3),
    '& .MuiSlider-colorSecondary': {
      color: '#fff',
    },
    '& .MuiSlider-thumbColorSecondary': {
      color: 'red'
    },
    '& .MuiSlider-valueLabel': {
      color: 'red'
    }
  },
  list: {},
  header: {
    color: (prop: Colors) => prop.cardFontColor
  },
  listCategory: {
    paddingLeft: theme.spacing(4)
  },
  listText: {
    fontSize: '0.7rem'
  },
  price: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    padding: theme.spacing(3),
    alignItems: 'center'
  },
  priceRange: {
    width: '80%'
  },
  priceFilter: {
    width: '100%',
  },
  themes: {
    marginTop: '2rem',
  },
  loadIphoneContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: theme.spacing(2),
    borderTop: '1px solid #ddd',
    marginBottom: theme.spacing(3),
    paddingTop: theme.spacing(4),
  },
  loadIphones: {
    backgroundColor: '#007ee5',
    color: '#fff',
  }
}))

const SideBarComponent: FC<SideBarProps> = ({modal}) => {
  const { 
    state: { 
      themeColor, 
      categoryTags,
      showModal, 
    }, 
    dispatch
  } = useGlobalStore();
  const cs = useStyles(themeColor);
  const history = useHistory();

  const changeLoc = (item: string) => {
    history.push(`/category/${item.toLowerCase()}`);
    if(modal) dispatch(actionCreator(ActionTypes.CLOSE));
  }

  const loadIphones = async () => {
    try{
      if(modal) dispatch(actionCreator(ActionTypes.CLOSE));
      dispatch(actionCreator(ActionTypes.SHOW_MODAL));
      const data = await fetch(`${process.env.REACT_APP_URL}/sync-data`);  
      dispatch(actionCreator(ActionTypes.LOAD_IPHONE_ERROR, LoadIphoneEnum.SUCCESS))    
    } catch(e) {
      dispatch(actionCreator(ActionTypes.LOAD_IPHONE_ERROR, LoadIphoneEnum.FAILED))
    }
  }

  return (
    <Typography component='div' className={cs.root}>
      <List
				className={cs.list}
				aria-labelledby="nested-list-subheader"
			>
        <ListItem className={cs.header}>
          <ListItemText className={cs.listText}>Category</ListItemText>
        </ListItem>
        {
          categoryTags.map((item, i) => (
            <ListItem button className={cs.listCategory} key={i} onClick={() => changeLoc(item)}>
              <ListItemText className={cs.listText}>{item}</ListItemText>
            </ListItem>
          ))
        }
      </List>
      <SliderComponent />
      <Storage 
        title='Storage'
      >
        <RadioButton />
      </Storage>
      <Storage 
        title='Set theme'
      >
        <Typography className={cs.themes} component='div' >
          <Themes />
        </Typography>
      </Storage>
      <Typography 
        className={cs.loadIphoneContainer} 
        component='div' 
      >
        <Button 
          variant="contained" 
          className={cs.loadIphones}
          onClick={loadIphones}
        >
          Load Iphones
        </Button>
      </Typography>
      {
        showModal &&
          <Modal>
            <ModalChild>
              <LoadingIphones />
            </ModalChild>
          </Modal>
      }
    </Typography>
  )
}

export default SideBarComponent
