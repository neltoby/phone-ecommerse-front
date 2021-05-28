import { ActionTypes } from '../action';
import { IInitialState } from '../store';

// eslint-disable-next-line import/no-anonymous-default-export
export default (state: IInitialState, action: { type: string, payload?: any}): IInitialState => {
  const { type, payload } = action
  switch(type){
    case ActionTypes.CURRENT_DISPLAY:
      return {
        ...state,
        currentDisplay: {...payload}
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
        allRes: payload
      }
    case ActionTypes.SEARCH_INPUT: 
    return {
      ...state,
      searchInput: payload
    }
    default:
      return state
  }
}