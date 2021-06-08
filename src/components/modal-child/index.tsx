import { FC } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'grid',
    placeItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0
  }
}));

const ModalChild: FC = ({ children}) => {
  const cs = useStyles();
  return (
    <Typography
      className={cs.root}
    >
      {children}
    </Typography>
  )
}

export default ModalChild
