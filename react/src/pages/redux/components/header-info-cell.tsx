import {
	type FC,
} from "react";

import {
	SelectGroupsCheckbox,
} from "./select-groups-checkbox";

const HeaderInfoCell: FC = () => {
	return (
		<th>
			<SelectGroupsCheckbox/>
		</th>
	);
};

export {
	HeaderInfoCell,
};
