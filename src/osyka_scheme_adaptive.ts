import {OsykaSchemeConfig, OsykaSchemeColors} from './osyka_scheme.js'

declare module 'solid-js' {
	namespace JSX {
		interface ExplicitAttributes {
			osyka_scheme_adaptive: 'dark' | 'light'
		}
	}
}

export function OsykaSchemeAdaptive(
	config: OsykaSchemeConfig,
	specifiers: {contrastMore: string, contrastLess: string},
) {
	return {
		entry: '/* generated by osyka_scheme:OsykaSchemeAdaptive */\n'
			+ `@import "${specifiers.contrastMore}" (prefers-contrast: more);\n`
			+ `@import "${specifiers.contrastLess}" (prefers-contrast: less);\n`
			+ `:where( :root, [osyka_scheme_adaptive=dark] ) {${ OsykaSchemeColors(config, false, 0) }}\n`
			+ `:where( :root, [osyka_scheme_adaptive=light] ) {${ OsykaSchemeColors(config, true, 0) }}\n`,
		contrastMore: '/* generated by osyka_scheme:OsykaSchemeAdaptive */\n'
			+ `:is( :root, [osyka_scheme_adaptive=dark] ) {${ OsykaSchemeColors(config, false, 1) }}\n`
			+ `:is( :root, [osyka_scheme_adaptive=light] ) {${ OsykaSchemeColors(config, true, 1) }}\n`,
		contrastLess: '/* generated by osyka_scheme:OsykaSchemeAdaptive */\n'
			+ `:is( :root, [osyka_scheme_adaptive=dark] ) {${ OsykaSchemeColors(config, false, -1) }}\n`
			+ `:is( :root, [osyka_scheme_adaptive=light] ) {${ OsykaSchemeColors(config, true, -1) }}\n`,
	}
}