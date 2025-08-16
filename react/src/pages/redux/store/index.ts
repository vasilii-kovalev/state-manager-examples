import {
	configureStore,
} from "@reduxjs/toolkit";

import {
	pageReducer,
} from "./page/reducer";

const store = configureStore({
	reducer: {
		page: pageReducer,
	},
});

type RootState = ReturnType<typeof store.getState>;

type Dispatch = typeof store.dispatch;

export {
	type Dispatch,
	type RootState,
	store,
};
