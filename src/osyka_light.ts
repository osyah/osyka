// Copyright (c) 2024 Osyah
// SPDX-License-Identifier: MIT

import {createMediaQuery} from '@solid-primitives/media'
import {SignalPersist} from './signal.js'

export const OsykaLightPref = createMediaQuery('(prefers-color-scheme: light)')
export const OsykaLightOverride = SignalPersist(null as null | boolean, 'OsykaLightOverride')
export const OsykaLight = () => OsykaLightOverride() ?? OsykaLightPref()