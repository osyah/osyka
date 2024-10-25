import {createResource, InitializedResourceOptions, Resource, ResourceActions, ResourceFetcher, ResourceOptions, ResourceSource} from 'solid-js'

export function Resource<T, R = unknown>(
	fetcher: ResourceFetcher<true, T, R>,
	options: InitializedResourceOptions<NoInfer<T>, true>
): Resource<T> & ResourceActions<T, R>
export function Resource<T, R = unknown>(
	fetcher: ResourceFetcher<true, T, R>,
	options?: ResourceOptions<NoInfer<T>, true>
): Resource<T> & ResourceActions<T | undefined, R>
export function Resource<T, S, R = unknown>(
	source: ResourceSource<S>,
	fetcher: ResourceFetcher<S, T, R>,
	options: InitializedResourceOptions<NoInfer<T>, S>
): Resource<T> & ResourceActions<T, R>
export function Resource<T, S, R = unknown>(
	source: ResourceSource<S>,
	fetcher: ResourceFetcher<S, T, R>,
	options?: ResourceOptions<NoInfer<T>, S>
): Resource<T> & ResourceActions<T | undefined, R>
export function Resource(...args: any[]): any {
	const [data, actions] = (createResource as any)(...args)
	return Object.assign(data, actions)
}
