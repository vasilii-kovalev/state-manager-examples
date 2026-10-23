import { test } from "vitest";

import {
	pageStateWithDifferentActivityNamesForPerformance,
	targetGroupId,
} from "packages/shared/src/features/page/fixtures";
import { noop } from "packages/shared/src/utilities/noop";

import { type RootState } from "../../store";
import { moveWorklogsToGroupActions } from "../move-worklogs-to-group-actions";
import { moveWorklogsToGroupCloneDeep } from "../move-worklogs-to-group-clone-deep";
import { moveWorklogsToGroupCloneDeepWithMaps } from "../move-worklogs-to-group-clone-deep-with-maps";
import { moveWorklogsToGroupCloneDeepWithObjectMaps } from "../move-worklogs-to-group-clone-deep-with-object-maps";
import { moveWorklogsToGroupImmer } from "../move-worklogs-to-group-immer";
import { moveWorklogsToGroupMutative } from "../move-worklogs-to-group-mutative";
import { moveWorklogsToGroupSpread } from "../move-worklogs-to-group-spread";
import { moveWorklogsToGroupStructuredClone } from "../move-worklogs-to-group-structured-clone";

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

	RUN  v5.0.5

  name                                                                       hz     min       max    mean     p75       p99      p995      p999      rme  samples
  moveWorklogsToGroup (cloneDeep with object maps) [es-toolkit: 1.47.0]  493.56  1.8625   12.9656  2.0671  2.0963    2.7409    3.9639   10.2783   ±2.54%      484   fastest
  moveWorklogsToGroup (cloneDeep with `Map`-s) [es-toolkit: 1.47.0]      449.62  1.9957    7.1247  2.2571  2.3200    3.1969    4.3698    6.7294   ±1.58%      444
  moveWorklogsToGroup (cloneDeep) [es-toolkit: 1.47.0]                   7.0229  137.13    155.57  142.47  144.98    150.79    153.18    155.09   ±0.60%       64
  moveWorklogsToGroup (structuredClone)                                  6.9164  137.93    154.70  144.70  148.16    153.40    154.05    154.57   ±0.71%       64
  moveWorklogsToGroup (spread)                                           2.8361  342.57    371.70  352.69  355.99    368.55    370.13    371.39   ±0.40%       64
  moveWorklogsToGroup (actions) [RTK: 2.12.0, Immer: 11.1.4]             2.0506  475.09    531.88  487.80  491.23    514.43    523.16    530.14   ±0.43%       64
  moveWorklogsToGroup (Mutative) [Mutative: 1.3.0]                       1.5677  628.89    646.68  637.92  640.94    646.17    646.42    646.63   ±0.18%       64
  moveWorklogsToGroup (Immer) [Immer: 11.1.4]                            1.1377  837.92  4,160.71  933.24  867.39  2,958.62  3,559.67  4,040.50  ±11.93%       64   slowest
*/

/*
	Vitest stops a benchmark test after 60 seconds unless the test sets its own timeout.
	Each task keeps running until it has 64 samples and 1 second of measurements, after 16 warmup iterations.
	This comparison took about 215 seconds with those defaults, so the limit is 300 seconds.
*/
const TIMEOUT_MS = 300_000;

test(
	"move worklogs to one group",
	async ({ bench }) => {
		await bench.compare(
			bench("moveWorklogsToGroup (actions) [RTK: 2.12.0, Immer: 11.1.4]", () => {
				moveWorklogsToGroupActions(targetGroupId)(noop, getState);
			}),
			bench("moveWorklogsToGroup (cloneDeep) [es-toolkit: 1.47.0]", () => {
				moveWorklogsToGroupCloneDeep(targetGroupId)(noop, getState);
			}),
			bench("moveWorklogsToGroup (cloneDeep with `Map`-s) [es-toolkit: 1.47.0]", () => {
				moveWorklogsToGroupCloneDeepWithMaps(targetGroupId)(noop, getState);
			}),
			bench("moveWorklogsToGroup (cloneDeep with object maps) [es-toolkit: 1.47.0]", () => {
				moveWorklogsToGroupCloneDeepWithObjectMaps(targetGroupId)(noop, getState);
			}),
			bench("moveWorklogsToGroup (Immer) [Immer: 11.1.4]", () => {
				moveWorklogsToGroupImmer(targetGroupId)(noop, getState);
			}),
			bench("moveWorklogsToGroup (Mutative) [Mutative: 1.3.0]", () => {
				moveWorklogsToGroupMutative(targetGroupId)(noop, getState);
			}),
			bench("moveWorklogsToGroup (spread)", () => {
				moveWorklogsToGroupSpread(targetGroupId)(noop, getState);
			}),
			bench("moveWorklogsToGroup (structuredClone)", () => {
				moveWorklogsToGroupStructuredClone(targetGroupId)(noop, getState);
			}),
		);
	},
	TIMEOUT_MS,
);
