import { css } from "@linaria/core";

const control = css`
	border-radius: 2px;
	border-style: solid;
	border-width: 1px;
	box-sizing: border-box;
	flex-shrink: 0;
	font-size: 1rem;
	min-height: 1.5rem;
	min-width: 1.5rem;
	padding: 0.5rem;
`;

const iconButton = css`
	aspect-ratio: 1 / 1;
	width: 2.25rem;
`;

/*
	Later than `control` in this file, so the tighter padding replaces the control padding on the same element.
*/
const iconButtonCompact = css`
	padding: 0.25rem;
`;

/*
	Later than `control` in this file, so the removed border replaces the control border on the same element.
*/
const borderlessControl = css`
	border-width: 0;
`;

export { borderlessControl, control, iconButton, iconButtonCompact };
