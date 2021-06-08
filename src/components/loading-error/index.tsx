import Typography from '@material-ui/core/Typography'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { FC } from 'react';
import { Colors, useGlobalStore } from '../../util/store';

type Prop = {
  title?: string
}

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    display: 'flex',
    width: '100%',
    backgroundColor: 'inherit',
    color: (prop: Colors) => prop.cardFontColor,
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold'
  }
}))

const LoadingError: FC<Prop> = ({ title }) => {
  const { state: { themeColor } } = useGlobalStore();
  const cs = useStyles(themeColor);
  return (
    <Typography className={cs.root} >
      {title !== undefined ? title : 'Error Loading resource'}
    </Typography>
  )
}

export default LoadingError
