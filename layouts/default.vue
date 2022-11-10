<template>
    <div :class="$style.root">
        <transition name="fade">
            <v-splash-screen
                v-if="displaySplashScreen && !isSplashDone"
                :start="displaySplashScreen"
                @splashScreenDone="onSplashScreenDone"
            />
        </transition>
        <div :class="[$style['main-layout'], isProjectOpen && $style['main-layout--minify']]">
            <header>
                <v-top-bar v-model="isOptionsOpen" @toggle-options="toggleOptions" @toggleAbout="toggleAbout" />
                <v-ui-options ref="optionsPanel" :is-open="isOptionsOpen" />
                <v-nav-project
                    ref="nav"
                    :is-about-open="isAboutOpen"
                    :class="[$style.nav, isOptionsOpen && isOnWindowTop && $style['nav--translate']]"
                    :style="{ '--option-panel-height': optionPanelHeight }"
                />
            </header>

            <div
                :class="[
                    $style.bottom,
                    isProjectOpen && $style['bottom--minify'],
                    isAboutOpen && $style['bottom--expand'],
                ]"
            >
                <v-footer
                    :about="about"
                    :is-project-open="isProjectOpen"
                    :is-about-open="isAboutOpen"
                    @toggleAbout="toggleAbout"
                />
                <transition name="transY-100">
                    <v-about v-if="isAboutOpen" :about="about" />
                </transition>
            </div>
        </div>

        <transition name="project">
            <nuxt v-if="isProjectOpen" />
        </transition>
    </div>
</template>

<script lang="ts">
import { Route } from 'vue-router/types/router'
import { mapGetters } from 'vuex'
import mixins from 'vue-typed-mixins'
import VTopBar from '~/components/organisms/VTopBar.vue'
import VNavProject from '~/components/organisms/VNavProject.vue'
import VAbout from '~/components/organisms/VAbout.vue'
import GeneralsConst from '~/constants/generals'
import toBoolean from '~/utils/to-boolean'
import MutationType from '~/constants/mutation-type'
import VUiOptions from '~/components/organisms/VUiOptions.vue'
import Resize from '~/mixins/Resize'

export default mixins(Resize).extend({
    components: { VTopBar, VNavProject, VAbout, VUiOptions },
    data() {
        return {
            displaySplashScreen: true,
            enterSplashScreen: false,
            isSplashDone: false,

            isProjectOpen: false,
            isOptionsOpen: false,
            isAboutOpen: false,
            currentProject: undefined as ProjectContent | undefined,
            optionPanelHeight: '',
            isOnWindowTop: true,
            navElement: {} as Element,
        }
    },
    computed: {
        ...mapGetters(['alreadyVisited']),
        about(): AboutBlock | null {
            return this.$store.state.aboutData
        },
    },
    watch: {
        $route(to: Route, _from: Route) {
            this.isProjectOpen = to.path.includes('project') // || (to.path.includes('about') && wasProject)
        },
    },
    mounted() {
        this.initRoute()
        this.isActiveScreenSplash()
        this.addVisitedInStorage()
        this.$nextTick(() => this.initOptionPanelHeight())
        this.navElement = (this.$refs.nav as Vue)?.$el
        this.navElement?.addEventListener('scroll', this.getScrollPosition)
    },
    beforeDestroy() {
        this.removeVisitedInStorage()
        this.navElement?.removeEventListener('scroll', this.getScrollPosition)
    },
    methods: {
        getScrollPosition() {
            this.isOnWindowTop = this.navElement.scrollTop < 30
        },
        onSplashScreenDone() {
            this.isSplashDone = true
            this.enterAllElements()
        },
        toggleOptions(): void {
            this.isOptionsOpen = !this.isOptionsOpen
            this.$store.commit(MutationType.IS_UI_OPTIONS_OPEN, this.isOptionsOpen)
            if (this.isAboutOpen) this.closeAbout()
        },
        closeOptions() {
            this.isOptionsOpen = false
            this.$store.commit(MutationType.IS_UI_OPTIONS_OPEN, false)
        },
        initRoute(): void {
            this.isProjectOpen = this.$route.path.includes('project')
            this.isAboutOpen = this.$route.path.includes('about')
        },
        toggleAbout(): void {
            this.isAboutOpen = !this.isAboutOpen
            this.$store.commit(MutationType.IS_ABOUT_OPEN, this.isAboutOpen)
            if (this.isOptionsOpen) this.closeOptions()
        },
        closeAbout() {
            this.isAboutOpen = false
            this.$store.commit(MutationType.IS_ABOUT_OPEN, false)
        },
        isActiveScreenSplash() {
            const alwaysDisplay =
                toBoolean(GeneralsConst.DISPLAY_SPLASH_SCREEN) && toBoolean(GeneralsConst.DISPLAY_ALWAYS_SPLASH_SCREEN)

            const displayOnFirstConnexion = toBoolean(GeneralsConst.DISPLAY_SPLASH_SCREEN) && this.isFirstConnexion()

            if (alwaysDisplay || displayOnFirstConnexion) {
                this.displaySplashScreen = true
            } else {
                this.displaySplashScreen = false
                this.enterAllElements()
            }
        },
        addVisitedInStorage() {
            localStorage.setItem('visited', 'true')
        },
        isFirstConnexion(): boolean {
            console.log('isFirstConnexion', !localStorage.getItem('visited'))
            return !localStorage.getItem('visited')
        },
        removeVisitedInStorage() {
            localStorage.removeItem('visited')
        },
        initOptionPanelHeight() {
            // TODO update on ResizeObserver
            this.optionPanelHeight = ((this.$refs.optionsPanel as Vue).$el as HTMLElement).offsetHeight + 'px'
        },
        enterAllElements() {
            this.$store.commit(MutationType.ANIMATION_ENTER, true)
        },
    },
})
</script>

<style lang="scss" module>
.root {
    display: flex;
    overflow: hidden;
    width: 100%;
    height: 100vh;
    color: var(--color-main);
}

.main-layout,
.bottom {
    width: 100%;
    transition: width var(--project-duration) ease(out-quart);

    &--minify {
        width: 50%;
    }
}

.main-layout {
    position: relative;
}

.nav {
    transition: padding-top 0.6s;

    &--translate {
        padding-top: calc(var(--option-panel-height) + 30px);
    }
}

.bottom {
    position: fixed;
    right: 0;
    bottom: 0;
    left: 0;
    height: calc(var(--top-bar-height) * 1px);
    padding: 0 var(--padding-border);
    border-top: 1px solid var(--color-main);
    background-color: var(--color-bg);
    transition: height var(--project-duration) ease(out-quart), width var(--project-duration) ease(out-quart);
    -ms-overflow-style: none; /* IE and Edge */
    overflow-y: scroll;
    scrollbar-width: none; /* Firefox */

    &::-webkit-scrollbar {
        display: none;
    }

    &--expand {
        height: calc(100vh - var(--top-bar-height) * 1px + 1px);
        //height: calc(90vh - var(--top-bar-height) * 1px);
    }
}
</style>
