// Copyright (c) 2024 Osyah
// SPDX-License-Identifier: MIT

import './osyka_shell.styl'
import {OsykaElement, OsykaElementHandle} from './osyka_element.js'

const {div, header, aside, main} = OsykaElement

export function OsykaShell( props: {
	handle?: OsykaElementHandle
	header?: OsykaElementHandle
	aside?: OsykaElementHandle
	main?: OsykaElementHandle
} ) {
	return <div.OsykaShell handle={props.handle}>
		<header.OsykaShell_header handle={props.header} />
		<div.OsykaShell_hor>
			<aside.OsykaShell_aside handle={props.aside} />
			<main.OsykaShell_main handle={props.main} />
		</div.OsykaShell_hor>
	</div.OsykaShell>
}
