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
			<main>
				<header
					className="pos-fixed inset-inline-0 flex items-center gap-col-4 b-0 b-be-1px b-solid bg-white p-4 inset-bs-0"
				>
					<Navigation/>
				</header>

				<section
					className="m-bs-13 p-4"
				>
					<Outlet/>
				</section>
			</main>
		);
	},
});
