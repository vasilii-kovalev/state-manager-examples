import {
	createSlice,
	type PayloadAction,
} from "@reduxjs/toolkit";
import {
	parse,
} from "valibot";

import {
	type PageData,
} from "@/features/page/types";

import {
	PAGE_STATE_DEFAULT,
} from "../../constants";
import {
	PageStateSchema,
} from "../../schemas";

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
				const pageState = parse(
					PageStateSchema,
					action.payload,
				);

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
