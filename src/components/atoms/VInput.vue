<template>
    <button :class="rootClasses">
        <label :for="name" :class="$style.label">{{ label }}</label>
        <input
            :tabindex="!isVisible && '-1'"
            :class="$style.input"
            :type="type"
            v-bind="value && { value: value }"
            :data-checked="checked.toString()"
            :data-name="name"
            @input="onUpdate"
            @keypress.enter="onUpdate"
        />
        <span
            v-if="type === 'color'"
            :id="name"
            :class="$style.output"
            :style="{ backgroundColor: `var(--${name})` }"
        ></span>
        <transition :name="$style['icon-reveal']">
            <component :is="iconName" v-if="displayIcon" :class="$style.icon" />
        </transition>
    </button>
</template>

<script lang="ts">
import Vue from 'vue'
import type { PropType } from 'vue'
import IconValidate from '~/assets/images/icons/validate.svg?sprite'
import IconHeart from '~/assets/images/icons/heart.svg?sprite'
import IconShuffle from '~/assets/images/icons/shuffle.svg?sprite'
import IconDate from '~/assets/images/icons/date.svg?sprite'
import IconDateAsc from '~/assets/images/icons/date-asc.svg?sprite'
import IconDateDesc from '~/assets/images/icons/date-desc.svg?sprite'
import { isFilterButton, isTag } from '~/utils/get-input-type'

export default Vue.extend({
    name: 'VInput',
    components: { IconValidate, IconHeart, IconShuffle, IconDate, IconDateAsc, IconDateDesc },
    props: {
        isVisible: Boolean,
        name: String,
        icon: String,
        type: String as PropType<InputType>,
        value: [String, Boolean],
        label: String,
        checked: Boolean,
        outlined: Boolean,
    },
    computed: {
        rootClasses(): (string | false | undefined)[] {
            return [
                this.$style.root,
                !!this.checked && this.$style['root--checked'],
                this.enabledFocus && this.$style['root--focus'],
                this.enabledScaleIcon && this.$style['root--icon-scale'],
                this.enabledBackground && this.$style['root--background-checked'],
            ]
        },
        enabledScaleIcon(): boolean {
            return this.name === 'randomize' || this.name === 'promote' || isTag(this.name)
        },
        enabledBackground(): boolean {
            return this.name === 'promote'
        },
        enabledFocus(): boolean {
            return this.name === 'randomize' || this.name === 'date'
        },
        checkedTags(): string[] | [] {
            return this.$store.state.selectedFilter
        },
        isIconButton(): boolean {
            return isFilterButton(this.name) && !!this.iconName
        },
        isTagButton(): boolean {
            return (
                isTag(this.name) &&
                !!this.checkedTags &&
                !!this.checkedTags.filter((tag: string) => this.name.includes(tag))?.length
            )
        },
        displayIcon(): boolean {
            return this.isIconButton || this.isTagButton
        },
        iconName(): string {
            if (!this?.icon) return ''
            if (this.name === 'date') {
                return this.checked ? 'IconDateAsc' : 'IconDateDesc'
            } else {
                return `Icon${this.uppercaseFirstLetter(this.icon)}`
            }
        },
    },
    methods: {
        onUpdate(event: InputEvent) {
            const value = (event.target as HTMLInputElement).value
            this.$emit('update', { value, inputName: this.name })
        },
        uppercaseFirstLetter(name: string): string {
            return name.charAt(0).toUpperCase() + name.slice(1)
        },
    },
})
</script>

<style lang="scss" module>
.root {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.3s;

    &--checked#{&}--background-checked {
        background-color: var(--color-accent);
    }

    &--focus:active {
        outline: 1px solid var(--color-accent) !important;
    }
}

.inner {
    display: flex;
    align-items: center;
    padding: rem(8) rem(10);
}

.output {
    display: inline-block;
    width: 11px;
    height: 11px;
    border: 1px solid var(--color-bg);
    margin-left: rem(8);
}

.input {
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
}

.icon {
    width: rem(19);
    height: auto;
    margin-left: rem(8);
    opacity: 1;

    .root--checked.root--icon-scale & {
        animation: icon-checked 0.25s ease(out-quad);
        transform-origin: center;
    }
}

@keyframes icon-checked {
    0% {
        transform: scale(1);
    }
    5% {
        transform: scale(1.1);
    }
    50% {
        transform: scale(0.4);
    }
    100% {
        transform: scale(1);
    }
}

.icon-reveal {
    &:global(#{'-enter-active'}),
    &:global(#{'-leave-active'}) {
        transition: 0.3s ease(out-quad);
        transition-property: transform, opacity, margin-left;
    }
    &:global(#{'-enter'}),
    &:global(#{'-leave-to'}) {
        width: 0;
        margin-left: 0;
        opacity: 0;
        transform: translateX(-6px);
    }
}
</style>
