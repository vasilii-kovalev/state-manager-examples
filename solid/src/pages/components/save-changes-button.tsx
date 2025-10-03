import {
	useMutation,
	useQueryClient,
} from "@tanstack/solid-query";
import {
	type Component,
} from "solid-js";

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
	hasChanges,
} from "../signals/signals/page/derived";
import {
	savePageState,
} from "../utilities/save-page-state";

const SaveChangesButton: Component = () => {
	const queryClient = useQueryClient();

	const saveChangesMutation = useMutation(() => {
		return {
			mutationFn: async () => {
				await savePageState();
			},
			onSuccess: async () => {
				await queryClient.invalidateQueries({
					queryKey: [
						QUERY_KEYS.PAGE_DATA,
					],
				});
			},
		};
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
				return (
					<button
						{...targetProps}
						aria-describedby={targetProps.popoverTarget}
						class={
							getClass([
								targetProps.class,
								"control",
							])
						}
						disabled={
							!hasChanges()
							|| isBusy()
						}
						onClick={() => {
							saveChangesMutation.mutate();
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
