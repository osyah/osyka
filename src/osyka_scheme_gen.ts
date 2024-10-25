#!/usr/bin/env node 

// Copyright (c) 2024 Osyah
// SPDX-License-Identifier: MIT

import {Hct, SchemeTonalSpot, argbFromHex} from '@material/material-color-utilities'
import {OsykaSchemeRoot, OsykaSchemeVariant} from './osyka_scheme.js'
import {SchemeContent, SchemeExpressive, SchemeFidelity, SchemeFruitSalad, SchemeMonochrome, SchemeNeutral, SchemeRainbow, SchemeVibrant} from '@material/material-color-utilities'

const [variantName, colorSourceHex] = process.argv.slice(2)

const variants: Record<string, OsykaSchemeVariant> = {
	content: SchemeContent,
	expressive: SchemeExpressive,
	fidelity: SchemeFidelity,
	fruit_salad: SchemeFruitSalad,
	monochrome: SchemeMonochrome,
	neutral: SchemeNeutral,
	rainbow: SchemeRainbow,
	tonal_spot: SchemeTonalSpot,
	vibrant: SchemeVibrant,
}

const variant  = variants[variantName]
if(!variant) fail()

try {
	var colorSource = Hct.fromInt( argbFromHex(colorSourceHex) )
} catch {
	fail()
}

console.log( OsykaSchemeRoot( {
	sourceColor: colorSource,
	variant,
} ) )

function fail(): never {
	console.error(`syntax: osyka_scheme_gen <${ Object.keys(variants).join('|') }> <hex>`)
	return process.exit(1)
}