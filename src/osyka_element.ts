// Copyright (c) 2024 Osyah
// SPDX-License-Identifier: MIT

import './osyka_element.styl'
import {Component, createMemo, JSX, mergeProps, splitProps} from 'solid-js'
import {DOMElements, spread} from 'solid-js/web'
import clsx from 'clsx'

export const OsykaElement = [ ...DOMElements.values() ].reduce(
    (dict, tag) => {
        dict[tag] = new Proxy( {} as any, { get(cache, name: string) {
            return cache[name] ??= (props: Record<string, any>) => {
                const [system, rest] = splitProps(props, ['handle'])
                return createMemo( () => {
                    const {handle} = system
                    if(handle === null) return null
                    const element = document.createElement(tag)
                    spread(
                        element,
                        mergeProps(
                            rest,
                            typeof handle === 'object' ? handle : {},
                            {
                                get class() {
                                    return clsx('OsykaElement', name, props.class, typeof handle === 'object' ? handle.class : typeof handle === 'string' && handle)
                                }
                            }
                        ),
                    )
                    return element
                } )
            } 
        } } )
        return dict
    },
    {} as any,
) as { [k in keyof JSX.IntrinsicElements]: Record< string, Component< Omit< JSX.IntrinsicElements[k], 'handle'> & {handle?: OsykaElementHandle} > > }

export type OsykaElementHandle<k extends keyof JSX.IntrinsicElements = keyof JSX.IntrinsicElements> = string | JSX.IntrinsicElements[k] | null