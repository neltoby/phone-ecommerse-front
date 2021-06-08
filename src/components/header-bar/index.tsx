import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

import HeaderImage from '../header-image';
import HeaderSearchBar from '../header-search-bar';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexFlow: 'row wrap',
    marginBottom: theme.spacing(4)
  },
}));

const HeaderBar = () => {
  const cs = useStyles();
  return (
    <Typography component='div' className={cs.root}>
      <HeaderSearchBar />
      <HeaderImage />
    </Typography>
  )
}

export default HeaderBar
