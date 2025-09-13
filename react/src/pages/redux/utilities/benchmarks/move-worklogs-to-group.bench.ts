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

	   name                                                                   hz     min     max    mean     p75     p99    p995    p999     rme  samples
	 · moveWorklogsToGroup (actions) [RTK: 2.8.2, Immer: 10.1.1]          1.0508  928.27  980.92  951.65  964.75  980.92  980.92  980.92  ±1.20%       10
	 · moveWorklogsToGroup (cloneDeep) [es-toolkit: 1.39.9]               6.2381  149.61  183.14  160.31  164.82  183.14  183.14  183.14  ±4.70%       10
	 · moveWorklogsToGroup (cloneDeep with `Map`-s) [es-toolkit: 1.39.9]  6.5966  138.79  173.68  151.59  152.59  173.68  173.68  173.68  ±4.50%       10
	 · moveWorklogsToGroup (Immer) [Immer: 10.1.1]                        1.0887  899.40  962.19  918.57  942.00  962.19  962.19  962.19  ±1.74%       10
	 · moveWorklogsToGroup (Mutative) [Mutative: 1.2.0]                   1.3202  733.98  791.31  757.44  772.14  791.31  791.31  791.31  ±1.74%       10
	 · moveWorklogsToGroup (spread)                                       2.5266  374.65  434.56  395.79  400.28  434.56  434.56  434.56  ±3.20%       10

	BENCH  Summary

	moveWorklogsToGroup (cloneDeep with `Map`-s) [es-toolkit: 1.39.9]
	  1.06x faster than moveWorklogsToGroup (cloneDeep) [es-toolkit: 1.39.9]
	  2.61x faster than moveWorklogsToGroup (spread)
	  5.00x faster than moveWorklogsToGroup (Mutative) [Mutative: 1.2.0]
	  6.06x faster than moveWorklogsToGroup (Immer) [Immer: 10.1.1]
	  6.28x faster than moveWorklogsToGroup (actions) [RTK: 2.8.2, Immer: 10.1.1]
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
