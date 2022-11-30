<template>
    <div :class="rootClasses">
        <label :for="name" :class="$style.label">{{ label }}</label>
        <span
            v-if="type === 'color'"
            :id="name"
            :class="$style.output"
            :style="{ backgroundColor: `var(--${name})` }"
        ></span>
        <component :is="iconName" v-if="displayIcon" :class="$style.icon" />
        <input
            :tabindex="!isVisible && '-1'"
            :class="$style.input"
            :type="type"
            :value="value"
            :checked="checked"
            :name="name"
            @input="onUpdate"
            @keypress.enter="onUpdate"
        />
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import type { PropType } from 'vue'
import IconValidate from '~/assets/images/icons/validate.svg?sprite'
import IconHeart from '~/assets/images/icons/heart.svg?sprite'
import IconShuffle from '~/assets/images/icons/shuffle.svg?sprite'
import IconDate from '~/assets/images/icons/date.svg?sprite'
import { isFilterButton, isTag } from '~/utils/get-input-type'

export default Vue.extend({
    name: 'VInput',
    components: { IconValidate, IconHeart, IconShuffle, IconDate },
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
            return [this.$style.root, !!this.checked && this.$style['root--checked']]
        },
        checkedTags(): string[] {
            return this.$store.state.selectedFilter
        },
        isIconButton(): boolean {
            return isFilterButton(this.name) && !!this.iconName
        },
        isIconButtonActive(): boolean {
            return true
        },
        displayIcon(): boolean {
            return (
                this.isIconButton ||
                (isTag(this.name) &&
                    !!this.checkedTags &&
                    !!this.checkedTags.filter((tag: string) => this.name.includes(tag))?.length)
            )
        },
        iconName(): string {
            if (!this?.icon) return ''
            const parsedName = this.icon.charAt(0).toUpperCase() + this.icon.slice(1)
            return `Icon${parsedName}`
        },
    },
    methods: {
        onUpdate(event: InputEvent) {
            const value = (event.target as HTMLInputElement).value
            this.$emit('update', { value, inputName: this.name })
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
    //padding: rem(8) rem(15);
    //border-radius: 100px;
    cursor: pointer;
}

.inner {
    display: flex;
    align-items: center;
    padding: rem(8) rem(10);
}

.output {
    display: inline-block;
    width: 12px;
    height: 12px;
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
    width: rem(17);
    height: auto;
    margin-left: rem(8);
}
</style>
