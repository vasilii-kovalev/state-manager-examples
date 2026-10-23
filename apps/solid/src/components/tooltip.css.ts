import { css } from "@linaria/core";

const tooltipTarget = css`
	anchor-name: var(--anchor-name);
`;

const tooltip = css`
	border-style: solid;
	border-width: 1px;
	margin-block: 0.25rem;
	margin-inline: 0;
	max-width: 16rem;
	padding: 0.5rem;
	position-anchor: var(--anchor-name);
	position-area: block-start;
	position-try-fallbacks:
		flip-block,
		block-start span-inline-end,
		block-end span-inline-end,
		block-start span-inline-start,
		block-end span-inline-start;
	position-try-order: most-width;
`;

export { tooltip, tooltipTarget };
