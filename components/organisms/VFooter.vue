<template>
    <footer :class="rootClasses" :style="{ '--socials-width': socialsWidth }">
        <button :class="$style['about-link']" aria-labelledby="button-toggle-about" @click="onClick">
            <span v-if="about.title" :class="[$style.title, 'body-s']">{{ about.title }}</span>
            <span :class="[$style.icon, isAboutOpen && $style['icon--open']]">
                <span :class="$style['circle-outlined']"></span>
                <span
                    :class="$style['circle-filled']"
                    :style="onCloseCircleDelay && { transitionDelay: '0.6s' }"
                ></span>
                <!--                <span :class="$style.cross"></span>-->
                <icon-arrow :class="$style.arrow" />
                <icon-cross :class="$style.cross" />
            </span>
        </button>
        <ul v-if="socials" ref="socials" :class="$style.socials">
            <li v-for="(social, i) in socials" :key="i" :class="$style.social">
                <a :href="social.url" target="_blank">
                    <component :is="`icon-${social.name}`" :class="$style['social__icon']" />
                </a>
            </li>
        </ul>
    </footer>
</template>

<script lang="ts">
import Vue from 'vue'
import type { PropType } from 'vue'
import IconArrow from '~/assets/images/icons/arrow.svg?sprite'
import IconCross from '~/assets/images/icons/cross.svg?sprite'
import IconInstagram from '~/assets/images/icons/instagram.svg?sprite'
import IconGithub from '~/assets/images/icons/github.svg?sprite'
import IconP5 from '~/assets/images/icons/p5.svg?sprite'
import IconCodepen from '~/assets/images/icons/codepen.svg?sprite'

const validSocialName = ['instagram', 'github', 'codepen', 'p5', 'facebook', 'behance']

export default Vue.extend({
    name: 'VFooter',
    components: { IconArrow, IconCross, IconInstagram, IconGithub, IconP5, IconCodepen },
    props: {
        about: Object as PropType<AboutBlock>,
        isProjectOpen: Boolean,
        isAboutOpen: Boolean,
    },
    data() {
        return {
            socialsWidth: '0px',
            onCloseCircleDelay: false,
        }
    },
    computed: {
        rootClasses(): (string | false | undefined)[] {
            return [
                this.$style.root,
                this.isProjectOpen && this.$style['root--collapsed'],
                this.isAboutOpen && this.$style['root--open'],
            ]
        },
        socials(): Socials[] | false {
            return (
                !!this.about?.socials?.length &&
                this.about.socials.filter((social) => !!social?.name && validSocialName.includes(social.name))
            )
        },
    },
    mounted() {
        this.getSocialsWidth()
    },
    methods: {
        onClick() {
            this.$emit('toggleAbout')
            this.onCloseCircleDelay = true
            window.setTimeout(() => {
                this.onCloseCircleDelay = false
            }, 500)
        },
        getSocialsWidth() {
            this.socialsWidth = (this.$refs?.socials as HTMLElement)?.offsetWidth + 'px' || '0px'
        },
    },
})
</script>

<style lang="scss" module>
.root {
    position: sticky;
    z-index: 1;
    top: 0;
    display: flex;
    width: 100%;
    height: calc(var(--top-bar-height) * 1px);
    align-items: center;
    justify-content: flex-end;
    background-color: var(--color-bg);

    @include media('>=md') {
        position: relative;
    }
}

.about-link {
    position: absolute;
    left: 0;
    display: flex;
    height: 100%;
    align-items: center;
    //padding: 0 19px 0 0;
    cursor: pointer;
    transition: transform var(--project-duration) ease(out-quart);

    @include media('>=md') {
        transform: translateX(calc(50vw - 50% - var(--socials-width, '0px') / 2));
    }

    .root--collapsed & {
        transform: translateX(0);
    }
}

.title {
    transition: transform 0.4s ease(out-quad);

    .about-link:hover &,
    .root--open & {
        //transform: translateX(-5px);
    }
}

.icon {
    position: absolute;
    right: 0;
    display: flex;
    //overflow: hidden;
    width: 17px;
    height: 17px;
    align-items: center;
    justify-content: center;
    transform: translateX(calc(100% + 10px));
}

.circle-outlined {
    display: block;
    width: 5px;
    height: 5px;
    border: 0.2px solid var(--color-main);
    border-radius: 100%;
    opacity: 0.5;
    transform-origin: center;
    transition: transform 0.4s;

    .about-link:hover & {
        transform: scale(0.6);
    }
}

.circle-filled {
    position: absolute;
    z-index: 1;
    background-color: var(--color-main);
    border-radius: 100%;
    inset: 0;
    transform: scale(0);
    transition: transform 0.4s 0s ease(out-quart);

    .about-link:hover &,
    .root--open & {
        transform: scale(1);
        transition-delay: 0s !important;
    }

    @include media('<md') {
        transform: scale(1);
    }
}

.arrow {
    position: absolute;
    z-index: 2;
    display: flex;
    overflow: hidden;
    width: auto;
    height: 100%;
    align-items: center;
    justify-content: center;
    padding: 5px;
    color: var(--color-bg);
    inset: 0;
    transform: translateY(150%) rotate(-90deg);
    transform-origin: center center;
    transition: transform 0.3s ease(out-quad);

    .root:not(.root--open) .about-link:hover & {
        opacity: 1;
        transform: translateY(0%) rotate(-90deg);
    }

    .root--open & {
        transition-delay: 0.45s;
        transition-timing-function: ease(in-quad);
    }

    @include media('<md') {
        .root:not(.root--open) & {
            opacity: 1;
            transform: translateY(0%) rotate(-90deg);
        }
    }
}

.cross {
    position: absolute;
    z-index: 2;
    right: 0;
    display: block;
    width: 100%;
    height: 100%;
    padding: 5px;
    color: var(--color-bg);
    opacity: 0;
    transform: translateY(-100%);
    transition: 0.6s 0.2s ease(in-quad);
    transition-property: transform, opacity;

    .root--open & {
        opacity: 1;
        transform: translateY(0);
    }
}

.socials {
    display: flex;
    padding: rem(10) 0;
}

.social {
    display: flex;
    width: 26px;
    height: 26px;
    align-items: center;
    justify-content: center;
    color: var(--color-main);

    &:not(:last-child) {
        margin-right: rem(18);
    }

    &::before {
        position: absolute;
        width: 30px;
        height: 30px;
        background-color: var(--color-main);
        border-radius: 100%;
        content: '';
        opacity: 0.05;
    }

    & > a {
        z-index: 1;
        display: flex;
        width: 100%;
        height: 100%;
        align-items: center;
        justify-content: center;
    }
}

.social__icon {
    width: 14px;
    height: auto;
    opacity: 0.4;
    transition: opacity 0.2s;

    .social:hover & {
        opacity: 1;
    }
}
</style>
