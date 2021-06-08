import { FC, FormEvent, useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router';
import { useGlobalStore } from '../../util/store';
import { actionCreator, ActionTypes } from '../../util/action';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
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
  price: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    padding: theme.spacing(2),
    alignItems: 'center'
  },
  priceRange: {
    width: '80%'
  },
  priceFilter: {
    width: '100%',
  },
  search: {
    width: '90%',
    marginTop: theme.spacing(1.5),
    backgroundColor: '#007ee5',
    color: '#fff',
    fontWeight: 'bold',
  },
  minMax: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: '1.3rem',
    '& input': {
      borderRadius: '0.2rem',
      height: '2rem',
      border: 'none',
      outline: 'none',
      width: '90%',
      paddingRight: theme.spacing(1),
      paddingLeft: theme.spacing(1),
    }, 
    '& p':{
      marginTop: '-0.1rem',
      marginBottom: '-0.1rem',
    }
  }
}))

function valuetext(value: number) {
  return `$${value}`;
}

const SliderComponent:FC = () => {
  const { state: { allRes }, dispatch } = useGlobalStore();
  const [value, setValue] = useState<number[]>([100, 300]);
  const [ minValue, setMinValue ] = useState<string>('')
  const [ maxValue, setMaxValue ] = useState<string>('')
  const [disabled, setDisabled ] = useState<boolean>(true);
  const history = useHistory();
  const cs = useStyles()

  const handleChange = (event: any, newValue: number | number[]) => {
    setValue(newValue as number[]);
    if(allRes.length){
      dispatch(actionCreator(ActionTypes.FILTER_ALL_RES, value))
    }
  };

  const onChangeMin = (e: FormEvent<HTMLInputElement>) => {
    setMinValue(e.currentTarget.value);
    if(maxValue){
      if(e.currentTarget.value.trim().length){
        if(parseInt(e.currentTarget.value, 10) < parseInt(maxValue, 10)) {
          setDisabled(false);
        }else setDisabled(true);
      }else setDisabled(true);
    }else setDisabled(true);
  }

  const onChangeMax = (e: FormEvent<HTMLInputElement>) => {
    setMaxValue(e.currentTarget.value);
    if(minValue){
      if(e.currentTarget.value.trim().length){
        if(parseInt(e.currentTarget.value, 10) > parseInt(minValue, 10)) {
          setDisabled(false);
        }else {
          setDisabled(true);
        };
      }else {
        setDisabled(true);
      }
    }else{
      setDisabled(true);
    }
  }

  const searchByPrice = () => {
    if(minValue && maxValue){
      if(parseInt(minValue, 10) < parseInt(maxValue, 10)) {
        setValue([parseInt(minValue, 10), parseInt(maxValue, 10)]);
        dispatch(actionCreator(ActionTypes.CLOSE))
        history.push(`/search?min=$${minValue}&max=$${maxValue}`);
      }else{
        setDisabled(true)
      }
    }
    
  }

  return (
    <Typography className={cs.price} component='div'>
        <Typography className={cs.priceFilter} component='div' >
          Price Filter
        </Typography>
        <Typography className={cs.priceRange} component='div'>
          <Slider
            color='secondary'
            value={value}
            min={50}
            max={2500}
            onChange={handleChange}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
            getAriaValueText={valuetext}
            valueLabelFormat={valuetext}
          />
        </Typography>
        <Typography className={cs.minMax} component='div'>
          <input 
            type='number' 
            value={minValue} 
            onChange={onChangeMin} 
            placeholder='Min' 
          />
          <p> | </p>
          <input 
            type='number' 
            value={maxValue} 
            onChange={onChangeMax} 
            placeholder='Max'
          />
          {
            (minValue || maxValue) &&
            <Button 
              size='small' 
              variant="contained" 
              className={cs.search}
              onClick={searchByPrice}
              disabled={disabled}
            >
              Search by price
            </Button>
          }
        </Typography>
      </Typography>
  )
}

export default SliderComponent
