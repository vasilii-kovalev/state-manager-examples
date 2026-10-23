import { type JSX, Show } from "solid-js";

import { type GroupId } from "packages/shared/src/features/group/types";
import { buildClass } from "packages/shared/src/utilities/build-class";

import { Tooltip } from "../../../components/tooltip";
import { useIsBusy } from "../../../hooks/use-is-busy";
import { control, iconButton } from "../../../styles/control.css";
import { selectHasSelectedWorklogs } from "../signals/page/derived";
import { moveWorklogsToGroup } from "../utilities/move-worklogs-to-group";

interface MoveWorklogsToGroupButtonProps {
	groupId: GroupId;
}

const MoveWorklogsToGroupButton = (props: MoveWorklogsToGroupButtonProps): JSX.Element => {
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
							class={buildClass(targetProps.class, control, iconButton)}
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
