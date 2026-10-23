import { css } from "@linaria/core";

const cell = css`
	border-style: solid;
	border-width: 1px;
	height: 1.5rem;
	min-width: 3rem;
	padding: 0.5rem;
	text-align: center;
`;

const dateCell = css`
	background-color: #f9fafb;
`;

/*
	Later than `dateCell` in this file, so a weekend cell keeps this background when both classes are present.
*/
const weekendCell = css`
	background-color: #e5e7eb;
`;

const infoColumn = css`
	min-width: 30.75rem;
	width: 30.75rem;
`;

/*
	Later than `cell` in this file, so this padding replaces the cell padding on the same element.
*/
const tightCell = css`
	padding: 0.25rem;
`;

const flushCell = css`
	padding: 0;
`;

export { cell, dateCell, flushCell, infoColumn, tightCell, weekendCell };
