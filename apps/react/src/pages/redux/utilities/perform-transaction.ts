import { isAction } from "@reduxjs/toolkit";

import { isFunction } from "packages/shared/src/utilities/is-function";

import { type Dispatch, rootReducer, type RootState, type Thunk } from "../store";

interface PerformTransactionParams<ReturnType> {
	onFinish: Thunk<void>;
	transaction: Thunk<ReturnType>;
}

const performTransaction = <ReturnType>({
	onFinish,
	transaction,
}: PerformTransactionParams<ReturnType>): Thunk<ReturnType> => {
	return (dispatchOriginal, getStateOriginal) => {
		let draftState: RootState = getStateOriginal();

		const getState = (): RootState => {
			return draftState;
		};

		// The wrapper applies thunks and plain actions to a draft. Callers use it as the store dispatch.
		// oxlint-disable-next-line typescript/no-unsafe-type-assertion
		const dispatch = ((action: unknown) => {
			if (isFunction(action)) {
				return (action as Thunk<unknown>)(dispatch, getState);
			}

			if (!isAction(action)) {
				throw new Error(
					"Transactional dispatch received an invalid action (must be a plain object with a string type).",
				);
			}

			draftState = rootReducer(draftState, action);

			return action;
		}) as Dispatch;

		const result = transaction(dispatch, getState);

		onFinish(dispatchOriginal, getState);

		return result;
	};
};

export { performTransaction };
