import {makePersisted} from '@solid-primitives/storage'
import {createStore, SetStoreFunction} from 'solid-js/store'

function join<t extends object>(store: [state: t, set: any, x?: any]) {
	return ( (...args: any[]) => args.length ? store[1](...args) : store[0] ) as SetStoreFunction<t> & ( () => t )
}


export function Store<t extends object>(init: t) {
	return join( createStore(init) )
}

export function StorePersist<t extends object>( init: t, config: string ) {
	return join( makePersisted( createStore(init), {name: config} ) as any as [state: t, set: any] )
}
