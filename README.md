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

of your UI can be tuned through `--Osyka*` CSS variables that correspond to a subset of [Material Design tokens](https://m3.material.io/foundations/design-tokens/overview). 

- Font:
	- `--OsykaFontPlain`
	- `--OsykaFontBrand`
- Shape:
	- `--OsykaShape_xs`
	- `--OsykaShape_sm`
	- `--OsykaShape_md`
	- `--OsykaShape_lg`
	- `--OsykaShape_xl`
- [Scheme](#scheme)

All variables are initialized except for Scheme ones to avoid bloating the bundle with unused default colors.

## Scheme

A scheme is a set of semantic color variables derived from:

- selected [scheme variant](#scheme-variant)
- selected source color
- user's light/dark theme preference
- user's contrast preference

Scheme generation in Osyka is handled by `osyka_scheme` module which uses `@material/material-color-utilities` under the hood. There are several ways to setup a scheme:

- [Baseline](#scheme-baseline)
- [Adaptive](#scheme-adaptive)
- [Manual](#scheme-manual)

### Scheme: Baseline

Baseline scheme is Osyka's sensible default scheme that adjusts to user's contrast and dark mode preferences. To use it, just import the stylesheet:

```ts
import 'osyka/dist/osyka_scheme_baseline.css'
```

Technically speaking, baseline scheme is an [adaptive](#scheme-adaptive) scheme with blue (`#45b1e8`) source color generated with [Tonal Spot variant](#scheme-variant).

### Scheme: Adaptive

Adaptive scheme stylesheets adjust to user's dark mode preference and load with more or less contrast if user's browser asks for it.

You can generate an adaptive scheme from your brand color and [a scheme variant](#scheme-variant) through the CLI:

```
pnpm osyka_scheme_gen <variant> <hex> <path_prefix>
```

This will write to the following files: `{path_prefix}.css`, `{path_prefix}_contrast_hi.css`, `{path_prefix}_contrast_lo.css`.

To start using the generated scheme, import it from your application's entry point. 

By default, adaptive scheme appears dark or light based on the browser preference. If your application has an in-UI control for toggling the dark mode (see [Dark mode preference](#dark-mode-preference)), set `osyka_scheme_adaptive` attribute of application's root element to `dark`/`light`:

```tsx
function App() {
	return <div.App
		attr:osyka_scheme_adaptive={ OsykaLight() }
	>
		<OsykaLightSelect />
	</div.App>
}
```

### Scheme: Manual

A "smart" adaptive scheme is composed from a set of "dumb" color sets. To generate one, use `OsykaSchemeColors` API, which returns a CSS string with list of color variables for a scheme and accepts the same config object as `OsykaSchemeAdaptive` but also two extra parameters for specifying light/dark appearance and contrast level:

```ts
const css = OsykaSchemeColors(
	{variant, sourceColor},
	light, // boolean
	contrast, // -1 | 0 | 1
)
```

Second and third parameters are optional and default to `OsykaLight` and `OsykaContrast` calls correspondingly, which are reactive accessors for browser preferences.

A great use case for `OsykaSchemeColors` is [dynamic color schemes](https://m3.material.io/styles/color/dynamic/choosing-a-source) based on [app content](https://m3.material.io/styles/color/dynamic/content-based-source) or [user-generated colors](https://m3.material.io/styles/color/dynamic/user-generated-source).

```ts
import {OsykaSchemeColors, OsykaElement} from 'osyka'
import {SchemeContent} from '@material/material-color-utilities'
const {div, h1} = OsykaElement

function AlbumPage( props: {
	title: () => string
	coverColor: () => string
} ) {
	const css = () => OsykaSchemeColors( {
		variant: SchemeContent,
		sourceColor: props.coverColor(),
	} )

	return <div.AlbumPage style={ css() } >
		<h1.AlbumPage_title>{props.title}</h1.AlbumPage_title>
	</div.AlbumPage>
}
```

## Scheme: Variant

A variant is responsible for turning a source color to a set of tonal palettes with its color magic. To use a variant when generating a scheme programmatically, import one of the classes listed below from `@material/material-color-utilities`. 

Tip: the variant most developers will want is `SchemeTonalSpot`.

- `SchemeContent`: uses the source color as background; has similiar appearance in light and dark mode; tertiary palette is analogous to the primary one
- `SchemeExpressive`: a scheme that is intentionally detached from the source color
- `SchemeFidelity`: uses the source color as background; similiar appearance in light and dark mode; tertiary palette is complementary to the primary one
- `SchemeFruitSalad`: a playful theme — the source color's hue does not appear in the theme
- `SchemeMonochrome`: a grayscale scheme
- `SchemeNeutral`: a nearly grayscale scheme
- `SchemeRainbow`: a playful theme — the source color's hue does not appear in the theme
- **`SchemeTonalSpot`**: has low to medium colorfullness; the tertiary palette is related to the source color
- `SchemeVibrant`: maxes out colorfullness of the primary tonal palette

## Element

Osyka Element is a micro-framework for building customizable UI components as well as application pages. 

It is designed around a simple idea contradicting a significant part of the front-end mainstream (Tailwind, Svelte/Vue/Astro, etc): **just like each component has a name, all of its elements should**. Osyka Element API displaces native SolidJS element creation syntax like `<div />` with its own that ensures element names.

```ts
const {div, h1} = OsykaElement

function App() {
	return <div.App>
		<h1.App_title>My App</h1.App_title>
	</div.App>
}
```

- `OsykaElement` members like `div` are proxies, their "virtual members" are components that are (almost) identical in behaviour to Solid's element syntax
- in an expression like `<div.App />`, `div` would be element's **tag** and `App` would be the name
- element name is added to its classlist and semantically identifies it within the component
- component's root element name should be equal to component's name
- component's nested element names should follow the format: `ComponentName_elementName`

Though element name is commonly used to set the element's class, strings from `class` prop will be added to the element's class list as well as `OsykaElement` class that provides some minimal styling:

- `box-sizing: border-box`
- removes margin and padding
- resets text color, font, background and border

### Element: Handle

Element Handle is a feature that allows you to expose some your widget elements to consumers. It is implemented as `handle` prop of all Osyka Elements that you typically forward from a host component's prop typed as `OsykaElementHandle`. You to a value of these types:

- a string to add a class to the element (just an alias to `handle={{class: handle}}`)
- an object to override any element props including `children` and `ref`
- `null` to unmount an element

```tsx
function App() {
	return <Box handle={{
		class: 'App',
		children: <>
			<h1.App_title>My App</h1>
			<Box handle='App_anEmptyBox' />
		</>,
	}} />
}

function Box( props: {
	handle?: OsykaElementHandle
} ) {
	return <div.Box handle={props.handle} />
}
```

A few more things to consider:

- changing handle's value (including changing specific property values of object-typed handles) recreates the element
- props set through handles have priority over other props
- setting classes through handles doesn't remove other classes set by Osyka Element

Though powerful, handles should be used carefully since they may break some components or harm performance. To avoid recreating an element every time any prop you want to set with handle changes, you should wrap its value in a getter:

```tsx
<Box handle={{
	get children() {
		return count()
	},
}} />
```

This is what Solid compiler does as well to all non-static JSX attribute values to form the `props` object (and the reason it can't be destructured).

## Miscellaneous

### Dark mode preference

`OsykaLight` is a reactive accessor for user's light/dark mode preference. To allow selecting the color scheme from UI, use `OsykaLightOverride` signal that is synchronized with the eponymous local storage entry. If `OsykaLightOverride` is `null`, the value is derived from browser's preference.

Tip: there is a built-in component for selecting the color scheme — `OsykaLightSelect`.

### Contrast preference

`OsykaContrast` is a reactive accessor for user's contrast preference. Possible returned values are:

- `-1`: user prefers less contrast
- `0`: no explicit contrast preference
- `1`: user prefers more contrast
