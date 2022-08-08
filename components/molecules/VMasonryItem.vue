<script lang="ts">
import Vue from 'vue'
import type { VNode, VueConstructor } from 'vue'
import { VMasonryInject } from '~/components/molecules/VMasonry.vue'

export default (Vue as VueConstructor<Vue & VMasonryInject>).extend({
  name: 'VMasonryItem',
  inject: {
    masonryRegister: {
      default: () => {},
    },
    masonryUnregister: {
      default: () => {},
    },
  },
  props: {
    fixed: Boolean,
  },
  created() {
    this.masonryRegister(this)
  },
  beforeDestroy() {
    this.masonryUnregister(this)
  },
  render(createElement): VNode {
    return this.$slots.default?.[0] || createElement('')
  },
})
</script>
