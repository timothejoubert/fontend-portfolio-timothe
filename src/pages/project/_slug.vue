<template>
    <v-counter-dom :class="$style.project" :enter="enter" transition-name="item-project">
        <nuxt-link ref="back-link" to="/" :class="$style.head">
            <v-button-cross :class="$style.cross" />
            <v-split-word
                v-if="pageData.title"
                ref="title"
                :class="[$style.title, 'text-h3']"
                :content="pageData.title"
            />
        </nuxt-link>
        <div :class="$style.tags">
            <v-pill
                v-for="(tag, indexTag) in pageData.tags"
                :key="indexTag"
                :class="$style.tag"
                size="s"
                :label="tag.name"
            />
        </div>
        <p :class="[$style.description, 'body-xs']">{{ pageData.description }}</p>
        <nuxt-link :to="linkUrl" :class="$style.link">{{ linkLabel }}</nuxt-link>
        <ul v-if="medias.length" :class="$style.images">
            <v-counter-dom inline :enter="enter" transition-name="item-project" :start-index="5">
                <li v-for="(media, i) in medias" :key="i" :class="$style.image">
                    <v-image :strapi-image="media" />
                </li>
            </v-counter-dom>
        </ul>
    </v-counter-dom>
</template>

<script lang="ts">
import mixins from 'vue-typed-mixins'
import VSplitWord from '~/components/atoms/VSplitWord.vue'
import Page from '~/mixins/Page'
import VPill from '~/components/atoms/VPill.vue'
import VButtonCross from '~/components/atoms/VButtonCross.vue'
import VCounterDom from '~/components/atoms/VCounterDom.vue'
// import VCounterDomTemplate from '~/components/atoms/VCounterDomTemplate.vue'

export default mixins(Page).extend({
    name: 'Project',
    components: { VSplitWord, VPill, VButtonCross, VCounterDom },
    data() {
        return {
            pageData: {} as ProjectContent,
            enter: false,
        }
    },
    computed: {
        medias(): ImageAttributes[] {
            const thumb = this.pageData.thumbnail
            const others =
                this.pageData?.medias?.filter((media: ImageAttributes) => {
                    return !!media
                }) ?? []
            if (thumb && !!others.length) return others.splice(0, 0, thumb)
            return [thumb, thumb, thumb]
        },
        linkUrl(): string {
            return this.pageData.link?.url || ''
        },
        linkLabel(): string {
            return this.pageData.link?.label || ''
        },
    },
    beforeDestroy() {
        this.enter = false
    },
    mounted() {
        this.enter = true
        const pageSlug = this.$route.params.slug
        const projects = this.$store.state.projectsData
        this.pageData = projects.filter((project: ProjectContent) => project.slug === pageSlug)[0]
        ;((this.$refs['back-link'] as Vue)?.$el as HTMLElement)?.focus()
    },
})
</script>

<style lang="scss" module>
.project {
    width: 100%;
    padding: 0 var(--padding-border) calc(var(--top-bar-height) * 1px);
}

.head {
    display: flex;
    height: calc(var(--top-bar-height) * 1px);
    flex-direction: row-reverse;
    align-items: center;
    justify-content: space-between;
}

.title {
    display: inline-flex;
    text-transform: uppercase;

    & :global(.split-letter) {
        font-variation-settings: 'wght' 900;
        transition: font-variation-settings 0.3s ease(out-quad) calc(40ms * var(--index-letter-total));
    }

    .head:hover & :global(.split-letter) {
        font-variation-settings: 'wght' 100;
    }
}

.link {
    position: relative;
    display: inline-block;
    margin-right: rem(12);
    width: 100%;
}

.tags {
    display: flex;
}

.tag {
    margin-bottom: rem(10);

    &:not(:last-child) {
        margin-right: rem(8);
    }
}

.description {
    margin: rem(35) 0 rem(45);
    opacity: 0.8;
}

.images {
    position: relative;
    *:not(.description) + & {
        margin-top: rem(30);
    }
}

.image {
    position: relative;
    display: flex;

    --figure-width: 100%;
    --image-width: 100%;

    &:not(:last-child) {
        margin-bottom: rem(25);
    }
}
</style>
