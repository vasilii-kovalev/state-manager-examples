import { type PropsWithChildren, type ReactNode } from "react";

const Row = (props: PropsWithChildren): ReactNode => {
	const { children } = props;

	return <tr>{children}</tr>;
};

export { Row };
