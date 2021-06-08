import { FC } from 'react';
import Typography from '@material-ui/core/Typography'
import {makeStyles, Theme, createStyles } from '@material-ui/core/styles';

type Props = {
  title: string,
}

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    padding: theme.spacing(2),
    alignItems: 'center'
  },
  storage: {
    display: 'flex',
    alignItems: 'flex-start',
    width: '100%',
  },
  storages: {
    display: 'flex',
    alignItems: 'flex-start',
    width: '100%',
  }
}))

const Storage: FC<Props> = ({ title, children}) => {
  const cs = useStyles();
  return (
    <Typography component='div' className={cs.root}>
      <Typography className={cs.storage} component='div' >
        {title}
      </Typography>
      <Typography className={cs.storages} component='div'>
        {children}
      </Typography>
    </Typography>
  )
}

export default Storage
