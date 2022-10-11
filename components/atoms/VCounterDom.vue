<script lang="ts">
import Vue from 'vue'
import type { VNode, VNodeData } from 'vue'

export default Vue.extend({
    name: 'VCounterDom',
    functional: true,
    props: {
        tag: { type: String, default: 'div' },
    },
    render(createElement, context): VNode {
        const { tag } = context.props

        const data: VNodeData = {
            ...context.data,
            staticClass: 'text-overtitle-m',
            class: [context.data.staticClass, context.data.class],
        }

        const children: VNode[] = (context.slots()?.default as VNode[]).filter((child) => child.tag) || []
        const childrenNode = children.map((child, index) => {
            const isNuxtLink = child.componentOptions?.tag === 'nuxt-link' || child.tag === 'vue-component-19-NuxtLink'
            const tag = isNuxtLink ? 'a' : child.tag ? child.tag : ''

            const data = isNuxtLink ? child.componentOptions?.propsData : child.data
            const link = isNuxtLink ? { href: child.componentOptions?.propsData?.to } : null
            console.log(tag)
            const childNode = createElement(
                tag,
                {
                    ...data,
                    attrs: {
                        'data-index': index,
                        ...context.data.attrs,
                        href: child.componentOptions?.propsData?.to,
                    },
                },
                [child.children]
            )
            // console.log(childNode)
            return childNode
        })

        console.log(children)

        return createElement(tag, data, childrenNode)
    },
})
</script>
