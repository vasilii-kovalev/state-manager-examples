import {
	createRootRoute,
	Outlet,
} from "@tanstack/react-router";

import {
	Navigation,
} from "@/components/navigation";

/*
	Can't use `export { Route }` because of the naive export detection in the library.
	More info: https://github.com/TanStack/router/blob/main/packages/router-generator/src/generator.ts#L1216
*/
export const Route = createRootRoute({
	component: () => {
		return (
			<main
				className="overflow-hidden"
			>
				<header
					className="flex items-center gap-col-4 b-0 b-be-1px b-solid p-4"
				>
					<Navigation/>
				</header>

				<section
					className="overflow-auto p-4"
				>
					<Outlet/>
				</section>
			</main>
		);
	},
});
