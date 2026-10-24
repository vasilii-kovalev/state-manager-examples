# TODO

- [ ] Remove `oxc-transform-react` from the root `package.json` after [this issue](https://github.com/npm/cli/issues/9337) is fixed
- [ ] Migrate from `date-fns` to the Temporal API (see "Migrating fully to Temporal" section)

## Migrating fully to Temporal

### Condition

Do this when `devEngines.runtime` in the root `package.json` can require Node.js >= 26. That is after Node.js 24 end of life, 30 April 2028 on the [release schedule](https://github.com/nodejs/Release) (Node.js 22 ends earlier, on 30 April 2027). Temporal will not be backported to 22 or 24: the V8 in Node.js 24 predates `temporal_rs` ([nodejs/node#57127](https://github.com/nodejs/node/issues/57127)). Vite's default `build.target` is a second gate. This install freezes Baseline Widely Available at 2026-01-01 (Chrome 111, Edge 111, Firefox 114, Safari 16.4) and only rewrites syntax, so a bare `Temporal` global still throws there. Widely Available itself is 30 months after the last of Chrome, Edge, Firefox, and Safari ships the API. Safari stable has no unflagged Temporal as of 24 October 2026, so 30 April 2028 is too early for the default target. Migrate once the Vite major in use has a default floor that includes Temporal, or set `build.target` to browsers that have it.

### Plan

Drop both `date-fns` and `Date`. Calculation uses `Temporal.PlainDate`. Page state, worklogs, schemas, and component props keep `DateString` (`YYYY-MM-DD`, valibot `isoDate()`). `PlainDate` does not belong in the Redux or signals state: those examples clone and snapshot plain data. `Duration` stays a branded number of hours, and `formatDuration` stays `Intl.NumberFormat`. That number is not a `Temporal.Duration`.

No remaining function takes or returns `Date`. React and Solid already pass `DateString` into `getIsWeekend`, `formatDayWithLeadingZero`, and `formatWeekdayShort`. Narrow `getIsWeekend` from `Date | DateString` to `DateString`.

The app tsconfig (`target` and `lib` `ESNext` in `packages/configs/tsconfig.app.json`) already includes Temporal types. Shared source and Vitest files extend it. No `lib` change. Tests run in Node, which is why `devEngines` has to be >= 26 before the global is safe. When the package is gone, remove the `date-fns` dependency from `packages/shared/package.json` and the restricted-import group in `oxlint.config.ts`.

Delete the modules that exist only to wrap `date-fns` or to accept a `Date`:

- `format-date.ts`, `format-iso.ts`, `parse-iso.ts`, `get-start-of-month.ts`, `get-end-of-month.ts`, and `get-each-day-of-interval.ts` re-export one `date-fns` function each. `getCalendarForMonth` is the only caller of the three month helpers.
- `parse-date.ts` accepts `Date | DateString` and returns a `Date`. Callers are `get-is-weekend.ts`, `format-day-with-leading-zero.ts`, `format-weekday-short.ts`, and `packages/shared/src/features/page/fixtures.ts`.
- `packages/shared/src/utilities/is-date.ts` exists for that `Date` check. `parse-date.ts` is its only caller.

Put the operations in the functions that remain:

- `get-is-weekend.ts`, `format-day-with-leading-zero.ts`, and `format-weekday-short.ts` parse with `Temporal.PlainDate.from(dateString)`.
- Weekend is `plainDate.dayOfWeek === 6 || plainDate.dayOfWeek === 7` (ISO Monday = 1, Sunday = 7). That is Saturday and Sunday, the same two days `isWeekend` reports for a civil date.
- The day label is `String(plainDate.day).padStart(2, "0")`. The weekday label is `plainDate.toLocaleString("en-US", { weekday: "short" })`. Pass `en-US` on purpose: these call sites pass no locale, and `date-fns` `EEE` then uses its built-in English locale (`Mon`, `Tue`, …). The runtime default locale would translate the abbreviation. Then delete `DATE_FORMAT` from `constants.ts`. Keep `WORKING_DAY_NORM_HOURS`.
- `format-date-string.ts` takes a `Temporal.PlainDate` and returns `plainDate.toString()` as a `DateString`. That is the `YYYY-MM-DD` string `formatISO` writes today with `{ representation: "date" }`.
- `getCalendarForMonth` takes a `Temporal.PlainDate`. Start is `plainDate.with({ day: 1 })`. End is `start.with({ day: start.daysInMonth })`. Walk inclusive from start through end with `add({ days: 1 })`, comparing with `Temporal.PlainDate.compare`. Each step formats with `formatDateString` and reads `dayOfWeek` for the norm.
- `fixtures.ts` builds the sample month with `Temporal.PlainDate.from("2025-09-01")`.
- `get-page-data-default.ts` builds the current month with `getCalendarForMonth(Temporal.Now.plainDateISO())`.

### Time zone

`DateString` and `PlainDate` are civil dates. `Temporal.PlainDate.from("2025-09-01")` is 1 September in every time zone, which is what the September fixture is for.

`date-fns` gets that same civil day only because `parseISO("2025-09-01")` is local midnight and the other helpers read local fields. The full migration removes that `Date`. There is then no `getFullYear` / `getUTCFullYear` conversion to keep.

The one clock read is `Temporal.Now.plainDateISO()` in `get-page-data-default.ts`. With no time-zone argument it uses the system zone and returns today's civil date, which is the local day `new Date()` feeds into the calendar now. After that call the value is a `PlainDate`. Leave `ZonedDateTime` and `Instant` unused. The app still has no zone to store.
