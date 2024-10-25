# Osyka

Simple and opinionated [SolidJS](https://solidjs.com/) UI library partially based on [Material Design 3](https://m3.material.io/) and a set of enhancements for Solid itself, built for [Osyah](https://osyah.com/).

## Install

```sh
pnpm add osyka
```

Osyka is published as a set of `.jsx` and `.styl` files, so you will need a bundler configured to compile SolidJS JSX and Stylus.

## Channels

[SolidJS loves read/write segregation](https://github.com/solidjs/solid-workgroup/discussions/2), but we don't. Adopting the shared read/write function approach reduces the verbosity of all code, makes it possible to use reactive primitives as object properties and improves code composability. We call a function that can be used for both reading and writing a reactive state *a channel*. Osyka provides a few channel wrappers around SolidJS reactive primitives:

- `Signal`, `SignalPersist`: signal value is read by calling the returned function without arguments, written by calling with one argument (setting the value through an update function is unsupported)
- `Resource`: resource actions (`refetch`/`mutate`) are simply made resource's properties
- `Store`, `StorePersist`: state is accessed by calling the store with zero arguments, updated by calling with one or more arguments (forwarded to store's `SetStoreFunction`)

## Theming

The look of your UI can be tuned through `--Osyka*` CSS variables that correspond to a subset of [Material Design tokens](https://m3.material.io/foundations/design-tokens/overview). 

- Font:
	- `--OsykaFontPlain`
	- `--OsykaFontBrand`
- Shape:
	- `--OsykaShape_none`
	- `--OsykaShape_xs`
	- `--OsykaShape_xsTop`
	- `--OsykaShape_sm`
	- `--OsykaShape_md`
	- `--OsykaShape_lg`
	- `--OsykaShape_lgTop`
	- `--OsykaShape_lgStart`
	- `--OsykaShape_lgEnd`
	- `--OsykaShape_xl`
	- `--OsykaShape_xlTop`
	- `--OsykaShape_full`
- [Scheme](#scheme)

All variables are initialized except for Scheme ones to avoid bloating the bundle with unused default colors.

## Scheme

A scheme is a set of semantic color variables derived from:

- selected [scheme variant](#scheme-variant)
- selected source color
- user's light/dark theme preference
- user's contrast preference

Scheme generation in Osyka is handled by `osyka_scheme` module which uses `@material/material-color-utilities` under the hood. There are several simple ways to setup a scheme:

- use Osyka's adaptive baseline scheme by importing it from your application's entry point: `osyka/dist/osyka_scheme_baseline.css`
- generate an adaptive scheme from [a variant](#scheme-variant) and a source color:
	1. run `pnpm osyka_scheme_gen <variant_id> <source_color_hex>`
	2. forward the output to a `.css` file and import it from your application's entry point

And a couple of advanced ones:

- the string yielded by `osyka_scheme_gen` may be generated programmatically:
	```ts
		import {OsykaSchemeRoot} from 'osyka'
		const css = OsykaSchemeRoot( {variant, sourceColor} )
	```
- to generate a scheme at runtime or apply a scheme to a specific element other than `<html>`, use an API:
	```ts
		import {OsykaSchemeColors} from 'osyka'
		const style = OsykaSchemeColors(
			{variant, sourceColor},
			light, // boolean
			contrast, // -1 | 0 | 1
		)
		someElement.setAttribute('style', style)
	```
