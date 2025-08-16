import {
	createFileRoute,
} from "@tanstack/react-router";

import {
	ReduxPage,
} from "@/pages/redux/page";

const Route = createFileRoute("/redux")({
	component: ReduxPage,
});

export {
	Route,
};
