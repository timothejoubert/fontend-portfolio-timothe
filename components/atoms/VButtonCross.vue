<script lang="ts">
import Vue from 'vue'
import type { VNode } from 'vue'

export default Vue.extend({
    name: 'VButtonCross',
    functional: true,
    props: {
        url: String,
    },
    render(createElement, context): VNode {
        const { url } = context.props
        const event = {} as Record<'on', Record<string, () => void>>
        if (url) event.on = { click: () => context.parent.$router.push({ path: url }) }

        return createElement('div', {
            ...event,
            class: [context.$style.cross],
        })
    },
})
</script>

<style lang="scss" module>
.cross {
    position: relative;
    display: block;
    width: rem(30);
    height: rem(30);
    cursor: pointer;
    transform: rotate(45deg);
    //transition: all 0.3s;

    &::before,
    &::after {
        position: absolute;
        top: calc(50% - 1px);
        left: 0;
        width: 100%;
        height: 2px;
        background-color: var(--color-main);
        content: '';
        transform-origin: center;
        transition: all 0.3s ease(out-quad);
    }

    &::after {
        transform: rotate(90deg);
    }
    &:hover::before {
        transform: scaleY(1.7);
    }
    &:hover::after {
        transform: rotate(90deg) scaleY(1.7);
    }
}
</style>
