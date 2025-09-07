import {
	type Action,
	combineReducers,
	configureStore,
	type ThunkAction,
} from "@reduxjs/toolkit";
import {
	useDispatch,
	type UseSelector,
	useSelector,
} from "react-redux";

import {
	pageReducer,
} from "./page/slice";

const rootReducer = combineReducers({
	page: pageReducer,
});

const store = configureStore({
	reducer: rootReducer,
});

type RootState = ReturnType<typeof store.getState>;

type Dispatch = typeof store.dispatch;

type Thunk<ReturnType> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action
>;

const useApplicationDispatch = useDispatch<Dispatch>;
const useApplicationSelector = useSelector as UseSelector<RootState>;

export {
	type Dispatch,
	rootReducer,
	type RootState,
	store,
	type Thunk,
	useApplicationDispatch,
	useApplicationSelector,
};
