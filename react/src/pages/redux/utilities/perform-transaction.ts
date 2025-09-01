import {
	isAction,
} from "@reduxjs/toolkit";
import {
	isFunction,
} from "es-toolkit";

import {
	type Dispatch,
	rootReducer,
	type RootState,
	type Thunk,
} from "../store";

interface PerformTransactionParams<ReturnType> {
	onFinish: Thunk<void>;
	transaction: Thunk<ReturnType>;
}

const performTransaction = <ReturnType>({
	onFinish,
	transaction,
}: PerformTransactionParams<ReturnType>): Thunk<ReturnType> => {
	return (
		dispatchOriginal,
		getStateOriginal,
	) => {
		let draftState: RootState = getStateOriginal();

		const getState = (): RootState => {
			return draftState;
		};

		const dispatch = ((
			action: unknown,
			// eslint-disable-next-line @typescript-eslint/promise-function-async
		) => {
			if (isFunction(action)) {
				return (action as Thunk<unknown>)(
					dispatch,
					getState,
					undefined,
				);
			}

			if (!isAction(action)) {
				throw new Error(
					"Transactional dispatch received an invalid action (must be a plain object with a string type).",
				);
			}

			draftState = rootReducer(
				draftState,
				action,
			);

			return action;
		}) as Dispatch;

		const result = transaction(
			dispatch,
			getState,
			undefined,
		);

		onFinish(
			dispatchOriginal,
			getState,
			undefined,
		);

		return result;
	};
};

export {
	performTransaction,
};
