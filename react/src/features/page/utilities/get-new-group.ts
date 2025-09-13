import {
	type Group,
} from "@/features/group/types";
import {
	type RequireProperties,
} from "@/types/require-properties";
import {
	generateId,
} from "@/utilities/generate-id";

type GetNewGroupParams = RequireProperties<
	Partial<Group>,
	| "name"
>;

const getNewGroup = ({
	id = generateId(),
	name,
}: GetNewGroupParams): Group => {
	return {
		id,
		name,
	};
};

export {
	getNewGroup,
};
