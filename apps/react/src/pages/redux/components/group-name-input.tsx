import { type ReactNode, useState } from "react";

import { GroupNameSchema } from "packages/shared/src/features/group/schemas";
import { type GroupId, type GroupName } from "packages/shared/src/features/group/types";

import { FlexRow } from "../../../components/flex-row";
import { useApplicationDispatch } from "../store";
import { updateGroupName } from "../store/page/slice";
import { DuplicatedGroupNameIcon } from "./duplicated-group-name-icon";
import { groupNameField, groupNameRow } from "./group-name-input.css";
import { NameInput } from "./name-input";

interface GroupNameInputProps {
	id: GroupId;
	name: GroupName;
}

const GroupNameInput = (props: GroupNameInputProps): ReactNode => {
	const { id, name } = props;

	const dispatch = useApplicationDispatch();

	const [nameLocal, setNameLocal] = useState<string>(name);

	const handleBlur = (nameNext: GroupName): void => {
		dispatch(
			updateGroupName({
				id,
				name: nameNext,
			}),
		);
	};

	return (
		<FlexRow className={groupNameRow}>
			<NameInput
				className={groupNameField}
				name={name}
				nameLocal={nameLocal}
				onBlur={handleBlur}
				placeholder="Group name"
				setNameLocal={setNameLocal}
				validationSchema={GroupNameSchema}
			/>

			<DuplicatedGroupNameIcon groupId={id} name={nameLocal} />
		</FlexRow>
	);
};

export { GroupNameInput };
