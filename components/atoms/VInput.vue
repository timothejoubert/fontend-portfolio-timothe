<template>
    <div :class="$style.root">
        <label :for="name" :class="$style.label">{{ name }}</label>
        <span :id="name" :class="$style.output" :style="{ backgroundColor: `var(--${name})` }"></span>
        <input
            :tabindex="!isVisible && '-1'"
            :class="$style.input"
            :type="type"
            :value="value"
            :name="name"
            @input="onUpdate"
        />
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import type { PropType } from 'vue'

export default Vue.extend({
    name: 'VInput',
    props: {
        isVisible: Boolean,
        name: String,
        type: String as PropType<InputType>,
        value: String,
    },
    methods: {
        onUpdate(event: InputEvent) {
            const value = (event.target as HTMLInputElement).value
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
</style>
