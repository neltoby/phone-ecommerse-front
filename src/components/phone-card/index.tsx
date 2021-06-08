import { FC } from 'react';
import Typography from '@material-ui/core/Typography';
import ImageDecider from '../image-decider';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Colors, useGlobalStore } from '../../util/store';

export type Props = {
  condition: string,
  price: string,
  phone_name: string,
  category: string,
  storage: string,
}

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    display: 'flex',
    width: '18%',
    flexDirection: 'column',
    padding: theme.spacing(1),
    paddingBottom: theme.spacing(3),
    marginBottom: theme.spacing(3),
    backgroundColor: (prop: Colors) => prop.cardBg,
    color: (prop: Colors) => prop.cardFontColor,
    [theme.breakpoints.down('md')]: {
      width: '30%'
    },
    [theme.breakpoints.down('xs')]: {
      width: '40%'
    }
  },
  condition: {
    display: 'flex',
    flexDirection: 'row-reverse',
    '& span': {
      paddingLeft: theme.spacing(0.8),
      paddingRight: theme.spacing(0.8),
      paddingTop: theme.spacing(0.3),
      paddingBottom: theme.spacing(0.3),
      border: '1px solid #bbb',
      borderRadius: '2px',
      fontSize: '0.6rem',
      marginBottom: theme.spacing(0.6)
    }
  },
  image: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingTop: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    '& span:first-child': {
      fontSize: '0.8rem',
    },
    '& span:nth-child(2)': {
      fontSize: '0.7rem',
    },
    '& span:nth-child(3)': {
      fontSize: '0.6rem',
    },
    '& span:nth-child(4)': {
      fontSize: '0.85rem',
      fontWeight: 'bold',
    },
    '& span:nth-child(5)': {
      fontSize: '0.75rem',
    }
  },
  buy: {
    marginTop: theme.spacing(2),
    display: 'flex',
    justifyContent: 'center',
    '& .MuiButton-containedPrimary': {
      backgroundColor: '#007ee5'
    }
  }
}))

const PhoneCard: FC<Props> = ({ condition, price, phone_name, category, storage}) => {
  const { state: { themeColor } } = useGlobalStore()
  const cs = useStyles(themeColor);
  return (
    <Typography component='div' className={cs.root}>
      <Typography component='div' className={cs.condition}>
        <span> {condition} </span>
      </Typography>
      <Typography component='div' className={cs.image}>
        <ImageDecider name={phone_name} />
      </Typography>
      <Typography component='div' className={cs.details}>
        <span>{phone_name}</span>
        <span>{category} | {storage} </span>
        <span>Unit price </span>
        <span>{price}</span>
        <span> 1500 Available</span>
      </Typography>
      <Typography component='div' className={cs.buy}>
        <Button size='small' variant="contained" color="primary">
          Buy
        </Button>
      </Typography>
    </Typography>
  )
}

export default PhoneCard;
