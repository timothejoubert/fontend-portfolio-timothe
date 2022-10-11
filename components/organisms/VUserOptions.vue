<template>
    <section v-if="open" :class="$style.root">
        <div :class="$style.section">
            <div :class="$style.head">
                <h3 :class="$style.title">interface</h3>
                <v-button :class="$style.reset" @on-click="resetColors" theme="yellow">Reset</v-button>
            </div>
            <div :class="$style.content">
                <v-input v-model="colorMain" name="color-main" type="color" @update="update" />
                <v-input v-model="colorBG" name="color-bg" type="color" @update="update" />
                <v-input v-model="colorAccent" name="color-accent" type="color" @update="update" />
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import Vue from 'vue'
import Colors from '~/constants/colors'
import VButton from '~/components/atoms/VButton.vue'
import VInput from '~/components/atoms/VInput.vue'

interface InputTarget {
    name: string
    value: string
}

export default Vue.extend({
    name: 'VUserOptions',
    components: { VButton, VInput },
    props: {
        open: Boolean,
    },
    data() {
        return {
            colorMain: Colors.MAIN,
            colorBG: Colors.BG,
            colorAccent: Colors.ACCENT,
        }
    },
    methods: {
        update(event: InputEvent): void {
            if (!event?.target) return
            const target = event.target as unknown as InputTarget
            const name = target.name
            const isColor = name.includes('color')

            if (isColor) {
                const cssVarName = name.replace('Color', '')
                this.setCssProp(`--${cssVarName}`, target.value)
                console.log('update val', `--${cssVarName}`, target.value)
            }
        },
        getCssProp(propName: string) {
            return getComputedStyle(document.documentElement).getPropertyValue(propName)
        },
        setCssProp(propName: string, value: string) {
            return document.documentElement.style.setProperty(propName, value)
        },
        resetColors(): void {
            // console.log(Colors)
            console.log(this.colorMain)

            this.colorMain = Colors.MAIN
            this.colorBG = Colors.BG
            this.colorAccent = Colors.ACCENT
            this.setCssProp(`--color-main`, Colors.MAIN)
            this.setCssProp(`--color-bg`, Colors.BG)
            this.setCssProp(`--color-accent`, Colors.ACCENT)
            console.log(this.colorMain)

            // for (const key in Colors) {
            //     console.log(Colors[key])
            // }
        },
    },
})
</script>

<style lang="scss" module>
.root {
    position: relative;
}

.section {
    padding: rem(40) 0;
}

.title,
.reset {
    display: inline-block;
}
</style>
