import {
	bench,
} from "vitest";

import {
	pageStateWithDifferentActivityNamesForPerformance,
	targetGroupId,
} from "@/features/page/fixtures";
import {
	noop,
} from "@/utilities/noop";

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
	moveWorklogsToGroupCloneDeepWithMaps,
} from "../move-worklogs-to-group-clone-deep-with-maps";
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

	   name                                                                   hz     min       max    mean     p75       p99      p995      p999     rme  samples
	 · moveWorklogsToGroup (actions) [RTK: 2.8.2, Immer: 10.1.1]          1.0329  938.05  1,008.31  968.17  983.30  1,008.31  1,008.31  1,008.31  ±1.49%       10
	 · moveWorklogsToGroup (cloneDeep) [es-toolkit: 1.39.9]               6.2492  149.59    168.70  160.02  163.09    168.70    168.70    168.70  ±2.55%       10
	 · moveWorklogsToGroup (cloneDeep with `Map`-s) [es-toolkit: 1.39.9]  654.19  1.3848    2.8473  1.5286  1.5370    2.3258    2.8355    2.8473  ±1.31%      328
	 · moveWorklogsToGroup (Immer) [Immer: 10.1.1]                        1.1237  867.77    919.47  889.89  905.82    919.47    919.47    919.47  ±1.34%       10
	 · moveWorklogsToGroup (Mutative) [Mutative: 1.2.0]                   1.3572  711.25    775.99  736.79  744.30    775.99    775.99    775.99  ±1.68%       10
	 · moveWorklogsToGroup (spread)                                       2.5083  379.47    429.59  398.67  405.50    429.59    429.59    429.59  ±2.88%       10

	BENCH  Summary

	moveWorklogsToGroup (cloneDeep with `Map`-s) [es-toolkit: 1.39.9]
	  104.68x faster than moveWorklogsToGroup (cloneDeep) [es-toolkit: 1.39.9]
	  260.81x faster than moveWorklogsToGroup (spread)
	  482.00x faster than moveWorklogsToGroup (Mutative) [Mutative: 1.2.0]
	  582.16x faster than moveWorklogsToGroup (Immer) [Immer: 10.1.1]
	  633.37x faster than moveWorklogsToGroup (actions) [RTK: 2.8.2, Immer: 10.1.1]
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
	"moveWorklogsToGroup (cloneDeep with `Map`-s) [es-toolkit: 1.39.9]",
	() => {
		const getState = (): RootState => {
			return {
				page: pageStateWithDifferentActivityNamesForPerformance,
			};
		};

		moveWorklogsToGroupCloneDeepWithMaps(targetGroupId)(
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
