import {
	createRootRoute,
	Outlet,
} from "@tanstack/react-router";

const Route = createRootRoute({
	component: () => {
		return (
			<Outlet/>
		);
	},
});

export {
	Route,
};
