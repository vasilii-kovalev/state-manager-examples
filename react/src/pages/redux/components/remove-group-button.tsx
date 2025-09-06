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
	useIsBusy,
} from "@/hooks/use-is-busy";
import {
	getClass,
} from "@/utilities/get-class";

import {
	type Dispatch,
} from "../store";
import {
	removeGroup,
} from "../store/page/slice";

interface RemoveGroupButtonProps {
	groupId: GroupId;
}

const RemoveGroupButton: FC<RemoveGroupButtonProps> = ({
	groupId,
}) => {
	const dispatch = useDispatch<Dispatch>();

	const isBusy = useIsBusy();

	const handleRemoveGroup = (): void => {
		dispatch(removeGroup(groupId));
	};

	return (
		<Tooltip<HTMLButtonElement>
			renderBody={() => {
				return "Remove group, its activities and worklogs";
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
						onClick={handleRemoveGroup}
						type="button"
					>
						-
					</button>
				);
			}}
			targetId={`remove-group-button-${groupId}`}
		/>
	);
};

export {
	RemoveGroupButton,
};
