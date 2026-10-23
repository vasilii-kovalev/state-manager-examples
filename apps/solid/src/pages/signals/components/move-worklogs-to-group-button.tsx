import { type Component, Show } from "solid-js";

import { type GroupId } from "packages/shared/src/features/group/types";
import { getClass } from "packages/shared/src/utilities/get-class";

import { Tooltip } from "../../../components/tooltip";
import { useIsBusy } from "../../../hooks/use-is-busy";
import { control, iconButton } from "../../../styles/control.css";
import { selectHasSelectedWorklogs } from "../signals/page/derived";
import { moveWorklogsToGroup } from "../utilities/move-worklogs-to-group";

interface MoveWorklogsToGroupButtonProps {
	groupId: GroupId;
}

const MoveWorklogsToGroupButton: Component<MoveWorklogsToGroupButtonProps> = (props) => {
	const isBusy = useIsBusy();

	const handleMoveWorklogsToGroup = (): void => {
		moveWorklogsToGroup(props.groupId);
	};

	return (
		<Show fallback={null} when={selectHasSelectedWorklogs()}>
			<Tooltip<HTMLButtonElement>
				renderBody={() => {
					return "Move worklogs to group";
				}}
				renderTarget={(targetProps) => {
					return (
						<button
							{...targetProps}
							aria-describedby={targetProps.popoverTarget}
							class={getClass([targetProps.class, control, iconButton])}
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

export { MoveWorklogsToGroupButton };
