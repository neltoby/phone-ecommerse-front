import { ActionTypes } from '../action';
import { IInitialState, paginator } from '../store';

// eslint-disable-next-line import/no-anonymous-default-export
export default (state: IInitialState, action: { type: string, payload?: any}): IInitialState => {
  const { type, payload } = action
  switch(type){
    case ActionTypes.CURRENT_DISPLAY:
      return {
        ...state,
        currentDisplay: [...payload]
      }
    case ActionTypes.HOME_CURRENT_DISPLAY:
      return {
        ...state,
        currentDisplay: [...state.currentDisplay, ...payload]
      }
    case ActionTypes.CLOSE:
      return {
        ...state, 
        openDrawer: false
      }
    case ActionTypes.OPEN:
      return {
        ...state, 
        openDrawer: true
      }
    case ActionTypes.ALL_RES:
      return {
        ...state,
        allRes: [...payload]
      }
    case ActionTypes.HOME_ALL_RES:
      return {
        ...state,
        allRes: [...state.currentDisplay, ...payload]
      }
    case ActionTypes.PAGE: 
      if(state.paginator.currentPage > 0 && state.paginator.hasNextPage) {
        return{
          ...state,
          page: state.paginator.currentPage,
          morePages: true
        }
      }else return state
    case ActionTypes.RESET_PAGE: 
      return {
        ...state,
        page: 0,
        paginator: paginator,
      }

    case ActionTypes.UPDATE_PAGE:
      return {
        ...state,
        page: state.page + 1,
      }
    case ActionTypes.SEARCH_INPUT: 
      return {
        ...state,
        searchInput: payload
      }
    case ActionTypes.THEME:
      return {
        ...state,
        themeColor: payload
      }
    case ActionTypes.THEME_VALUE:
      return {
        ...state,
        themeValue: payload
      }
    case ActionTypes.PAGE_TITLE:
      return {
        ...state,
        pageTitle: payload
      }
    case ActionTypes.CATEGORY_TAGS:
      return {
        ...state,
        categoryTags: payload
      }
    case ActionTypes.RESET_ALL_RES:
      return {
        ...state,
        allRes: []
      }
    case ActionTypes.PAGINATOR: 
      return {
        ...state,
        paginator: payload,
      }
    case ActionTypes.RESET_CURRENT_DISPLAY:
      return {
        ...state,
        currentDisplay: []
      }
    case ActionTypes.LOADING_MORE_PAGE:
      return {
        ...state,
        morePages: true
      }
    case ActionTypes.STOP_LOADING_MORE_PAGE:
      return {
        ...state,
        morePages: false
      }
    case ActionTypes.FILTER_ALL_RES:
      let [min, max] = payload;
      min = parseInt(min);
      max= parseInt(max);
      const newArr = state.allRes.filter((item: any) => {
        const price = parseInt(item.price.slice(1));
        return (price >= min && price <= max)
      })
      return {
        ...state,
        currentDisplay: newArr
      }
    case ActionTypes.SHOW_MODAL: 
      return {
        ...state,
        showModal: true
      }
    case ActionTypes.CLOSE_MODAL: 
      return {
        ...state,
        showModal: false
      }
      case ActionTypes.LOAD_IPHONE_ERROR: 
      return {
        ...state,
        loadIphoneError: payload
      }
    default:
      return state
  }
}