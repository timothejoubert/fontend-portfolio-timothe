<script lang="ts">
import Vue from 'vue'
import type { VNode } from 'vue'

function isRelativePath(path?: string): boolean {
    return !!path && path.charAt(0) === '/'
}

function isExternalPath(path?: string): boolean {
    return !!path && path.charAt(0) === 'h'
}

const NUXT_LINK_TAG_NAME = 'vue-component-36-NuxtLink'

export default Vue.extend({
    name: 'VCounterDom',
    functional: true,
    props: {
        enabled: { type: Boolean, default: true },
        enter: Boolean,
        inline: Boolean,
    },
    render(createElement, context): VNode | VNode[] {
        const { props, data } = context
        if (!context.slots().default) return createElement('')
        if (!props.enabled) return createElement('div', { ...data, ...props }, context.slots().default)
        let slotIndex = 0

        const children = context.slots().default.map((slot: VNode) => {
            const linkAttributes = {} as Record<'to' | 'href' | 'target', string>
            const isNuxtLink = slot?.tag === NUXT_LINK_TAG_NAME
            const isLinkTag = slot?.tag === 'a'
            const isRelativeLink = (isLinkTag && isRelativePath(slot.data?.attrs?.href)) || isNuxtLink
            const url = (slot.componentOptions?.propsData as Record<'to', string>)?.to
            const isExternalLink = !!url && !isRelativePath(url)

            if (isRelativeLink) linkAttributes.to = url
            if (isExternalLink) {
                linkAttributes.href = url
                linkAttributes.target = '_blank'
            }

            if (slot?.tag) slotIndex++
            return createElement(
                'transition',
                {
                    props: {
                        name: 'item-project',
                    },
                    // on: {
                    //     afterEnter(element: HTMLElement) {
                    //         element.style.transform = 'translateX(0)'
                    //     },
                    //     enter(element: HTMLElement) {
                    //         element.style.transform = 'translateX(100%)'
                    //     },
                    //     leave(element: HTMLElement) {
                    //         element.style.transform = 'translateX(0)'
                    //     },
                    // },
                },
                [
                    createElement(
                        isRelativeLink ? 'nuxt-link' : isExternalLink ? 'a' : slot?.tag,
                        {
                            ...slot.context?.$props,
                            props: slot.data?.props,
                            class: [slot.data?.class, 'item-project'],
                            style: { '--index': slotIndex },
                            attrs: linkAttributes,
                            directives: [
                                {
                                    name: 'show',
                                    value: props.enter,
                                },
                            ],
                        },
                        [isRelativeLink ? slot.componentOptions?.children : slot?.children]
                    ),
                ]
            )
        })

        // const transition =
        //     props.enabled &&

        return (
            (props.inline && children) ||
            (children && createElement('div', { ...data, ...props }, [children])) ||
            context.slots().default ||
            createElement('')
        )
    },
})
</script>
<style lang="scss" module>
//.item {
//    position: relative;
//}
</style>
