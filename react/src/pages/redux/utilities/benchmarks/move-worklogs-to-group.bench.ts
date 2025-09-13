import {
	noop,
} from "es-toolkit";
import {
	bench,
} from "vitest";

import {
	pageStateWithDifferentActivityNamesForPerformance,
	targetGroupId,
} from "@/features/page/fixtures";

import {
	type RootState,
} from "../../store";
import {
	moveWorklogsToGroupActions,
} from "../move-worklogs-to-group-actions";
import {
	moveWorklogsToGroupCloneDeep,
} from "../move-worklogs-to-group-clone-deep";
import {
	moveWorklogsToGroupImmer,
} from "../move-worklogs-to-group-immer";
import {
	moveWorklogsToGroupMutative,
} from "../move-worklogs-to-group-mutative";
import {
	moveWorklogsToGroupSpread,
} from "../move-worklogs-to-group-spread";

/*
	Setup:
	* 30 groups
	* 2 activities per group
	* 22 worklogs per activity with duration of 8h
	* Activities' names are unique among all groups
	* All worklogs are selected

	Scenario:
	Move all worklogs to one of the groups.

	RUN  v3.2.4

	  name                                                           hz     min       max    mean     p75       p99      p995      p999     rme  samples
	· moveWorklogsToGroup (actions) [RTK: 2.8.2, Immer: 10.1.1]  1.0235  950.04  1,037.33  977.00  988.63  1,037.33  1,037.33  1,037.33  ±2.39%       10
	· moveWorklogsToGroup (cloneDeep) [es-toolkit: 1.39.9]       6.4000  144.63    166.41  156.25  159.99    166.41    166.41    166.41  ±2.71%       10
	· moveWorklogsToGroup (Immer) [Immer: 10.1.1]                1.1208  849.40    932.69  892.25  913.56    932.69    932.69    932.69  ±2.55%       10
	· moveWorklogsToGroup (Mutative) [Mutative: 1.2.0]           1.3997  695.43    767.76  714.46  717.61    767.76    767.76    767.76  ±2.11%       10
	· moveWorklogsToGroup (spread)                               2.6379  369.56    389.07  379.09  383.60    389.07    389.07    389.07  ±1.14%       10

	BENCH  Summary

	moveWorklogsToGroup (cloneDeep) [es-toolkit: 1.39.9]
	  2.43x faster than moveWorklogsToGroup (spread)
	  4.57x faster than moveWorklogsToGroup (Mutative) [Mutative: 1.2.0]
	  5.71x faster than moveWorklogsToGroup (Immer) [Immer: 10.1.1]
	  6.25x faster than moveWorklogsToGroup (actions) [RTK: 2.8.2, Immer: 10.1.1]
*/
bench(
	"moveWorklogsToGroup (actions) [RTK: 2.8.2, Immer: 10.1.1]",
	() => {
		const getState = (): RootState => {
			return {
				page: pageStateWithDifferentActivityNamesForPerformance,
			};
		};

		moveWorklogsToGroupActions(targetGroupId)(
			noop,
			getState,
			undefined,
		);
	},
);

bench(
	"moveWorklogsToGroup (cloneDeep) [es-toolkit: 1.39.9]",
	() => {
		const getState = (): RootState => {
			return {
				page: pageStateWithDifferentActivityNamesForPerformance,
			};
		};

		moveWorklogsToGroupCloneDeep(targetGroupId)(
			noop,
			getState,
			undefined,
		);
	},
);

bench(
	"moveWorklogsToGroup (Immer) [Immer: 10.1.1]",
	() => {
		const getState = (): RootState => {
			return {
				page: pageStateWithDifferentActivityNamesForPerformance,
			};
		};

		moveWorklogsToGroupImmer(targetGroupId)(
			noop,
			getState,
			undefined,
		);
	},
);

bench(
	"moveWorklogsToGroup (Mutative) [Mutative: 1.2.0]",
	() => {
		const getState = (): RootState => {
			return {
				page: pageStateWithDifferentActivityNamesForPerformance,
			};
		};

		moveWorklogsToGroupMutative(targetGroupId)(
			noop,
			getState,
			undefined,
		);
	},
);

bench(
	"moveWorklogsToGroup (spread)",
	() => {
		const getState = (): RootState => {
			return {
				page: pageStateWithDifferentActivityNamesForPerformance,
			};
		};

		moveWorklogsToGroupSpread(targetGroupId)(
			noop,
			getState,
			undefined,
		);
	},
);
