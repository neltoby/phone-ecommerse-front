export enum ActionTypes {
	CURRENT_DISPLAY = 'CURRENT_DISPLAY',
	HOME_CURRENT_DISPLAY = 'HOME_CURRENT_DISPLAY',
	CLOSE = 'CLOSE',
	OPEN = 'OPEN', 
	ALL_RES = 'ALL_RES',
	HOME_ALL_RES = 'HOME_ALL_RES',
	SEARCH_INPUT = 'SEARCH_INPUT',
	THEME = 'THEME',
	RESET_ALL_RES = 'RESET_ALL_RES',
	RESET_CURRENT_DISPLAY = 'RESET_CURRENT_DISPLAY',
	THEME_VALUE = 'THEME_VALUE',
	CATEGORY_TAGS = 'CATEGORY_TAGS',
	FILTER_ALL_RES = 'FILTER_ALL_RES',
	PAGINATOR = 'PAGINATOR',
	LOADING_MORE_PAGE = 'LOADING_MORE_PAGE',
	STOP_LOADING_MORE_PAGE = 'STOP_LOADING_MORE_PAGE',
	PAGE_TITLE = 'PAGE_TITLE',
	PAGE = 'PAGE',
	RESET_PAGE = 'RESET_PAGE',
	UPDATE_PAGE = 'UPDATE_PAGE',
	SHOW_MODAL = 'SHOW_MODAL',
	CLOSE_MODAL = 'CLOSE_MODAL',
	LOAD_IPHONE_ERROR = 'LOAD_IPHONE_ERROR',
}

export type Actions = {
	type: string,
	payload?: any
}

export const actionCreator = (type: string, payload?: any ): Actions => {
	return payload === undefined
		? {
				type,
		  }
		: {
				type,
				payload,
		  };
};

// export const GETBUY = 'GETBUY';
// export const GETSELL = 'GETSELL';