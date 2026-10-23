import { createStore } from "solid-js/store";

import { PAGE_STATE_DEFAULT } from "packages/shared/src/features/page/constants";
import { type PageState } from "packages/shared/src/features/page/types";
import { cloneDeep } from "packages/shared/src/utilities/clone-deep";

const [pageState, setPageState] = createStore<PageState>(cloneDeep(PAGE_STATE_DEFAULT));

export { pageState, setPageState };
