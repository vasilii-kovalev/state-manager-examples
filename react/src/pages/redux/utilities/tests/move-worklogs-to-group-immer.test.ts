import {
	expect,
	test,
	vi,
} from "vitest";

import {
	expectedPageStateWithDifferentActivityNames,
	getExpectedPageState,
	initialPageStateWithDifferentActivityNames,
	initialPageStateWithSameActivityNames,
	targetGroupId,
} from "@/features/page/fixtures";
import {
	type Dispatch,
	type RootState,
} from "@/pages/redux/store";
import {
	type updateStateFromTransaction,
} from "@/pages/redux/store/page/slice";

import {
	moveWorklogsToGroupImmer,
} from "../move-worklogs-to-group-immer";

type ActionType = ReturnType<typeof updateStateFromTransaction>;

test(
	"moves worklogs from activities with different names among all groups",
	() => {
		const initialState = initialPageStateWithDifferentActivityNames;
		const dispatch = vi.fn<(action: ActionType) => void>();

		const getState = (): RootState => {
			return {
				page: initialState,
			};
		};

		moveWorklogsToGroupImmer(targetGroupId)(
			dispatch as unknown as Dispatch,
			getState,
			undefined,
		);

		const action = dispatch.mock.lastCall?.at(0);

		expect(action).toBeDefined();

		// `undefined` case checked above.
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const expectedPageState = getExpectedPageState(action!.payload);

		expect(expectedPageState).toMatchSnapshot("expected");

		expect(expectedPageStateWithDifferentActivityNames).toMatchSnapshot("initial");
	},
);

test(
	"moves worklogs from activities with different names within groups",
	() => {
		const initialState = initialPageStateWithSameActivityNames;
		const dispatch = vi.fn<(action: ActionType) => void>();

		const getState = (): RootState => {
			return {
				page: initialState,
			};
		};

		moveWorklogsToGroupImmer(targetGroupId)(
			dispatch as unknown as Dispatch,
			getState,
			undefined,
		);

		const action = dispatch.mock.lastCall?.at(0);

		expect(action).toBeDefined();

		// `undefined` case checked above.
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const expectedPageState = getExpectedPageState(action!.payload);

		expect(getExpectedPageState(initialState)).toMatchSnapshot("initial");

		expect(expectedPageState).toMatchSnapshot("expected");
	},
);
