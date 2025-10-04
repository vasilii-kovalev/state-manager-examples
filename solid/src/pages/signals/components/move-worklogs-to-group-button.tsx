import {
	type Component,
	Show,
} from "solid-js";

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
	selectHasSelectedWorklogs,
} from "../signals/page/derived";
import {
	moveWorklogsToGroup,
} from "../utilities/move-worklogs-to-group";

interface MoveWorklogsToGroupButtonProps {
	groupId: GroupId;
}

const MoveWorklogsToGroupButton: Component<MoveWorklogsToGroupButtonProps> = (
	props,
) => {
	const isBusy = useIsBusy();

	const handleMoveWorklogsToGroup = (): void => {
		moveWorklogsToGroup(props.groupId);
	};

	return (
		<Show
			fallback={null}
			when={selectHasSelectedWorklogs()}
		>
			<Tooltip<HTMLButtonElement>
				renderBody={() => {
					return "Move worklogs to group";
				}}
				renderTarget={(
					targetProps,
				) => {
					return (
						<button
							{...targetProps}
							aria-describedby={targetProps.popoverTarget}
							class={
								getClass([
									targetProps.class,
									"control icon-button",
								])
							}
							disabled={isBusy()}
							onClick={handleMoveWorklogsToGroup}
							type="button"
						>
							←
						</button>
					);
				}}
				targetId={`move-worklogs-to-group-button-${props.groupId}`}
			/>
		</Show>
	);
};

export {
	MoveWorklogsToGroupButton,
};
