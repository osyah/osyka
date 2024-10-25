import {createMediaQuery, usePrefersDark} from '@solid-primitives/media'
import {SignalPersist} from './signal.js'

export const OsykaLightPref = createMediaQuery('(prefers-color-scheme: light)')
export const OsykaLightOverride = SignalPersist(null as null | boolean, 'OsykaLightOverride')
export const OsykaLight = () => OsykaLightOverride() ?? OsykaLightPref()