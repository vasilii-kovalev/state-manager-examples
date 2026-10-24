import { expect, test, vi } from "vitest";

import {
	expectedPageStateWithDifferentActivityNames,
	getExpectedPageState,
	initialPageStateWithDifferentActivityNames,
	initialPageStateWithSameActivityNames,
	targetGroupId,
} from "packages/shared/src/features/page/fixtures";

import { type Dispatch, type RootState } from "../../store";
import { type updateStateFromTransaction } from "../../store/page/slice";
import { moveWorklogsToGroupCloneDeepWithMaps } from "../move-worklogs-to-group-clone-deep-with-maps";

type ActionType = ReturnType<typeof updateStateFromTransaction>;

test("moves worklogs from activities with different names among all groups", () => {
	const initialState = initialPageStateWithDifferentActivityNames;
	const dispatch = vi.fn<(action: ActionType) => void>();

	const getState = (): RootState => {
		return {
			page: initialState,
		};
	};

	moveWorklogsToGroupCloneDeepWithMaps(targetGroupId)(dispatch as unknown as Dispatch, getState);

	const action = dispatch.mock.lastCall?.at(0);

	expect.assert.isDefined(action);

	const expectedPageState = getExpectedPageState(action.payload);

	expect(expectedPageState).toMatchSnapshot("expected");

	expect(expectedPageStateWithDifferentActivityNames).toMatchSnapshot("initial");
});

test("moves worklogs from activities with different names within groups", () => {
	const initialState = initialPageStateWithSameActivityNames;
	const dispatch = vi.fn<(action: ActionType) => void>();

	const getState = (): RootState => {
		return {
			page: initialState,
		};
	};

	moveWorklogsToGroupCloneDeepWithMaps(targetGroupId)(dispatch as unknown as Dispatch, getState);

	const action = dispatch.mock.lastCall?.at(0);

	expect.assert.isDefined(action);

	const expectedPageState = getExpectedPageState(action.payload);

	expect(getExpectedPageState(initialState)).toMatchSnapshot("initial");

	expect(expectedPageState).toMatchSnapshot("expected");
});
