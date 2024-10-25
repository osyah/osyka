// Copyright (c) 2024 Osyah
// SPDX-License-Identifier: MIT

import {createMediaQuery} from '@solid-primitives/media'

export type OsykaContrast = -1 | 0 | 1

const more = createMediaQuery('(prefers-contrast: more)')
const less = createMediaQuery('(prefers-contrast: less)')

export function OsykaContrast() {
	return (+more() - +less()) as OsykaContrast
}