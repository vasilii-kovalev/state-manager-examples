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
	type GroupId,
} from "@/features/group/types";
import {
	getClass,
} from "@/utilities/get-class";

import {
	type Dispatch,
} from "../store";
import {
	addActivity,
} from "../utilities/add-activity";

interface AddActivityButtonProps {
	groupId: GroupId;
}

const AddActivityButton: FC<AddActivityButtonProps> = ({
	groupId,
}) => {
	const dispatch = useDispatch<Dispatch>();

	const handleAddActivity = (): void => {
		dispatch(
			addActivity({
				groupId,
			}),
		);
	};

	return (
		<Tooltip<HTMLButtonElement>
			renderBody={() => {
				return "Add activity";
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
								"icon-button control",
							])
						}
						onClick={handleAddActivity}
						type="button"
					>
						+
					</button>
				);
			}}
			targetId={`add-activity-button-${groupId}`}
		/>
	);
};

export {
	AddActivityButton,
};
