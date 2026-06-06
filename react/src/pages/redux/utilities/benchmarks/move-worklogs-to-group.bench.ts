import {
	bench,
} from "vitest";

import {
	pageStateWithDifferentActivityNamesForPerformance,
	targetGroupId,
} from "@/features/page/fixtures";
import {
	type RootState,
} from "@/pages/redux/store";
import {
	noop,
} from "@/utilities/noop";

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

const getState = (): RootState => {
	return {
		page: pageStateWithDifferentActivityNamesForPerformance,
	};
};

/*
	Setup:
	* 30 groups
	* 2 activities per group
	* 22 worklogs per activity with duration of 8h
	* Activities' names are unique among all groups
	* All worklogs are selected

	Scenario:
	Move all worklogs to one of the groups.

	RUN  v4.1.0

	   name                                                                       hz     min     max    mean     p75     p99    p995    p999     rme  samples
   · moveWorklogsToGroup (actions) [RTK: 2.12.0, Immer: 11.1.4]             2.0536  479.78  496.88  486.94  489.00  496.88  496.88  496.88  ±0.74%       10
   · moveWorklogsToGroup (cloneDeep) [es-toolkit: 1.47.0]                   6.7826  143.55  159.37  147.44  148.77  159.37  159.37  159.37  ±2.40%       10
   · moveWorklogsToGroup (cloneDeep with `Map`-s) [es-toolkit: 1.47.0]      459.56  2.0095  5.6456  2.1760  2.1763  3.0445  3.2149  5.6456  ±1.76%      230
   · moveWorklogsToGroup (cloneDeep with object maps) [es-toolkit: 1.47.0]  435.18  2.0221  7.3201  2.2979  2.2918  4.7754  5.0761  7.3201  ±2.99%      218
   · moveWorklogsToGroup (Immer) [Immer: 11.1.4]                            1.1032  897.75  916.47  906.49  911.28  916.47  916.47  916.47  ±0.51%       10
   · moveWorklogsToGroup (Mutative) [Mutative: 1.3.0]                       1.4644  673.51  708.22  682.87  683.74  708.22  708.22  708.22  ±1.00%       10
   · moveWorklogsToGroup (spread)                                           2.7228  357.93  371.50  367.27  370.35  371.50  371.50  371.50  ±0.80%       10
   · moveWorklogsToGroup (structuredClone)                                  6.8568  143.52  149.46  145.84  146.62  149.46  149.46  149.46  ±0.91%       10

	BENCH  Summary

	moveWorklogsToGroup (cloneDeep with `Map`-s) [es-toolkit: 1.47.0]
    1.06x faster than moveWorklogsToGroup (cloneDeep with object maps) [es-toolkit: 1.47.0]
    67.02x faster than moveWorklogsToGroup (structuredClone)
    67.76x faster than moveWorklogsToGroup (cloneDeep) [es-toolkit: 1.47.0]
    168.79x faster than moveWorklogsToGroup (spread)
    223.78x faster than moveWorklogsToGroup (actions) [RTK: 2.12.0, Immer: 11.1.4]
    313.82x faster than moveWorklogsToGroup (Mutative) [Mutative: 1.3.0]
    416.59x faster than moveWorklogsToGroup (Immer) [Immer: 11.1.4]
*/
bench(
	"moveWorklogsToGroup (actions) [RTK: 2.12.0, Immer: 11.1.4]",
	() => {
		moveWorklogsToGroupActions(targetGroupId)(
			noop,
			getState,
		);
	},
);

bench(
	"moveWorklogsToGroup (cloneDeep) [es-toolkit: 1.47.0]",
	() => {
		moveWorklogsToGroupCloneDeep(targetGroupId)(
			noop,
			getState,
		);
	},
);

bench(
	"moveWorklogsToGroup (cloneDeep with `Map`-s) [es-toolkit: 1.47.0]",
	() => {
		moveWorklogsToGroupCloneDeepWithMaps(targetGroupId)(
			noop,
			getState,
		);
	},
);

bench(
	"moveWorklogsToGroup (cloneDeep with object maps) [es-toolkit: 1.47.0]",
	() => {
		moveWorklogsToGroupCloneDeepWithObjectMaps(targetGroupId)(
			noop,
			getState,
		);
	},
);

bench(
	"moveWorklogsToGroup (Immer) [Immer: 11.1.4]",
	() => {
		moveWorklogsToGroupImmer(targetGroupId)(
			noop,
			getState,
		);
	},
);

bench(
	"moveWorklogsToGroup (Mutative) [Mutative: 1.3.0]",
	() => {
		moveWorklogsToGroupMutative(targetGroupId)(
			noop,
			getState,
		);
	},
);

bench(
	"moveWorklogsToGroup (spread)",
	() => {
		moveWorklogsToGroupSpread(targetGroupId)(
			noop,
			getState,
		);
	},
);

bench(
	"moveWorklogsToGroup (structuredClone)",
	() => {
		moveWorklogsToGroupStructuredClone(targetGroupId)(
			noop,
			getState,
		);
	},
);
