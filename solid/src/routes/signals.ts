import {
	createFileRoute,
} from "@tanstack/solid-router";

import {
	SignalsPage,
} from "@/pages/signals/page";

const Route = createFileRoute("/signals")({
	component: SignalsPage,
});

export {
	Route,
};
