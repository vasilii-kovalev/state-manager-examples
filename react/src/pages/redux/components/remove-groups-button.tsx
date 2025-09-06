import {
	type FC,
} from "react";
import {
	useDispatch,
} from "react-redux";

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
	type Dispatch,
} from "../store";
import {
	removeGroups,
} from "../store/page/slice";

const RemoveGroupsButton: FC = () => {
	const dispatch = useDispatch<Dispatch>();

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
						disabled={isBusy}
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
