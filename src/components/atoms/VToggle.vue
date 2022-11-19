<template>
    <div :class="[$style.root, isChecked && $style['root--checked']]">
        <label :for="name" :class="$style.label">{{ label }}</label>
        <input
            type="checkbox"
            :tabindex="!isVisible && '-1'"
            :name="name"
            :value="value"
            :class="$style.input"
            @input="onUpdate"
        />
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import type { PropType } from 'vue'

export default Vue.extend({
    name: 'VToggle',
    props: {
        isVisible: Boolean,
        name: String,
        label: String,
        type: String as PropType<InputType>,
        value: String,
    },
    data() {
        return {
            isChecked: false,
        }
    },
    methods: {
        onUpdate(event: InputEvent) {
            const value = (event.target as HTMLInputElement).checked
            this.isChecked = value
            this.$emit('update', { value, name: this.name })
        },
    },
})
</script>
<style lang="scss" module>
.root {
    position: relative;
    display: inline-flex;
    align-items: center;
    padding: rem(8) rem(15);
    background-color: var(--color-main);
    border-radius: 100px;
    cursor: pointer;

    &--checked {
        background-color: var(--color-accent);
    }
}

.inner {
    display: flex;
    align-items: center;
    padding: rem(8) rem(10);
}

.label {
    color: var(--color-bg);
}

.output {
    display: inline-block;
    width: 12px;
    height: 12px;
    border: 1px solid var(--color-bg);
    margin-left: rem(10);
}

.input {
    //all: unset;
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    height: 100%;
    padding: 0;
    //border: none;
    appearance: none;
    opacity: 0;
    //outline: none;
}
</style>
