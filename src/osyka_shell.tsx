import './osyka_shell.styl'
import {OsykaElement, OsykaElementConfig} from './osyka_element.jsx'

const {div, header, aside, main} = OsykaElement

export function OsykaShell( props: {
	config?: OsykaElementConfig
	header?: OsykaElementConfig
	aside?: OsykaElementConfig
	main?: OsykaElementConfig
} ) {
	return <div.OsykaShell config={props.config}>
		<header.OsykaShell_header config={props.header} />
		<div.OsykaShell_hor>
			<aside.OsykaShell_aside config={props.aside} />
			<main.OsykaShell_main config={props.main} />
		</div.OsykaShell_hor>
	</div.OsykaShell>
}
