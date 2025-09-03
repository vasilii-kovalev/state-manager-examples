type RequireProperties<
	Type extends object,
	Keys extends keyof Type,
> = Omit<Type, Keys> & Required<Pick<Type, Keys>>;

export {
	type RequireProperties,
};
