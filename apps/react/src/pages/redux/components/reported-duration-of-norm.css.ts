import { css } from "@linaria/core";

const reportedDuration = css`
	display: inline-flex;
	flex-shrink: 0;
	padding-block: 0.25rem;
`;

const reportedValue = css`
	overflow: hidden;
	text-align: end;
	text-overflow: ellipsis;
	white-space: nowrap;
	width: 3.5rem;
`;

const normValue = css`
	overflow: hidden;
	text-align: start;
	text-overflow: ellipsis;
	white-space: nowrap;
	width: 3.5rem;
`;

export { normValue, reportedDuration, reportedValue };
