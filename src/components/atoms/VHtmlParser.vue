<script lang="ts">
import Vue from 'vue'
import type { VNode } from 'vue'

export default Vue.extend({
    name: 'VHtmlParser',
    // functional: true,
    props: {
        content: String,
        tag: String,
    },
    render(createElement): VNode {
        const { content, tag } = this.$props

        return createElement(tag || 'div', {
            domProps: { innerHTML: content },
        })
    },
})
</script>
