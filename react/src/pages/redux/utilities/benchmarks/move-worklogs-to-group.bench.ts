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
import {
	moveWorklogsToGroupStructuredClone,
} from "../move-worklogs-to-group-structured-clone";

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
	 · moveWorklogsToGroup (actions) [RTK: 2.8.2, Immer: 10.1.1]          1.0339  932.29  1,013.70  967.21  973.47  1,013.70  1,013.70  1,013.70  ±1.73%       10
	 · moveWorklogsToGroup (cloneDeep) [es-toolkit: 1.39.9]               6.6628  142.41    157.46  150.09  157.21    157.46    157.46    157.46  ±2.87%       10
	 · moveWorklogsToGroup (cloneDeep with `Map`-s) [es-toolkit: 1.39.9]  641.11  1.4364    2.8220  1.5598  1.5607    2.2860    2.5256    2.8220  ±1.16%      321
	 · moveWorklogsToGroup (Immer) [Immer: 10.1.1]                        1.1449  855.39    913.91  873.42  874.19    913.91    913.91    913.91  ±1.67%       10
	 · moveWorklogsToGroup (Mutative) [Mutative: 1.2.0]                   1.4081  691.72    723.36  710.17  721.12    723.36    723.36    723.36  ±1.07%       10
	 · moveWorklogsToGroup (spread)                                       2.5266  382.35    409.55  395.78  402.53    409.55    409.55    409.55  ±1.71%       10
	 · moveWorklogsToGroup (structuredClone)                              6.2333  149.85    175.30  160.43  163.53    175.30    175.30    175.30  ±3.80%       10

	BENCH  Summary

	moveWorklogsToGroup (cloneDeep with `Map`-s) [es-toolkit: 1.39.9]
	  96.22x faster than moveWorklogsToGroup (cloneDeep) [es-toolkit: 1.39.9]
	  102.85x faster than moveWorklogsToGroup (structuredClone)
	  253.74x faster than moveWorklogsToGroup (spread)
	  455.29x faster than moveWorklogsToGroup (Mutative) [Mutative: 1.2.0]
	  559.95x faster than moveWorklogsToGroup (Immer) [Immer: 10.1.1]
	  620.08x faster than moveWorklogsToGroup (actions) [RTK: 2.8.2, Immer: 10.1.1]
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

bench(
	"moveWorklogsToGroup (structuredClone)",
	() => {
		const getState = (): RootState => {
			return {
				page: pageStateWithDifferentActivityNamesForPerformance,
			};
		};

		moveWorklogsToGroupStructuredClone(targetGroupId)(
			noop,
			getState,
			undefined,
		);
	},
);
