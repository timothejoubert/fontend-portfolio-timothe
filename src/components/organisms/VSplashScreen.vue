<template>
    <div :class="rootClasses">
        <div :class="$style.center">
            <v-split-word
                ref="title"
                :class="[$style.title, 'text-h1']"
                :content="titleSite"
                :displayed="start"
                default-hidden
                transition-end-event
                @transitionend="onTransitionEnd"
            />
            <div ref="slider" :class="$style.slider"></div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'

interface UpdateClass {
    add?: string[]
    remove?: string[]
}

export default Vue.extend({
    name: 'VSplashScreen',
    props: {
        start: Boolean,
    },
    data() {
        return {
            titleSite: 'tim',
            rootClasses: [this.$style.root, 'splash'] as string[],
            animateInDone: false,
        }
    },
    computed: {
        rootClass: {
            get(): string[] {
                return this.rootClasses
            },
            set(classes: UpdateClass) {
                if (Object.keys(classes).length === 0) this.rootClasses = []
                classes?.add?.forEach((value: string) => {
                    this.rootClasses.push(value)
                })
                classes?.remove?.forEach((value: string) => {
                    this.rootClasses.splice(this.rootClasses.indexOf(value), 1)
                })
            },
        },
    },
    watch: {
        start(state: boolean) {
            if (state) this.startLoading()
        },
    },
    mounted() {
        if (this.start) this.startLoading()
    },
    methods: {
        startLoading() {
            this.rootClass = { add: ['load'] }
        },
        loadingReverse() {
            this.rootClass = { add: ['load--finish'], remove: ['load'] }
        },
        onTransitionEnd() {
            if (this.animateInDone) this.initSplashScreenFinish()
            this.initLoadingReverse()
            this.animateInDone = true
        },
        initLoadingReverse() {
            window.setTimeout(() => {
                this.loadingReverse()
            }, 300)
        },
        initSplashScreenFinish() {
            window.setTimeout(() => {
                this.$emit('splashScreenDone')
            }, 800)
        },
    },
})
</script>

<style lang="scss" module>
$delay-bar: 0s;
$duration-bar: 0.2s;

$delay-cursor: $delay-bar + $duration-bar;
$duration-cursor: 1.4s;

$delay-background: 0.7s;
$duration-background: 0.9s;

.root {
    position: fixed;
    z-index: 100;
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
    background-color: var(--color-main);

    &::after {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: var(--color-bg);
        border-radius: 8px 64px 8px 8px;
        content: '';
        transform: scale(0.996, 0.992);
        transition: transform $duration-background $delay-background ease(in-back);
    }

    &:global(.load)::after {
        transform: scale(1.04);
    }

    &:global(.load--finish)::after {
        transform: scale(1.04);
    }
}

.center {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.title {
    margin-bottom: 40px;
    text-align: center;
}

.slider {
    position: relative;
    width: 300px;
    height: 2px;
    background-color: var(--color-main);
    opacity: 0;
    transition: opacity $duration-bar $delay-bar ease(out-quart);

    .root:global(.load) & {
        opacity: 1;
    }

    &::after {
        position: absolute;
        top: -8px;
        width: 18px;
        height: 18px;
        border: 2px solid var(--color-main);
        background-color: var(--color-bg);
        content: '';
        transition: transform $duration-cursor $delay-cursor ease(out-quart);
    }

    .root:global(.load) &::after {
        transform: translateX(300px) !important;
    }
    .root:global(.load--finish) &::after {
        transition-delay: 0.2s;
    }
}
</style>
