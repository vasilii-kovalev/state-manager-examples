import {
	type ParentComponent,
} from "solid-js";

const Row: ParentComponent = (
	props,
) => {
	return (
		<tr>
			{props.children}
		</tr>
	);
};

export {
	Row,
};
