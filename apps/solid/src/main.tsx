import { TanStackDevtools } from "@tanstack/solid-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/solid-query";
import { SolidQueryDevtoolsPanel } from "@tanstack/solid-query-devtools";
import { createRouter, RouterProvider } from "@tanstack/solid-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/solid-router-devtools";
import "solid-devtools";
import { render } from "solid-js/web";

import "packages/shared/src/styles/normalize.css";
import { isNull } from "packages/shared/src/utilities/is-null";

import { routeTree } from "./routeTree.gen";
import "./styles/global.css";

const router = createRouter({
	routeTree,
});

declare module "@tanstack/solid-router" {
	interface Register {
		router: typeof router;
	}
}

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
});

const rootElement = document.getElementById("root");

if (!isNull(rootElement)) {
	render(() => {
		return (
			<QueryClientProvider client={queryClient}>
				<RouterProvider router={router} />

				<TanStackDevtools
					plugins={[
						{
							name: "TanStack Query",
							render: <SolidQueryDevtoolsPanel />,
						},
						{
							name: "TanStack Router",
							render: <TanStackRouterDevtoolsPanel router={router} />,
						},
					]}
				/>
			</QueryClientProvider>
		);
	}, rootElement);
}
