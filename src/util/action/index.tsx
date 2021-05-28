export enum ActionTypes {
	CURRENT_DISPLAY = 'CURRENT_DISPLAY',
	CLOSE = 'CLOSE',
	OPEN = 'OPEN', 
	ALL_RES = 'ALL_RES',
	SEARCH_INPUT = 'SEARCH_INPUT'
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

export const GETBUY = 'GETBUY';
export const GETSELL = 'GETSELL';