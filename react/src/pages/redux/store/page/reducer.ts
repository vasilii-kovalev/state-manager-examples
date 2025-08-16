import {
	createSlice,
	type PayloadAction,
} from "@reduxjs/toolkit";

import {
	PAGE_STATE_DEFAULT,
} from "@/features/page/constants";
import {
	type PageData,
} from "@/features/page/types";
import {
	convertPageDataToPageState,
} from "@/features/page/utilities/convert-page-data-to-page-state";

const pageSlice = createSlice({
	initialState: PAGE_STATE_DEFAULT,
	name: "page",
	reducers: {
		resetState: () => {
			return PAGE_STATE_DEFAULT;
		},
		setInitialState: (
			state,
			action: PayloadAction<PageData>,
		) => {
			try {
				const pageState = convertPageDataToPageState(action.payload);

				return pageState;
			} catch (error) {
				console.error(error);

				return PAGE_STATE_DEFAULT;
			}
		},
	},
});

const pageReducer = pageSlice.reducer;
const {
	resetState,
	setInitialState,
} = pageSlice.actions;

export {
	pageReducer,
	resetState,
	setInitialState,
};
