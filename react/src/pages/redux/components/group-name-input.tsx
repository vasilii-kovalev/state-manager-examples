import {
	isEmpty,
} from "es-toolkit/compat";
import {
	type ChangeEventHandler,
	type FC,
	Fragment,
	useState,
} from "react";
import {
	useDispatch,
	useSelector,
} from "react-redux";
import {
	safeParse,
} from "valibot";

import {
	GroupNameSchema,
} from "@/features/group/schemas";
import {
	type GroupId,
	type GroupName,
} from "@/features/group/types";

import {
	type Dispatch,
	type RootState,
} from "../store";
import {
	selectHasSelectedWorklogs,
} from "../store/page/selectors";
import {
	updateGroupName,
} from "../store/page/slice";
import {
	DuplicatedGroupNameIcon,
} from "./duplicated-group-name-icon";

interface GroupNameInputProps {
	id: GroupId;
	name: GroupName;
}

const GroupNameInput: FC<GroupNameInputProps> = ({
	id,
	name,
}) => {
	const dispatch = useDispatch<Dispatch>();

	const hasSelectedWorklogs = useSelector((state: RootState) => {
		return selectHasSelectedWorklogs(state.page);
	});

	const [
		nameLocal,
		setNameLocal,
	] = useState<string>(name);

	const handleNameChange: ChangeEventHandler<HTMLInputElement> = (event) => {
		setNameLocal(event.target.value);
	};

	const handleOnBlur = (): void => {
		if (isEmpty(nameLocal)) {
			setNameLocal(name);

			return;
		}

		const nameNextParseResult = safeParse(
			GroupNameSchema,
			nameLocal,
		);

		if (!nameNextParseResult.success) {
			return;
		}

		const nameNext = nameNextParseResult.output;

		if (nameNext !== name) {
			dispatch(
				updateGroupName({
					id,
					name: nameNext,
				}),
			);
		}

		// The parsed name is trimmed, so we need to update the local state as well.
		setNameLocal(nameNext);
	};

	return (
		<Fragment>
			<input
				disabled={hasSelectedWorklogs}
				onBlur={handleOnBlur}
				onChange={handleNameChange}
				placeholder={name}
				type="text"
				value={nameLocal}
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
