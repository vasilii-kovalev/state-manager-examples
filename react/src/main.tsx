import {
	createRouter,
	RouterProvider,
} from "@tanstack/react-router";
import {
	TanStackRouterDevtools,
} from "@tanstack/react-router-devtools";
import {
	StrictMode,
} from "react";
import {
	createRoot,
} from "react-dom/client";

import {
	routeTree,
} from "./routeTree.gen";

const router = createRouter({
	routeTree,
});

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

const rootElement = document.getElementById("root");

if (rootElement !== null) {
	const root = createRoot(rootElement);

	root.render(
		<StrictMode>
			<RouterProvider
				router={router}
			/>

			<TanStackRouterDevtools
				router={router}
			/>
		</StrictMode>,
	);
}
