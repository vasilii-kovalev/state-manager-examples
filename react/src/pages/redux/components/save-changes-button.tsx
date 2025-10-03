import {
	useMutation,
	useQueryClient,
} from "@tanstack/react-query";
import {
	type FC,
} from "react";

import {
	Tooltip,
} from "@/components/tooltip";
import {
	QUERY_KEYS,
} from "@/constants";
import {
	useIsBusy,
} from "@/hooks/use-is-busy";
import {
	getClass,
} from "@/utilities/get-class";

import {
	useApplicationDispatch,
	useApplicationSelector,
} from "../store";
import {
	selectHasChanges,
} from "../store/page/selectors";
import {
	savePageState,
} from "../utilities/save-page-state";

const SaveChangesButton: FC = () => {
	const dispatch = useApplicationDispatch();

	const hasChanges = useApplicationSelector((
		state,
	) => {
		return selectHasChanges(state.page);
	});

	const queryClient = useQueryClient();

	const {
		mutate: handleSaveChanges,
	} = useMutation({
		mutationFn: async () => {
			await dispatch(savePageState());
		},
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: [
					QUERY_KEYS.PAGE_DATA,
				],
			});
		},
	});

	const isBusy = useIsBusy();

	return (
		<Tooltip<HTMLButtonElement>
			renderBody={() => {
				return "Save changes to Local Storage";
			}}
			renderTarget={(
				targetProps,
			) => {
				const {
					className,
					...otherTargetProps
				} = targetProps;

				return (
					<button
						{...otherTargetProps}
						aria-describedby={otherTargetProps.popoverTarget}
						className={
							getClass([
								className,
								"control",
							])
						}
						disabled={
							!hasChanges
							|| isBusy
						}
						onClick={() => {
							handleSaveChanges();
						}}
						type="button"
					>
						Save changes
					</button>
				);
			}}
			targetId="save-changes-button"
		/>
	);
};

export {
	SaveChangesButton,
};
