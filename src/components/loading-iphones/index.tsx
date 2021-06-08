import Zoom from '@material-ui/core/Zoom';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import { LoadIphoneEnum, useGlobalStore } from '../../util/store';
import { actionCreator, ActionTypes } from '../../util/action';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(5),
      fontWeight: 600,
      color: '#999',
      display: 'grid',
      placeItems: 'center'
    },
    button: {
      fontWeight: 'bold',
      color: '#007ee5'
    }
  }))

const LoadingIphones = () => {
  const cs = useStyles();
  const { 
    state: { 
      showModal, 
      loadIphoneError 
    }, 
    dispatch 
  } = useGlobalStore();

  const closeModal = () => {
    dispatch(actionCreator(ActionTypes.LOAD_IPHONE_ERROR, LoadIphoneEnum.LOADING));
    dispatch(actionCreator(ActionTypes.CLOSE_MODAL));
  }
  return (
    <Zoom in={showModal}>
      {
        loadIphoneError === LoadIphoneEnum.LOADING ?
          <Paper elevation={4} className={cs.paper}>
            Updating IPhones Datastore...
          </Paper>
          :
            <Paper elevation={4} className={cs.paper}>
              {
                loadIphoneError === LoadIphoneEnum.SUCCESS ? 
                  'Datastore successfully updated!'
                  : 'An error occured. Try updating again.'
              }
              <Button 
                className={cs.button}
                onClick={closeModal}
              >
                OK
              </Button>
            </Paper>
      }
    </Zoom>
  )
}

export default LoadingIphones
