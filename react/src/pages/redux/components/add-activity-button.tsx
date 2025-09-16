import {
	type FC,
} from "react";

import {
	Tooltip,
} from "@/components/tooltip";
import {
	type GroupId,
} from "@/features/group/types";
import {
	useIsBusy,
} from "@/hooks/use-is-busy";
import {
	getClass,
} from "@/utilities/get-class";

import {
	useApplicationDispatch,
} from "../store";
import {
	addActivity,
} from "../utilities/add-activity";

interface AddActivityButtonProps {
	groupId: GroupId;
}

const AddActivityButton: FC<AddActivityButtonProps> = (
	props,
) => {
	const {
		groupId,
	} = props;

	const dispatch = useApplicationDispatch();

	const isBusy = useIsBusy();

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
			renderTarget={(
				targetProps,
			) => {
				const {
					className,
					tooltipId,
					...otherTargetProps
				} = targetProps;

				return (
					<button
						{...otherTargetProps}
						aria-describedby={tooltipId}
						className={
							getClass([
								className,
								"control icon-button",
							])
						}
						disabled={isBusy}
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
