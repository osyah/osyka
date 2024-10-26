// Copyright (c) 2024 Osyah
// SPDX-License-Identifier: MIT

import {Hct, hexFromArgb, SchemeContent, SchemeExpressive, SchemeFidelity, SchemeFruitSalad, SchemeMonochrome, SchemeNeutral, SchemeRainbow, SchemeTonalSpot, SchemeVibrant} from '@material/material-color-utilities'
import {OsykaLight as OsykaLight} from './osyka_light.js'
import {OsykaContrast} from './osyka_contrast.js'

export type OsykaSchemeVariant = 
	| typeof SchemeContent
	| typeof SchemeExpressive
	| typeof SchemeFidelity
	| typeof SchemeFruitSalad
	| typeof SchemeMonochrome
	| typeof SchemeNeutral
	| typeof SchemeRainbow
	| typeof SchemeTonalSpot
	| typeof SchemeVibrant

export type OsykaScheme = string[][]

export interface OsykaSchemeConfig {
	variant: OsykaSchemeVariant
	sourceColor: Hct
}

export const OsykaSchemeColorKeys = [
	'background',
	'onBackground',
	'surface',
	'surfaceDim',
	'surfaceBright',
	'surfaceContainerLowest',
	'surfaceContainerLow',
	'surfaceContainer',
	'surfaceContainerHigh',
	'surfaceContainerHighest',
	'onSurface',
	'surfaceVariant',
	'onSurfaceVariant',
	'inverseSurface',
	'inverseOnSurface',
	'outline',
	'outlineVariant',
	'shadow',
	'scrim',
	'surfaceTint',
	'primary',
	'onPrimary',
	'primaryContainer',
	'onPrimaryContainer',
	'inversePrimary',
	'secondary',
	'onSecondary',
	'secondaryContainer',
	'onSecondaryContainer',
	'tertiary',
	'onTertiary',
	'tertiaryContainer',
	'onTertiaryContainer',
	'error',
	'onError',
	'errorContainer',
	'onErrorContainer',
	'primaryFixed',
	'primaryFixedDim',
	'onPrimaryFixed',
	'onPrimaryFixedVariant',
	'secondaryFixed',
	'secondaryFixedDim',
	'onSecondaryFixed',
	'onSecondaryFixedVariant',
	'tertiaryFixed',
	'tertiaryFixedDim',
	'onTertiaryFixed',
	'onTertiaryFixedVariant',
] as const

export function OsykaSchemeColors(
	config: OsykaSchemeConfig,
	light = OsykaLight(),
	contrast = OsykaContrast(),
) {
	const dyn = new config.variant(config.sourceColor, !light, contrast)
	return OsykaSchemeColorKeys.map( (color) => '--OsykaScheme_' + color + ':' + hexFromArgb( dyn[color] ) ).join(';')
}
