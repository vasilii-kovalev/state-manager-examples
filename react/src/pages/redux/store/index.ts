import {
	type Action,
	configureStore,
	type ThunkAction,
} from "@reduxjs/toolkit";

import {
	pageReducer,
} from "./page/slice";

const store = configureStore({
	reducer: {
		page: pageReducer,
	},
});

type RootState = ReturnType<typeof store.getState>;

type Dispatch = typeof store.dispatch;

type Thunk<ReturnType> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action
>;

export {
	type Dispatch,
	type RootState,
	store,
	type Thunk,
};
