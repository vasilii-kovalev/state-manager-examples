# State manager examples (React)

## Examples

- [Redux](./src/pages/redux)

## Tests

Moving worklogs to a group is one of the most expensive batch operations. It not only moves worklogs, but also creates new activities if necessary, and checks if an activity/worklog exists in the target group/activity (respectively) on *each* iteration.

There are multiple variants of the function [moveWorklogsToGroup](./src/pages/redux/utilities/move-worklogs-to-group.ts). They are necessary to check how different approaches and tools affect performance. Each variant contains a comment in its source code about its implementation details, to make it easier to understand how they differ.

[Tests](./src/pages/redux/utilities/tests) for these variants are necessary to make sure the functionality works correctly regardless of implementation details. `test:watch` script (can be found in [package.json](./package.json) `scripts`) runs the tests.

[Benchmarks file](./src/pages/redux/utilities/benchmarks/move-worklogs-to-group.bench.ts) contains performance tests for each variant. `test:bench:run` script (can be found in [package.json](./package.json) `scripts`) runs the benchmarks.
