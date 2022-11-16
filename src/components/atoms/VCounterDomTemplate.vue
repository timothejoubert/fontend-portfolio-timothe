<template>
    <div :class="$style.root">
        <h1>VCounterDomTemple</h1>
        <slot v-for="(slot, slotIndex) in $slots.default" :style="{ index: slotIndex }"></slot>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import type { PropType, VNode } from 'vue'

export default Vue.extend({
    name: 'VCounterDomTemplate',
    props: {
        items: Array as PropType<VNode[]>,
        enabled: { type: Boolean, default: true },
    },
})
</script>

<style lang="scss" module>
.root {
    position: relative;
}
</style>
