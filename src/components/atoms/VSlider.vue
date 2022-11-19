<template>
    <div :class="$style.root">
        <input
            :id="name"
            ref="slider"
            :tabindex="!isVisible && '-1'"
            type="range"
            :min="min"
            :step="step"
            :max="max"
            :class="$style.slider"
            @input="onUpdate"
        />
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import type { PropType } from 'vue'
import { getBreakpointValue } from '~/utils/media'
// import { getCssProp } from '~/utils/utils'

export default Vue.extend({
    name: 'VSlider',
    props: {
        isVisible: Boolean,
        name: String,
        options: Array as PropType<SelectOption[]>,
        value: String,
        min: String,
        max: String,
        step: String,
    },
    computed: {},
    watch: {
        maxRange() {
            const value = (this.$refs.slider as HTMLInputElement).value
            this.$emit('update', { value, name: this.name })
        },
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
    width: 400px;
}

.slider {
    //-webkit-appearance: none;
    width: 100%;
    background-color: transparent;
}

//.slider[type='range']:focus {
//    outline: none;
//}

.slider[type='range']::-webkit-slider-runnable-track {
    width: 100%;
    height: 5px;
    border: none;
    background: var(--light-color);
    border-radius: 5px;
}
.slider[type='range']::-webkit-slider-thumb {
    width: 25px;
    height: 25px;
    border: none;
    -webkit-appearance: none;
    background: var(--light-color);
    border-radius: 50%;
    cursor: pointer;
    transform: translateY(calc(-50% + 2px));
}
//.slider:focus::-webkit-slider-thumb {
//    background: var(--color-accent);
//}
</style>
