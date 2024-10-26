#!/usr/bin/env node 

// Copyright (c) 2024 Osyah
// SPDX-License-Identifier: MIT

import fs, {existsSync} from 'node:fs'
import path from 'node:path'
import {Hct, SchemeTonalSpot, argbFromHex} from '@material/material-color-utilities'
import {OsykaSchemeVariant} from './osyka_scheme.js'
import {SchemeContent, SchemeExpressive, SchemeFidelity, SchemeFruitSalad, SchemeMonochrome, SchemeNeutral, SchemeRainbow, SchemeVibrant} from '@material/material-color-utilities'
import {OsykaSchemeAdaptive} from './osyka_scheme_adaptive.js'

const argv = process.argv.slice(2)
if(argv.length !== 3) {
	console.error(`syntax: osyka_scheme_gen <variant> <source_color_hex> <path_prefix>`)
	process.exit(1)
}
const [variantName, sourceColorHex, pathPrefix] = argv

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
if(!variant) {
	console.error(`invalid scheme variant "${variantName}"`)
	console.error(`valid variants are: ${ Object.keys(variants).join(', ') }`)
	process.exit(1)
}

try {
	var colorSource = Hct.fromInt( argbFromHex(sourceColorHex) )
} catch (e) {
	console.error(`source color appears to not be a valid hex string`)
	console.error(e)
	process.exit(1)
}

if( !existsSync( path.dirname(pathPrefix) ) ) {
	console.error(`trying to write scheme files to a non-existent directory "${ path.dirname(pathPrefix) }"`)
	process.exit(1)
}

const entryPath = pathPrefix + '.css'
const contrastLessPath = pathPrefix + '_contrast_less.css'
const contrastMorePath = pathPrefix + '_contrast_more.css'

const schemeFiles = OsykaSchemeAdaptive( {
	sourceColor: colorSource,
	variant,
}, {
	contrastLess: './' + path.basename(contrastLessPath),
	contrastMore: './' + path.basename(contrastMorePath),
} )

fs.writeFileSync(entryPath, schemeFiles.entry)
fs.writeFileSync(contrastLessPath, schemeFiles.contrastLess)
fs.writeFileSync(contrastMorePath, schemeFiles.contrastMore)
