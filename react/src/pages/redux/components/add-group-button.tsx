import {
	type FC,
} from "react";
import {
	useDispatch,
} from "react-redux";

import {
	Tooltip,
} from "@/components/tooltip";
import {
	useIsBusy,
} from "@/hooks/use-is-busy";
import {
	getClass,
} from "@/utilities/get-class";

import {
	type Dispatch,
} from "../store";
import {
	addGroup,
} from "../utilities/add-group";

const AddGroupButton: FC = () => {
	const dispatch = useDispatch<Dispatch>();

	const isBusy = useIsBusy();

	const handleAddGroup = (): void => {
		dispatch(addGroup());
	};

	return (
		<Tooltip<HTMLButtonElement>
			renderBody={() => {
				return "Add group";
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
						disabled={isBusy}
						onClick={handleAddGroup}
						type="button"
					>
						+
					</button>
				);
			}}
			targetId="add-group-button"
		/>
	);
};

export {
	AddGroupButton,
};
