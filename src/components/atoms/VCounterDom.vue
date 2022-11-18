<script lang="ts">
import Vue from 'vue'
import type { VNode } from 'vue'

function isRelativePath(path?: string): boolean {
    return !!path && path.charAt(0) === '/'
}

const NUXT_LINK_TAG_NAME = 'vue-component-37-NuxtLink'

export default Vue.extend({
    name: 'VCounterDom',
    functional: true,
    props: {
        enabled: { type: Boolean, default: true },
        enter: Boolean,
        inline: Boolean,
        transitionName: { type: String, default: 'item' },
        startIndex: { type: Number, default: 0 },
    },
    render(createElement, context): VNode | VNode[] {
        const { props, data } = context
        if (!context.slots().default) return createElement('')
        if (!props.enabled) return createElement('div', { ...data }, context.slots().default)

        let slotIndex = props.startIndex

        const children = context.slots().default.map((slot: VNode) => {
            const linkAttributes = {} as Record<'to' | 'href' | 'target', string>
            const isNuxtLink = slot?.tag === NUXT_LINK_TAG_NAME || (!!slot?.tag && slot.tag.includes('NuxtLink'))
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
            )
        })

        const transitions = children.map((slot: VNode) => {
            return slot?.tag
                ? createElement(
                      'transition',
                      {
                          props: {
                              name: props.transitionName,
                          },
                      },
                      [slot]
                  )
                : createElement('')
        })

        return (
            (props.inline && !props.transitionName && children) ||
            (props.inline && props.transitionName && transitions) ||
            (props.transitionName && createElement('div', { ...data, ...props }, [transitions])) ||
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
