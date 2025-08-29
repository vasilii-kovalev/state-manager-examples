import {
	isUndefined,
} from "es-toolkit";

type OptionalClass = string | undefined;

type OptionalClassWithCondition = [OptionalClass, boolean];

const getClass = (
	items: Array<OptionalClass | OptionalClassWithCondition>,
): string => {
	const classes = items.reduce<Array<string>>(
		(
			classesCurrent,
			item,
		) => {
			let classToAdd: OptionalClass;

			if (Array.isArray(item)) {
				const [
					itemClass,
					shouldAdd,
				] = item;

				if (shouldAdd) {
					classToAdd = itemClass;
				}
			} else {
				classToAdd = item;
			}

			if (!isUndefined(classToAdd)) {
				const classToAddTrimmed = classToAdd.trim();

				classesCurrent.push(classToAddTrimmed);
			}

			return classesCurrent;
		},
		[],
	);

	return classes.join(" ");
};

export {
	getClass,
};
