import { RadioButtonGroup } from 'react-rainbow-components';
import { FormEvent } from 'react';
import { useGlobalStore } from '../../util/store';
import { actionCreator, ActionTypes } from '../../util/action';
import themes from './themes';

const options = [
	{ value: 'default', label: 'dark' },
	{ value: 'light', label: 'light' },
];

enum Theme {
  default = 'default',
  light = 'light',
}

const Themes = () => {
  const { state: { themeValue }, dispatch } = useGlobalStore()

  const handleOnChange = (e: FormEvent<HTMLInputElement>) => {
    const val: Theme | string = e.currentTarget.value
    dispatch(actionCreator(ActionTypes.THEME_VALUE, val))
    dispatch(actionCreator(ActionTypes.THEME, themes[val as Theme]))
  }

  return (
      <RadioButtonGroup
				id="radio-button-group-component-1"
				options={options}
				value={themeValue}
				variant="inverse"
				onChange={handleOnChange}
			/>
  )
}

export default Themes
