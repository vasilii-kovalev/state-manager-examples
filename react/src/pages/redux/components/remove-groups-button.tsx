import {
	type FC,
} from "react";

import {
	Tooltip,
} from "@/components/tooltip";
import {
	useIsBusy,
} from "@/hooks/use-is-busy";
import {
	getClass,
} from "@/utilities/get-class";

import {
	useApplicationDispatch,
	useApplicationSelector,
} from "../store";
import {
	selectHasGroups,
} from "../store/page/selectors";
import {
	removeGroups,
} from "../store/page/slice";

const RemoveGroupsButton: FC = () => {
	const dispatch = useApplicationDispatch();

	const hasGroups = useApplicationSelector((state) => {
		return selectHasGroups(state.page);
	});

	const isBusy = useIsBusy();

	const handleRemoveGroups = (): void => {
		dispatch(removeGroups());
	};

	return (
		<Tooltip<HTMLButtonElement>
			renderBody={() => {
				return "Remove all groups, their activities and worklogs";
			}}
			renderTarget={({
				className,
				tooltipId,
				...targetProps
			}) => {
				return (
					<button
						{...targetProps}
						aria-describedby={tooltipId}
						className={
							getClass([
								className,
								"control icon-button",
							])
						}
						disabled={
							!hasGroups
							|| isBusy
						}
						onClick={handleRemoveGroups}
						type="button"
					>
						-
					</button>
				);
			}}
			targetId="remove-groups-button"
		/>
	);
};

export {
	RemoveGroupsButton,
};
