<template>
    <section :class="$style.project">
        <div ref="wrapper" :class="[$style['project-inner'], 'project-inner']">
            <nuxt-link ref="back-link" to="/" :class="$style.head">
                <v-button-cross />
                <v-split-word ref="title" :class="[$style.title, 'text-h3']" :content="pageData.title" />
            </nuxt-link>

            <nuxt-link v-if="pageData.link" :to="pageData.link.url" :class="$style.link">{{ pageData.link.label }}</nuxt-link>

            <div v-if="pageData.tags && pageData.tags.length" :class="$style.tags">
                <v-pill v-for="(tag, indexTag) in pageData.tags" :key="indexTag" :class="$style.tag" size="s" :label="tag.name" />
            </div>

            <p v-if="pageData.description" :class="[$style.description, 'body-xs']">{{ pageData.description }}</p>

            <ul v-if="medias.length" :class="$style.images">
                <li v-for="(media, i) in medias" :key="i" :class="$style.image">
                    <v-image :strapi-image="media" />
                </li>
            </ul>
        </div>
    </section>
</template>

<script lang="ts">
import mixins from 'vue-typed-mixins'
import VSplitWord from '~/components/atoms/VSplitWord.vue'
import Page from '~/mixins/Page'
import VPill from '~/components/atoms/VPill.vue'

export default mixins(Page).extend({
    name: 'Project',
    components: { VSplitWord, VPill },
    data() {
        return {
            pageData: {} as ProjectContent,
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
            return [thumb]
        },
    },
    mounted() {
        const pageSlug = this.$route.params.slug
        const projects = this.$store.state.projectsData
        this.pageData = projects.filter((project: ProjectContent) => project.slug === pageSlug)[0]
        this.initDataIndex()
        ;((this.$refs['back-link'] as Vue)?.$el as HTMLElement)?.focus()
        console.log(((this.$refs['back-link'] as Vue)?.$el as HTMLElement))
    },
    methods: {
        initDataIndex(): void {
            const children = Array.from((this.$refs.wrapper as HTMLElement).childNodes).filter(
                (child) => child.nodeName !== '#text'
            )
            Array.from(children).forEach((element, i) => {
                if (element instanceof HTMLElement) element.style.setProperty('--index', String(i))
            })
        },
    },
})
</script>

<style lang="scss" module>
.project {
    position: fixed;
    right: 0;
    width: 50vw;
    min-height: 100vh;
    border-left: 1px solid var(--color-main);
    background-color: var(--color-bg);
}

.project-inner {
    width: 100%;
    padding: 0 var(--padding-border);
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
    font-variation-settings: 'wght' 900;
    text-transform: uppercase;

    & :global(.split-letter) {
        transition: font-variation-settings 0.3s ease(out-quad) calc(40ms * var(--index-letter-total));
    }

    .link:hover + & :global(.split-letter) {
        font-variation-settings: 'wght' 100;
    }
}

.link {
    display: inline-block;
    margin-right: rem(12);
}

.tags {
    display: inline-block;
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
    *:not(.description) + & {
        margin-top: rem(30);
    }
}

.image {
    display: flex;

    --figure-width: 100%;
    --image-width: 100%;

    margin-bottom: rem(25);
}
</style>
