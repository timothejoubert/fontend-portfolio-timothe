<template>
    <div :class="rootClasses">
        <label :for="name" :class="$style.label">{{ label }}</label>
        <span
            v-if="type === 'color'"
            :id="name"
            :class="$style.output"
            :style="{ backgroundColor: `var(--${name})` }"
        ></span>
        <icon-validate v-if="checked" :class="$style.icon" />
        <input
            :tabindex="!isVisible && '-1'"
            :class="$style.input"
            :type="type"
            :value="value"
            :checked="checked"
            :name="name"
            @input="onUpdate"
        />
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import type { PropType } from 'vue'
import IconValidate from '~/assets/images/icons/validate.svg?sprite'

export default Vue.extend({
    name: 'VInput',
    components: { IconValidate },
    props: {
        isVisible: Boolean,
        name: String,
        type: String as PropType<InputType>,
        value: String,
        label: String,
        checked: Boolean,
    },
    computed: {
        rootClasses(): (string | false | undefined)[] {
            return [this.$style.root, !!this.checked && this.$style['root--checked']]
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
    justify-content: center;
    align-items: center;
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

.icon {
    width: rem(17);
    height: auto;
    margin-left: rem(6);
}
</style>
