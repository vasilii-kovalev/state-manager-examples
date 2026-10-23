import { css } from "@linaria/core";

const header = css`
	align-items: center;
	background-color: #fff;
	border-block-end-style: solid;
	border-block-end-width: 1px;
	column-gap: 1rem;
	display: flex;
	inset-block-start: 0;
	inset-inline: 0;
	padding: 1rem;
	position: fixed;
`;

const content = css`
	margin-block-start: 3.25rem;
	padding: 1rem;
`;

export { content, header };
