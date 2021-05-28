import { createContext, Dispatch, useContext } from 'react';
import { Actions } from '../action';

export type Colors = {
  backgroundColor: string,
  color: string,
  inputBackgroundColor: string,
  inputFontColor: string, 
  cardBg: string,
  cardFontColor: string,
}

export type generalObj = {
  [key: string] : any
}

export type IInitialState = {
  allRes: generalObj,
  currentDisplay: generalObj,
  themeColor: Colors,
  openDrawer: boolean
  page: number,
  searchInput: string,
  categoryTags: string[]
}

export const initialState: IInitialState = {
  allRes: {},
  currentDisplay: {},
  openDrawer: false,
  page: 0,
  searchInput: '',
  categoryTags: ['All', 'Iphone', 'Samsung', 'Ipad', 'MacBook', 'AirPods'],
  themeColor: {
    color: '#fff',
    backgroundColor: '#14161c',
    inputBackgroundColor: '#fff',
    inputFontColor: '#000',
    cardBg: '#28334a',
    cardFontColor: '#fff',
  },
}

export const Store = createContext<{ state: IInitialState, dispatch: Dispatch<Actions>}>
(
  {
    state: initialState, 
    dispatch: () => undefined
  }
);
export const useGlobalStore = () => useContext(Store)

