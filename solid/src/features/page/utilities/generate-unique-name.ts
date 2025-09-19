interface GenerateUniqueNameParams {
	existingNames: Array<string>;
	namePrefix: string;
}

const generateUniqueName = (
	params: GenerateUniqueNameParams,
): string => {
	const {
		existingNames,
		namePrefix,
	} = params;

	const existingNamesSet = new Set<string>(existingNames);

	for (
		let index = 0;
		index <= existingNames.length;
		index += 1
	) {
		let name = namePrefix;

		if (index > 0) {
			name += ` ${index}`;
		}

		if (!existingNamesSet.has(name)) {
			return name;
		}
	}

	throw new Error("Unable to generate a unique name");
};

export {
	generateUniqueName,
};
