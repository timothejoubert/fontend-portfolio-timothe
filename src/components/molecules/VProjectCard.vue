<template>
    <div
        v-if="hasSlug"
        :class="rootClass"
        :style="{ '--index-project': index }"
        @mouseenter="onMouseEnter"
        @mouseleave="onMouseLeave"
    >
        <nuxt-link :to="`/project/${project.slug}`" :tabindex="isAboutOpen && '-1'">
            <div :class="$style.information">
                <div :class="$style.information__head">
                    <h1 v-if="project.title" :class="[$style.title, 'body-m']">
                        {{ project.title }}
                    </h1>
                    <p v-if="project.date" :class="[$style.date, 'body-s']">
                        {{ project.date }}
                    </p>
                </div>
                <span v-if="project.promoted" :style="{ color: 'white', marginLeft: '10px' }">❤︎</span>
                <div v-if="tags" :class="[$style.tags]">
                    <v-pill
                        v-for="(tag, indexTag) in tags"
                        :key="indexTag"
                        :style="{ '--tag-index': indexTag }"
                        :class="$style.tag"
                        size="xxs"
                        :label="tag.name"
                    />
                </div>
            </div>

            <div :class="$style.thumbnail">
                <v-image :strapi-image="project.thumbnail" :class="$style.image" />
            </div>
        </nuxt-link>
        <v-new-pill v-show="displayRemote" :class="$style.promote" label="New" :grow="grow" />
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import type { PropType } from 'vue'
import { mapGetters } from 'vuex'
import VImage from '~/components/atoms/VImage.vue'
import VPill from '~/components/atoms/VPill.vue'
import VNewPill from '~/components/atoms/VNewPill.vue'

export default Vue.extend({
    name: 'VProjectCard',
    components: { VImage, VPill, VNewPill },
    props: {
        project: Object as PropType<ProjectContent>,
        activeProject: String,
        index: Number,
    },
    data() {
        return {
            grow: false,
        }
    },
    computed: {
        ...mapGetters(['isAboutOpen']),
        rootClass(): (string | boolean | undefined)[] {
            return [
                this.$style.root,
                this.activeProject === this.project.slug && this.$style['root--active'],
                this.isAnimationEnter && this.$style['root--enter'],
            ]
        },
        tags(): ProjectContent['tags'] | undefined {
            const tags = this.project?.tags?.slice()
            if (!tags || !tags?.[0].name) return
            return tags.sort((current: Tag, next: Tag) => {
                return next.name.length - current.name.length
            })
        },
        hasSlug(): boolean {
            return !!this.project?.slug
        },
        isAnimationEnter(): boolean {
            return this.$store.state.animationEnter
        },
        displayRemote(): boolean {
            // TODO error in client-side rendered
            return !!this.project?.promoted // Math.random() > 0.8
        },
    },
    methods: {
        onMouseEnter() {
            this.grow = true
        },
        onMouseLeave() {
            this.grow = false
        },
    },
})
</script>

<style lang="scss" module>
.root {
    position: relative;
    width: 100%;
    height: rem(300);
    color: var(--color-bg);
    opacity: 0;
    transform: translateY(80px);
    transition-delay: calc(0.08s * var(--index-project, 1));
    transition-duration: 0.8s, 1s;
    transition-property: transform, opacity;
    transition-timing-function: ease(out-quad), ease(in-quad);

    @include media('>=md') {
        height: rem(320);
    }

    @include media('>=vl') {
        height: rem(370);
    }

    @include media('>=xl') {
        height: rem(400);
    }

    &--enter {
        opacity: 1;
        transform: translateY(0);
    }
}

.information {
    position: absolute;
    z-index: 1;
    bottom: 0;
    left: 0;
    display: flex;
    overflow: hidden;
    width: 100%;
    height: 100%;
    align-items: flex-end;
    margin: rem(14);
}

.information__head {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    opacity: 1;
    transition: opacity 0.15s 0.15s, transform 0.15s 0.15s;

    .root:hover &,
    .root--active & {
        opacity: 0;
        transform: translateY(-20px);
        transition-delay: 0s;
    }
}

.title {
    display: inline-block;
    color: var(--color-accent);
}

.date {
    display: inline-block;
    margin-left: rem(10);
    color: var(--color-main);
}

.tags {
    display: none;

    @include media('>=md') {
        position: absolute;
        bottom: 0;
        display: flex;
        overflow: hidden;
        flex-direction: column-reverse;
        flex-wrap: wrap;
        align-items: flex-start;
        justify-content: flex-start;
    }
}

.tag {
    margin-top: rem(8);
    opacity: 0;
    transform: translateY(100%) scale(0.8);
    transition: 0.3s calc(0.02s * var(--tag-index, 0));
    transition-property: opacity, transform;

    &:not(:last-child) {
        margin-right: rem(8);
    }

    .root:not(.root--active):hover & {
        opacity: 1;
        transform: translateY(0) scale(1);
        transition-delay: calc(0.05s * var(--tag-index, 0));
    }
}

.thumbnail {
    --image-object-position: center;
    --image-object-fit: cover;
    --image-height: 100%;
    --image-width: 100%;
    --figure-height: 100%;
    --figure-width: 100%;

    position: relative;
    overflow: hidden;
    width: 100%;
    height: 100%;
    border-top-right-radius: rem(60);

    .root--active & {
        border: 1px solid var(--color-accent);
    }

    &::after {
        position: absolute;
        background: linear-gradient(45deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.15) 100%);
        content: '';
        inset: 0;
        opacity: 1;
        transition: opacity 0.5s ease(out-quad);
    }

    .root:hover &::after,
    .root--active &::after {
        opacity: 0.15;
    }
}

.image {
    background-color: var(--color-bg);
    filter: saturate(0);
    opacity: 0.45;
    transition: transform 0.3s ease(out-quad), filter 0.3s;
    //width: 100%;
    //height: 100%;
    //object-fit: cover;

    .root:hover &,
    .root--active & {
        filter: inherit;
        transform: scale(1.05);
    }
}

.promote {
    position: absolute;
    top: 0;
    right: 0;
}
</style>
