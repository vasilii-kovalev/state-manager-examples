import { css } from "@linaria/core";

const overlay = css`
	align-items: center;
	background-color: rgb(0 0 0 / 50%);
	color: #fff;
	display: none;
	height: 100vh;
	inset: 0;
	justify-content: center;
	opacity: 0;
	position: fixed;
	transition:
		opacity 0.5s ease-in-out,
		display 0.5s ease-in-out allow-discrete;
	width: 100vw;

	@starting-style {
		opacity: 0;
	}
`;

/*
	Later than `overlay` in this file, so a visible loader replaces `display` and `opacity`.
*/
const overlayVisible = css`
	display: flex;
	opacity: 1;
`;

/*
	`overlayVisible` is present only while the loader is shown, so the page cannot scroll underneath it.
*/
const scrollLock = css`
	:global(body:has(.${overlay}.${overlayVisible})) {
		overflow: hidden;
	}
`;

export { overlay, overlayVisible, scrollLock };
