import {
	isUndefined,
} from "./is-undefined";

type OptionalClass = string | undefined;

type OptionalClassWithCondition = [boolean, OptionalClass, OptionalClass?];

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
					shouldAdd,
					classForTrue,
					classForFalse,
				] = item;

				classToAdd = shouldAdd
					? classForTrue
					: classForFalse;
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
