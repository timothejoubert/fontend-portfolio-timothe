<template>
    <section :class="rootClasses">
        <div :class="$style.head">
            <h1>## Page error ## 🤦‍ Probablement une 404...️</h1>
            <v-button-cross url="/" />
        </div>
        <p>{{ message }}</p>
    </section>
</template>

<script lang="ts">
import Vue from 'vue'
import VButtonCross from '~/components/atoms/VButtonCross.vue'

export interface ErrorComponent extends Vue {
    onClick(): void
}

export default Vue.extend({
    components: { VButtonCross },
    layout: 'error',
    computed: {
        rootClasses(): (undefined | false | string)[] {
            return [this.$style.root, this.isPageProject && this.$style['root--project']]
        },
        message(): string {
            return this.isPageProject
                ? `J'en peux plus de cette page de projet qui bug !!`
                : "Y a un pb je sais pas d'ou ça vient"
        },
        isPageProject(): boolean {
            return !!this.$route.path.includes('project')
        },
    },
})
</script>

<style lang="scss" module>
.root {
    position: relative;

    &--project {
        position: fixed;
        right: 0;
        width: 50vw;
        min-height: 100vh;
        padding: 0 var(--padding-border);
        border-left: 1px solid var(--color-main);
    }
}
.head {
    display: flex;
    height: calc(var(--top-bar-height) * 1px);
    align-items: center;
    justify-content: space-between;
}
</style>
