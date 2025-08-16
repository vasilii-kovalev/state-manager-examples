import {
	type FC,
	type PropsWithChildren,
} from "react";

const Row: FC<PropsWithChildren> = ({
	children,
}) => {
	return (
		<tr>
			{children}
		</tr>
	);
};

export {
	Row,
};
