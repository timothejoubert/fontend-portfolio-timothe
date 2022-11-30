<template>
    <component
        :is="internalTag"
        :class="classNames"
        :disabled="internalTag === 'button' && disabled"
        v-bind="linkProps"
        @click="onClick"
    >
        <span ref="inner" class="v-button__inner">
            <span v-if="$slots.icon || $scopedSlots.icon" class="v-button__icon">
                <slot name="icon" />
            </span>
            <span v-if="$slots.input || $scopedSlots.input" class="v-button__input">
                <slot name="input" />
            </span>
            <span v-if="$slots.default || $scopedSlots.default || label" class="v-button__label">
                <slot>{{ label }}</slot>
            </span>
        </span>
    </component>
</template>

<script lang="ts">
import Vue from 'vue'
import './_hover.scss'
import { isPromoteFilter, isRandomFilter } from '~/utils/get-input-type'
import { EventClickInput } from '~/components/atoms/VInputFactory.vue'

function isRelativePath(path: string): boolean {
    return path.charAt(0) === '/'
}

export default Vue.extend({
    name: 'VButton',
    props: {
        value: [String, Boolean],
        name: String,
        filled: Boolean,
        label: [String, Boolean],
        size: [String, Boolean],
        elevated: Boolean,
        rounded: Boolean,
        outlined: Boolean,
        disabled: Boolean,
        tag: [String, Boolean],
        theme: [String, Boolean],
        color: [String, Boolean],
        direction: {
            type: [String, Boolean],
            validator(value): boolean {
                return (typeof value === 'string' && ['ltr', 'rtl'].includes(value)) || typeof value === 'boolean'
            },
            default: 'rtl',
        },
        href: [String, Boolean], // external link
        to: [String, Object, Boolean], // internal link (use NuxtLink)
    },
    computed: {
        classNames(): (string | boolean | undefined)[] {
            return [
                'v-button',
                this.outlined && 'v-button--outlined',
                this.filled && 'v-button--filled',
                this.disabled && 'v-button--disabled',
                this.rounded && 'v-button--rounded',
                !this.$slots.default && !this.$scopedSlots.default && !this.label && 'v-button--icon',
                this.direction === 'rtl' && 'v-button--rtl',
                typeof this.size === 'string' && 'v-button--size-' + this.size,
                typeof this.theme === 'string' && 'v-button--theme-' + this.theme,
            ]
        },
        internalTag(): string {
            if (typeof this.tag === 'string') return this.tag

            if (this.to || (typeof this.href === 'string' && isRelativePath(this.href))) return 'nuxt-link'
            else if (this.href) return 'a'
            else return 'button'
        },
        linkProps(): Record<string, any> {
            const props: Record<string, any> = {}

            if (this.to) {
                props.to = this.to
            } else if (typeof this.href === 'string' && isRelativePath(this.href)) {
                props.to = this.href
            } else if (this.href) {
                props.href = this.href
                props.target = '_blank'
            }

            return props
        },
    },
    methods: {
        onClick(event: MouseEvent) {
            console.log('click on:', this.name)
            const value = (event.target as HTMLInputElement).value
            this.$emit('update', { value, inputName: this.name } as EventClickInput)
        },
    },
})
</script>

<style lang="scss">
@use 'sass:math';

.v-button {
    @include v-button-default-css-vars($v-button-vars);
    @include theme-variants;

    position: relative;
    display: inline-block;
    border: none;
    color: inherit;
    font-weight: bold;
    line-height: math.div(22, 18);
    text-decoration: none;
    transition: background-color 0.3s;

    @media (prefers-reduced-motion: reduce) {
        transition: none;
    }

    &--disabled {
        pointer-events: none; // prevents click on disabled link (<a> or <nuxt-link>)
    }

    &--rounded {
        @include v-button-default-css-vars($v-button-rounded-vars, '-rounded');
    }

    &--filled {
        background-color: var(--color-main);
        color: var(--color-bg);
    }

    &--filled#{&}--theme-light {
        background-color: var(--color-bg);
        color: var(--color-main);
    }

    &--filled#{&}--disabled {
        background-color: rgba(black, 0.2);
        color: color('grey-500');
    }

    &:not(#{&}--filled)#{&}--disabled {
        color: color('grey-500');
    }

    &--outlined#{&}--disabled {
        background-color: transparent;
        color: rgba(black, 0.3);
    }

    // sizes
    $vars: map-remove($v-button-vars, default);

    @each $key, $value in $vars {
        &--size-#{$key} {
            @include v-button-size($key);
        }
    }
}

.v-button__inner {
    @include v-button-default-css-vars($v-button-inner-vars, '-inner');

    display: flex;
    align-items: center;
    justify-content: center;
    text-align: left;

    .v-button:not(.v-button--outlined):not(.v-button--filled) & {
        padding: 0;
    }

    .v-button--icon & {
        padding: 0;
    }

    .v-button--outlined & {
        border-width: var(--btn-border-width, 1px);
        border-style: solid;
        border-color: var(--color-bg);
        border-radius: inherit;
        transition: all 0.3s;
    }

    .v-button--outlined.v-button--theme-light & {
        border-color: var(--color-main);
    }
}

.v-button__icon {
    @include v-button-default-css-vars($v-button-icon-vars, '-icon');
    @include v-button-default-css-vars($v-button-icon-size-vars, '-icon-size');

    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 0;

    .v-button:not(.v-button--rtl) &:first-child {
        margin-left: 0;
    }

    &:first-child:last-child {
        margin: 0;
    }

    .v-button--rtl & {
        order: 2;
        margin-right: 0;
    }

    & svg {
        width: var(--v-button-icon-size-width);
        height: auto;
    }
}

.v-button__input {
    all: unset;
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    height: 100%;
    padding: 0;
    border: none;
    appearance: none;
    opacity: 0;
    outline: none;

    & > input {
        width: 100%;
        height: 100%;
    }
}

.v-button__label {
    @include v-button-default-css-vars($v-button-label-vars, '-label');

    line-height: 0;
    transition: color 0.3s;

    @media (prefers-reduced-motion: reduce) {
        transition: none;
    }

    .v-button:not(.v-button--filled):not(.v-button--outlined) & {
        position: relative;

        &::before {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 2px;
            background-color: currentColor;
            content: '';
            opacity: 0;
        }
    }
}
</style>
