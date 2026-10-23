import { createEffect, createSignal, type JSX } from "solid-js";

import { GroupNameSchema } from "packages/shared/src/features/group/schemas";
import { type GroupId, type GroupName } from "packages/shared/src/features/group/types";

import { FlexRow } from "../../../components/flex-row";
import { updateGroupName } from "../utilities/update-group-name";
import { DuplicatedGroupNameIcon } from "./duplicated-group-name-icon";
import { groupNameField, groupNameRow } from "./group-name-input.css";
import { NameInput } from "./name-input";

interface GroupNameInputProps {
	id: GroupId;
	name: GroupName;
}

const GroupNameInput = (props: GroupNameInputProps): JSX.Element => {
	const [nameLocal, setNameLocal] = createSignal<string>("");

	createEffect(() => {
		setNameLocal(props.name);
	});

	const handleBlur = (nameNext: GroupName): void => {
		updateGroupName({
			id: props.id,
			name: nameNext,
		});
	};

	return (
		<FlexRow class={groupNameRow}>
			<NameInput
				class={groupNameField}
				name={props.name}
				nameLocal={nameLocal()}
				onBlur={handleBlur}
				placeholder="Group name"
				setNameLocal={setNameLocal}
				validationSchema={GroupNameSchema}
			/>

			<DuplicatedGroupNameIcon groupId={props.id} name={nameLocal()} />
		</FlexRow>
	);
};

export { GroupNameInput };
