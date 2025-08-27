import {
	type FC,
	Fragment,
} from "react";
import {
	useSelector,
} from "react-redux";

import {
	type RootState,
} from "../store";
import {
	selectGroups,
} from "../store/page/selectors";
import {
	GroupRow,
} from "./group-row";

const GroupRows: FC = () => {
	const groups = useSelector((state: RootState) => {
		return selectGroups(state.page);
	});

	return (
		<Fragment>
			{
				groups.map((group) => {
					return (
						<GroupRow
							group={group}
							key={group.id}
						/>
					);
				})
			}
		</Fragment>
	);
};

export {
	GroupRows,
};
