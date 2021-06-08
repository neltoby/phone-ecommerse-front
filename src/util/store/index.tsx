import { createContext, Dispatch, useContext } from 'react';
import { Actions } from '../action';
import theme from '../../components/themes/themes'
import { Props } from '../../components/phone-card'

export type Colors = {
  backgroundColor: string,
  color: string,
  inputBackgroundColor: string,
  inputFontColor: string, 
  cardBg: string,
  cardFontColor: string,
}

export enum PageTitle {
  HOME = 'HOME',
  SEARCH_BY_PRICE = 'SEARCH_BY_PRICE',
  SEARCH_BY_STRING = 'SEARCH_BY_STRING',
  CATEGORY = 'CATEGORY',
}

export enum LoadIphoneEnum {
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
}

type IPaginator = {
  totalDoc: number,
  perPage: number,
  pageCount: number,
  currentPage: number,
  slNo: number,
  hasPrevPage: boolean,
  hasNextPage: boolean,
  prev: boolean,
  next: boolean,
}

export type generalObj = {
  [key: string] : any
}

export type IInitialState = {
  allRes: generalObj,
  currentDisplay: Props[],
  allDisplay: Props[],
  themeColor: Colors,
  themeValue: string,
  openDrawer: boolean
  page: number,
  searchInput: string,
  categoryTags: string[]
  paginator: IPaginator,
  morePages: boolean,
  pageTitle: PageTitle,
  showModal: boolean,
  loadIphoneError: LoadIphoneEnum
}

export const paginator = {
  totalDoc: 0,
  perPage: 0,
  pageCount: 0,
  currentPage: 0,
  slNo: 0,
  hasPrevPage: false,
  hasNextPage: false,
  prev: false,
  next: false,
}

export const initialState: IInitialState = {
  allRes: {},
  currentDisplay: [],
  allDisplay: [],
  openDrawer: false,
  page: 0,
  searchInput: '',
  categoryTags: [],
  themeValue: 'default',
  themeColor: theme.default,
  paginator,
  morePages: false,
  pageTitle: PageTitle.HOME,
  showModal: false,
  loadIphoneError: LoadIphoneEnum.LOADING
}

export const Store = createContext<{ state: IInitialState, dispatch: Dispatch<Actions>}>
(
  {
    state: initialState, 
    dispatch: () => undefined
  }
);
export const useGlobalStore = () => useContext(Store)

