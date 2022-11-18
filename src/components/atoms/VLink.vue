<script lang="ts">
import Vue from 'vue'
import type { PropType, VNode } from 'vue'

function isRelativePath(path?: string): boolean {
    return !!path && path.charAt(0) === '/'
}

function checkDomain(url?: string): string {
    if (!url) return ''
    if (url.indexOf('//') === 0) {
        url = location.protocol + url
    }
    return url
        .toLowerCase()
        .replace(/([a-z])?:\/\//, '$1')
        .split('/')[0]
}

function isExternalPath(url?: string): boolean {
    return (
        !!url &&
        ((url.length > 1 && url.includes(':')) || url.includes('//')) &&
        checkDomain(location.href) !== checkDomain(url)
    )
}

interface LinkDocument {
    type?: string
    url?: string
}

export default Vue.extend({
    name: 'VLink',
    functional: true,
    props: {
        label: [String, Boolean],
        href: String,
        document: Object as PropType<LinkDocument>,
    },
    render(createElement, context): VNode | VNode[] {
        const src = context.props.href
        const document = context.props.document
        const label: string | undefined | boolean = context.props.label

        const isExternal = isExternalPath(src)
        const isInternal = isRelativePath(src)
        const isDocument = !isInternal && !isExternal && !!document && !!document?.url

        if (!src && !document && !label) {
            return (
                context.scopedSlots.default?.({ label: context.props.label }) ||
                context.slots()?.default ||
                (context.props.label && createElement('span', [context.props.label])) ||
                createElement('')
            )
        }

        if (!src && !document) {
            return context.slots()?.default || (label ? createElement('span', String(label)) : createElement(''))
        }

        let target!: string
        let href!: string
        let rel!: string
        let to!: string
        let tag!: string

        if (isExternal || isDocument) {
            tag = 'a'
            href = src
            target = '_blank'
            rel = 'noopener'
        } else if (isInternal) {
            tag = 'nuxt-link'
            to = src
        }

        return createElement(
            tag,
            {
                ...context.data,
                attrs: {
                    ...context.data.attrs,
                    rel,
                    href,
                    target,
                },
                props: {
                    to,
                },
            },
            context.slots()?.default || (label && String(label)) || ''
        )
    },
})
</script>
