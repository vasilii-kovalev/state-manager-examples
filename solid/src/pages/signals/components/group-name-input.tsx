import {
	type Component,
	createEffect,
	createSignal,
} from "solid-js";

import {
	FlexRow,
} from "@/components/flex-row";
import {
	GroupNameSchema,
} from "@/features/group/schemas";
import {
	type GroupId,
	type GroupName,
} from "@/features/group/types";

import {
	updateGroupName,
} from "../utilities/update-group-name";
import {
	DuplicatedGroupNameIcon,
} from "./duplicated-group-name-icon";
import {
	NameInput,
} from "./name-input";

interface GroupNameInputProps {
	id: GroupId;
	name: GroupName;
}

const GroupNameInput: Component<GroupNameInputProps> = (
	props,
) => {
	const [
		nameLocal,
		setNameLocal,
	] = createSignal<string>("");

	createEffect(() => {
		setNameLocal(props.name);
	});

	const handleBlur = (
		nameNext: GroupName,
	): void => {
		updateGroupName({
			id: props.id,
			name: nameNext,
		});
	};

	return (
		<FlexRow
			class="gap-col-1"
		>
			<NameInput
				class="w-42"
				name={props.name}
				nameLocal={nameLocal()}
				onBlur={handleBlur}
				placeholder="Group name"
				setNameLocal={setNameLocal}
				validationSchema={GroupNameSchema}
			/>

			<DuplicatedGroupNameIcon
				groupId={props.id}
				name={nameLocal()}
			/>
		</FlexRow>
	);
};

export {
	GroupNameInput,
};
