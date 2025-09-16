import {
	type FC,
} from "react";

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
	useLocalName,
} from "@/hooks/use-local-name";

import {
	useApplicationDispatch,
} from "../store";
import {
	updateGroupName,
} from "../store/page/slice";
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

const GroupNameInput: FC<GroupNameInputProps> = (
	props,
) => {
	const {
		id,
		name,
	} = props;

	const dispatch = useApplicationDispatch();

	const {
		nameLocal,
		setNameLocal,
	} = useLocalName(name);

	const handleBlur = (
		nameNext: GroupName,
	): void => {
		dispatch(
			updateGroupName({
				id,
				name: nameNext,
			}),
		);
	};

	return (
		<FlexRow
			className="gap-col-1"
		>
			<NameInput
				className="w-42"
				name={name}
				nameLocal={nameLocal}
				onBlur={handleBlur}
				placeholder="Group name"
				setNameLocal={setNameLocal}
				validationSchema={GroupNameSchema}
			/>

			<DuplicatedGroupNameIcon
				groupId={id}
				name={nameLocal}
			/>
		</FlexRow>
	);
};

export {
	GroupNameInput,
};
