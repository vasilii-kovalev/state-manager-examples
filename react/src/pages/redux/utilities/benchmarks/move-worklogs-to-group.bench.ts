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
	moveWorklogsToGroupCloneDeepWithObjectMaps,
} from "../move-worklogs-to-group-clone-deep-with-object-maps";
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

	   name                                                                       hz     min     max    mean     p75     p99    p995    p999     rme  samples
	 · moveWorklogsToGroup (actions) [RTK: 2.8.2, Immer: 10.1.1]              1.0522  923.91  994.00  950.37  962.13  994.00  994.00  994.00  ±1.78%       10
	 · moveWorklogsToGroup (cloneDeep) [es-toolkit: 1.39.9]                   6.4286  147.65  172.38  155.56  156.06  172.38  172.38  172.38  ±3.15%       10
	 · moveWorklogsToGroup (cloneDeep with `Map`-s) [es-toolkit: 1.39.9]      604.20  1.4299  3.5165  1.6551  1.6921  3.0993  3.3246  3.5165  ±2.04%      303
	 · moveWorklogsToGroup (cloneDeep with object maps) [es-toolkit: 1.39.9]  550.46  1.4114  9.5162  1.8167  1.9033  3.9412  6.8361  9.5162  ±4.46%      276
	 · moveWorklogsToGroup (Immer) [Immer: 10.1.1]                            1.0978  871.47  943.87  910.91  922.00  943.87  943.87  943.87  ±1.77%       10
	 · moveWorklogsToGroup (Mutative) [Mutative: 1.2.0]                       1.3552  714.95  775.26  737.88  743.57  775.26  775.26  775.26  ±1.55%       10
	 · moveWorklogsToGroup (spread)                                           2.5958  374.38  403.02  385.23  390.21  403.02  403.02  403.02  ±1.70%       10
	 · moveWorklogsToGroup (structuredClone)                                  6.3988  146.63  192.16  156.28  155.44  192.16  192.16  192.16  ±5.91%       10

	BENCH  Summary

	moveWorklogsToGroup (cloneDeep with `Map`-s) [es-toolkit: 1.39.9]
	  1.10x faster than moveWorklogsToGroup (cloneDeep with object maps) [es-toolkit: 1.39.9]
	  93.99x faster than moveWorklogsToGroup (cloneDeep) [es-toolkit: 1.39.9]
	  94.42x faster than moveWorklogsToGroup (structuredClone)
	  232.76x faster than moveWorklogsToGroup (spread)
	  445.83x faster than moveWorklogsToGroup (Mutative) [Mutative: 1.2.0]
	  550.37x faster than moveWorklogsToGroup (Immer) [Immer: 10.1.1]
	  574.21x faster than moveWorklogsToGroup (actions) [RTK: 2.8.2, Immer: 10.1.1]
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
	"moveWorklogsToGroup (cloneDeep with object maps) [es-toolkit: 1.39.9]",
	() => {
		const getState = (): RootState => {
			return {
				page: pageStateWithDifferentActivityNamesForPerformance,
			};
		};

		moveWorklogsToGroupCloneDeepWithObjectMaps(targetGroupId)(
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
