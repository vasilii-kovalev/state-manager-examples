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
	type ActivityId,
} from "@/features/activity/types";
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
	removeActivity,
} from "../store/page/slice";

interface RemoveActivityButtonProps {
	activityId: ActivityId;
}

const RemoveActivityButton: FC<RemoveActivityButtonProps> = ({
	activityId,
}) => {
	const dispatch = useDispatch<Dispatch>();

	const isBusy = useIsBusy();

	const handleRemoveActivity = (): void => {
		dispatch(removeActivity(activityId));
	};

	return (
		<Tooltip<HTMLButtonElement>
			renderBody={() => {
				return "Remove activity and all its worklogs";
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
						onClick={handleRemoveActivity}
						type="button"
					>
						-
					</button>
				);
			}}
			targetId={`remove-activity-button-${activityId}`}
		/>
	);
};

export {
	RemoveActivityButton,
};
