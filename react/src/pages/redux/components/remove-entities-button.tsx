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
	removeEntities,
} from "../store/page/slice";

const RemoveEntitiesButton: FC = () => {
	const dispatch = useDispatch<Dispatch>();

	const isBusy = useIsBusy();

	const handleRemoveEntities = (): void => {
		dispatch(removeEntities());
	};

	return (
		<Tooltip<HTMLButtonElement>
			renderBody={() => {
				return "Remove all groups, activities and worklogs";
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
								"control",
							])
						}
						disabled={isBusy}
						onClick={handleRemoveEntities}
						type="button"
					>
						Remove entities
					</button>
				);
			}}
			targetId="remove-entities-button"
		/>
	);
};

export {
	RemoveEntitiesButton,
};
