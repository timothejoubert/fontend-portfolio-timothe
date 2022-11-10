<template>
    <footer :class="rootClasses" :style="{ '--socials-width': socialsWidth }">
        <button :class="$style['about-link']" aria-labelledby="button-toggle-about" @click="onClick">
            <span v-if="about.title" class="body-s">{{ about.title }}</span>
            <span :class="$style.cross"></span>
        </button>
        <ul v-if="socials" ref="socials" :class="$style.socials">
            <li v-for="(social, i) in socials" :key="i" :class="$style.social">
                <a :href="social.url" target="_blank" :name="social.name">
                    {{ social.name }}
                </a>
            </li>
        </ul>
    </footer>
</template>

<script lang="ts">
import Vue from 'vue'
import type { PropType } from 'vue'
import eventBus from "~/utils/event-bus";
import EventType from "~/constants/event-type";

export default Vue.extend({
    name: 'VFooter',
    props: {
        about: Object as PropType<AboutBlock>,
        isProjectOpen: Boolean,
        isAboutOpen: Boolean,
    },
    data() {
        return {
            socialsWidth: '0px',
        }
    },
    computed: {
        rootClasses(): (string | false | undefined)[] {
            return [
                this.$style.root,
                this.isProjectOpen && this.$style['root--collapsed'],
                this.isAboutOpen && this.$style['root--open'],
            ]
        },
        socials(): Socials[] | false {
            return !!this.about?.socials?.length && this.about.socials
        },
    },
    mounted() {
        this.getSocialsWidth()
    },
    methods: {
        onClick() {
            this.$emit('toggleAbout')
        },
        getSocialsWidth() {
            this.socialsWidth = (this.$refs?.socials as HTMLElement)?.offsetWidth + 'px' || '0px'
        },
    },
})
</script>

<style lang="scss" module>
.root {
    position: sticky;
    top: 0;
    z-index: 1;
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: flex-end;
    height: calc(var(--top-bar-height) * 1px);
    background-color: var(--color-bg);

    @include media('>=md') {
        position: relative;
    }
}

.about-link {
    position: absolute;
    left: 0;
    display: flex;
    height: 100%;
    align-items: center;
    cursor: pointer;
    transition: transform var(--project-duration) ease(out-quart);

    @include media('>=md') {
        transform: translateX(calc(50vw - 50% - var(--socials-width, '0px') / 4));

    }

    .root--collapsed & {
        transform: translateX(0);
    }
}

.cross {
    position: absolute;
    right: 0;
    display: block;
    width: rem(20);
    height: rem(20);
    opacity: 0;
    transform: translateX(12px) rotate(0);
    transform-origin: center;
    transition: 0.3s 0.55s;
    transition-property: transform, opacity;

    .root--open & {
        opacity: 1;
        transform: translateX(calc(100% + 8px)) rotate(45deg);
    }

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
}

.socials {
    display: flex;
    padding: rem(10) 0;
}

.social {
    margin: 0 rem(10);
}
</style>
