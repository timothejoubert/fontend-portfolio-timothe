<template>
    <select :id="name" :tabindex="!isVisible && '-1'" :name="name" :class="$style.root" @change="onChange">
        <option value="">{{ label }}</option>
        <option v-for="(option, i) in options" :key="i" :value="option.value">
            {{ option.name }}
        </option>
    </select>
</template>

<script lang="ts">
import Vue from 'vue'
import type { PropType } from 'vue'

export default Vue.extend({
    name: 'VSelect',
    props: {
        isVisible: Boolean,
        name: String,
        options: Array as PropType<SelectOption[]>,
        value: String,
        label: String,
    },
    methods: {
        onChange(event: Event) {
            const value = (event.target as HTMLInputElement).value
            this.$emit('update', { value, inputName: this.name })
        },
    },
})
</script>

<style lang="scss" module>
.root {
    position: relative;
    padding: rem(8) rem(34) rem(8) rem(15);
    border: none;
    appearance: none;
    background-color: var(--color-main);
    background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
    background-position: right rem(11) center;
    background-repeat: no-repeat;
    background-size: 1em;
    color: var(--color-bg);
    outline: none;

    //&:focus {
    //    border: none;
    //    outline: none;
    //}
}
</style>
