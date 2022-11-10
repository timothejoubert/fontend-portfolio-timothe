<template>
    <nav :class="rootClasses">
        <component
            :is="isHomePage && !isAboutOpen ? 'nuxt-link' : 'div'"
            :to="isHomePage ? '/' : undefined"
            :class="[$style.logo, 'text-h3']"
            @click="onLogoClick"
            >FOURRE TOUT</component
        >
        <button
            :class="$style.setting"
            :aria-label="`${value ? 'Close' : 'Open'} options panel`"
            type="button"
            role="switch"
            :aria-checked="value.toString()"
            @click="updateUiOptionsState"
        >
            <svg width="28" height="23" viewBox="0 0 28 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="4" width="2" height="23" rx="1" :class="$style.rect" />
                <rect x="13" width="2" height="23" rx="1" :class="$style.rect" />
                <rect x="22" width="2" height="23" rx="1" :class="$style.rect" />
                <circle cx="5" cy="13" r="4" :class="$style.circle" stroke-width="2" />
                <circle cx="23" cy="13" r="4" :class="$style.circle" stroke-width="2" />
                <circle cx="14" cy="8" r="4" :class="[$style.circle, $style['circle--center']]" stroke-width="2" />
            </svg>
        </button>
    </nav>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'

export default Vue.extend({
    name: 'VTopBar',
    props: {
        value: Boolean,
    },
    computed: {
        ...mapGetters(['isAboutOpen', 'isUiOptionsOpen']),
        isHomePage(): boolean {
            return this.$route.path !== '/'
        },
        rootClasses(): (string | boolean | undefined)[] {
            return [
                this.$style.root,
                (this.isAboutOpen || this.isUiOptionsOpen) && this.$style['root--modal-open'],
                this.isAnimationEnter && this.$style['root--enter'],
            ]
        },
        isAnimationEnter(): boolean {
            return this.$store.state.animationEnter
        },
    },
    methods: {
        updateUiOptionsState() {
            this.$emit('toggle-options')
        },
        onLogoClick() {
            if (this.isAboutOpen) {
                this.$emit('toggleAbout')
            }
            if (this.isUiOptionsOpen) {
                this.updateUiOptionsState()
            }
        },
    },
})
</script>

<style lang="scss" module>
.root {
    position: relative;
    z-index: 20;
    display: flex;
    height: calc(var(--top-bar-height) * 1px);
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid var(--color-main);
    margin: 0 var(--padding-border);
    background-color: var(--color-bg);
    transform: translateY(calc(var(--top-bar-height) * -1px));
    transition: transform 0.6s 0.2s;

    &--enter {
        transform: translateY(0);
    }
}

.logo {
    text-transform: uppercase;

    .root--modal-open & {
        cursor: pointer;
    }

    &::before {
        position: relative;
        display: inline-block;
        overflow: hidden;
        width: 22px;
        height: 22px;
        margin-right: 7px;
        background-color: var(--color-main);
        border-top-right-radius: 8px;
        content: '';
    }
}

.setting {
    width: rem(30);
}

.rect,
.circle {
    fill: var(--color-main);
}
.circle {
    stroke: var(--color-bg);
    transition: transform 0.3s ease(out-quint);

    .setting:hover & {
        transform: translateY(-20%);
    }

    .setting:hover &--center {
        transform: translateY(30%);
    }
}
</style>
