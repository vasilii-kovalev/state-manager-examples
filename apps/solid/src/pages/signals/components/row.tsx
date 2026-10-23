import { type JSX, type ParentProps } from "solid-js";

const Row = (props: ParentProps): JSX.Element => {
	return <tr>{props.children}</tr>;
};

export { Row };
