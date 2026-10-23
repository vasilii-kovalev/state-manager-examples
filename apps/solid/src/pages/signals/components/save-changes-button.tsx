import { useMutation, useQueryClient } from "@tanstack/solid-query";
import { type JSX } from "solid-js";

import { QUERY_KEYS } from "packages/shared/src/constants";
import { getClass } from "packages/shared/src/utilities/get-class";

import { Tooltip } from "../../../components/tooltip";
import { useIsBusy } from "../../../hooks/use-is-busy";
import { control } from "../../../styles/control.css";
import { selectHasChanges } from "../signals/page/derived";
import { savePageState } from "../utilities/save-page-state";

const SaveChangesButton = (): JSX.Element => {
	const queryClient = useQueryClient();

	const saveChangesMutation = useMutation(() => {
		return {
			mutationFn: async (): Promise<void> => {
				await savePageState();
			},
			onSuccess: async (): Promise<void> => {
				await queryClient.invalidateQueries({
					queryKey: [QUERY_KEYS.PAGE_DATA],
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
			renderTarget={(targetProps) => {
				return (
					<button
						{...targetProps}
						aria-describedby={targetProps.popoverTarget}
						class={getClass([targetProps.class, control])}
						disabled={!selectHasChanges() || isBusy()}
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

export { SaveChangesButton };
