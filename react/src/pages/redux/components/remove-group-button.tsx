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
	type RootState,
} from "../store";
import {
	selectHasWorklogsInGroup,
} from "../store/page/selectors";
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

	const hasWorklogs = useSelector((state: RootState) => {
		return selectHasWorklogsInGroup(
			state.page,
			groupId,
		);
	});

	const isBusy = useIsBusy();

	const handleRemoveGroup = (): void => {
		dispatch(removeGroup(groupId));
	};

	return (
		<Tooltip<HTMLButtonElement>
			renderBody={() => {
				return "Remove group";
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
