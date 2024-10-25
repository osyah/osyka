// Copyright (c) 2024 Osyah
// SPDX-License-Identifier: MIT

import {makePersisted, PersistenceOptions} from '@solid-primitives/storage'
import {createSignal} from 'solid-js'

export type SignalRw<t> = (next?: t) => t

function join<t>([get, set]: [get: () => t, set: (x: any) => t, x?: any] ): SignalRw<t> {
	return (next) => next === undefined ? get() : set(next)
}

export function Signal<t>(initial: t) {
	return join( createSignal(initial) )
}

export function SignalPersist<t>(initial: t, config: string | PersistenceOptions<t, undefined>) {
	return join( makePersisted( createSignal(initial), typeof config === 'string' ? {name: config} : config) )
}
