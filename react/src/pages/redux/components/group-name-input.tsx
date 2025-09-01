import {
	type FC,
	Fragment,
} from "react";
import {
	useDispatch,
} from "react-redux";

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
	type Dispatch,
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

const GroupNameInput: FC<GroupNameInputProps> = ({
	id,
	name,
}) => {
	const dispatch = useDispatch<Dispatch>();

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
		<Fragment>
			<NameInput
				className="w-42"
				name={name}
				nameLocal={nameLocal}
				onBlur={handleBlur}
				setNameLocal={setNameLocal}
				validationSchema={GroupNameSchema}
			/>

			<DuplicatedGroupNameIcon
				groupId={id}
				name={nameLocal}
			/>
		</Fragment>
	);
};

export {
	GroupNameInput,
};
