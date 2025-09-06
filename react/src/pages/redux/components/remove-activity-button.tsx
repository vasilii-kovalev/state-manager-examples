import {
	type FC,
} from "react";
import {
	useDispatch,
	useSelector,
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
	type RootState,
} from "../store";
import {
	selectHasWorklogsInActivity,
} from "../store/page/selectors";
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

	const hasWorklogs = useSelector((state: RootState) => {
		return selectHasWorklogsInActivity(
			state.page,
			activityId,
		);
	});

	const isBusy = useIsBusy();

	const handleRemoveActivity = (): void => {
		dispatch(removeActivity(activityId));
	};

	return (
		<Tooltip<HTMLButtonElement>
			renderBody={() => {
				return "Remove activity";
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
							hasWorklogs
							|| isBusy
						}
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
