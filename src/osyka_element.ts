// Copyright (c) 2024 Osyah
// SPDX-License-Identifier: MIT

import './osyka_element.styl'
import {Component, JSX, mergeProps, splitProps} from 'solid-js'
import {DOMElements, spread} from 'solid-js/web'
import clsx from 'clsx'

export const OsykaElement = [ ...DOMElements.values() ].reduce(
    (dict, tag) => {
        dict[tag] = new Proxy( {} as any, { get(cache, name: string) {
            return cache[name] ??= (props: Record<string, any>) => {
                const [ {config}, rest ] = splitProps(props, ['config'])
                const element = document.createElement(tag)
                spread(
                    element,
                    mergeProps(
                        rest,
                        typeof config === 'object' ? config : {},
                        { get class() {
                            return clsx('OsykaElement', name, props.class, typeof config === 'object' ? config.class : typeof config === 'string' && config)
                        } },
                    ),
                )
                return element
            } 
        } } )
        return dict
    },
    {} as any,
) as { [k in keyof JSX.IntrinsicElements]: Record<string, Component< Omit< JSX.IntrinsicElements[k], 'config'> & {config?: OsykaElementConfig} > > }

export type OsykaElementConfig<k extends keyof JSX.IntrinsicElements = keyof JSX.IntrinsicElements> = string | JSX.IntrinsicElements[k]