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
        if (!this && !(this as any).$slots.default) return createElement('')
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

            const propsData = child.componentOptions?.propsData as Record<'to', any>
            const data = isNuxtLink ? propsData : child.data
            const link = isNuxtLink ? { href: propsData?.to } : null

            const childNode = createElement(
                tag,
                {
                    ...data,
                    attrs: {
                        'data-index': index,
                        ...context.data.attrs,
                        href: propsData?.to,
                    },
                },
                [child.children]
            )

            return childNode
        })

        return createElement(tag, data, childrenNode)
    },
})
</script>
