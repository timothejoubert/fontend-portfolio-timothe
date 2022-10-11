<template>
    <div :class="$style.root">
        <label :for="name" :class="$style.label" >{{ name }}</label>
        <span v-if="displayOutput" :id="name" :class="$style.output" >{{ value }}</span>
        <input :class="$style.input" :type="type" :value="value" :name="name" @input="$emit('update', $event)" />
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import type { PropType } from 'vue'

type InputType = 'color' | 'range' | 'checkbox' | 'number' | 'radio' | 'reset' | 'text' | 'url'

export default Vue.extend({
    name: 'About',
    props: {
        name: String,
        type: String as PropType<InputType>,
        value: String,
        displayOutput: Boolean,
    },
    watch: {
        value(current: string): void {
            console.log('watch value', current)
        },
    },
    methods: {
        // updateValue(event: InputEvent) {
        //     this.$emit('update', event)
        // },
    },
})
</script>

<style lang="scss" module>
.root {
    position: relative;
    display: inline-block;
    padding: rem(8px) rem(15);
    background-color: var(--color-main);
    border-radius: 100px;

    &:not(:last-child) {
        margin-right: rem(30);
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

.input {
    all: unset;
    display: inline-block;
    width: rem(22);
    height: rem(22);
    border: none;
    outline: none;
}
</style>
