<script lang="ts">
import type { VNode, VueConstructor } from 'vue'
import Vue from 'vue'
import EventType from '~/constants/event-type'
import eventBus from '~/utils/event-bus'
import VMasonryItem from '~/components/molecules/VMasonryItem.vue'

type ItemInstance = InstanceType<typeof VMasonryItem>

export interface VMasonryInject {
  masonryRegister(item: ItemInstance): void

  masonryUnregister(item: ItemInstance): void
}

interface MasonryItem {
  height: number
  y: number
}

interface MasonryComponent extends Vue {
  resizeObserver?: ResizeObserver | null
}

export default (Vue as VueConstructor<MasonryComponent>).extend({
  name: 'VMasonry',
  provide(): VMasonryInject {
    return {
      masonryRegister: this.registerItem,
      masonryUnregister: this.unregisterItem,
    }
  },
  props: {
    enabled: Boolean,
  },
  data() {
    return {
      items: [] as ItemInstance[],
      inlineStyle: null as string | null,
      itemInlineStyles: [] as string[],
      isItemReady: false,
    }
  },
  watch: {
    enabled() {
      if (this.enabled) {
        this.addListeners()
        this.checkIfChildrenAreReady()
      } else {
        this.removeListeners()
        this.clearLayout()
        this.resizeObserver?.disconnect()
        this.resizeObserver = null
      }
    },
  },
  mounted() {
    if (this.enabled) {
      this.checkIfChildrenAreReady()
      this.addListeners()
      this.$el.classList.add(this.$style.root)
    }
  },
  updated() {
    if (!this.isItemReady) this.checkIfChildrenAreReady()
  },
  beforeDestroy() {
    this.resizeObserver?.disconnect()
    this.resizeObserver = null

    this.items.length = 0

    this.removeListeners()
  },
  methods: {
    addListeners() {
      eventBus.$on(EventType.RESIZE, this.onResize)
    },
    removeListeners() {
      eventBus.$off(EventType.RESIZE, this.onResize)
    },
    registerItem(item: ItemInstance) {
      this.items.push(item)
    },
    checkIfChildrenAreReady(): void {
      const instanceItems = this.items.filter(
        (item) => item.$el instanceof HTMLElement
      )
      this.isItemReady =
        !!this.$slots.default && this.$children.length === instanceItems.length

      if (!this.resizeObserver) {
        this.resizeObserver = new ResizeObserver(this.onResize)
        instanceItems.forEach((element) =>
          this.resizeObserver?.observe(element.$el)
        )
      }

      if (this.isItemReady) {
        this.$nextTick(this.updateLayout)
      }
    },
    unregisterItem(item: ItemInstance) {
      const index = this.items.indexOf(item)

      if (index !== -1) {
        this.items.splice(index, 1)
        this.itemInlineStyles.splice(index, 1)
      }
    },
    storeInlineStyles() {
      if (this.inlineStyle === null) {
        const style = (this.$el as HTMLElement).style

        this.inlineStyle = (style && style.cssText) || ''
      }

      this.items.forEach((item, index) => {
        if (typeof this.itemInlineStyles[index] === 'undefined') {
          const style = (item.$el as HTMLElement).style

          this.itemInlineStyles[index] = (style && style.cssText) || ''
        }
      })
    },
    updateLayout() {
      if (!this.isItemReady) return

      this.storeInlineStyles()
      this.clearLayout()

      const container = this.$el as HTMLElement
      const grid: MasonryItem[][] = []
      const items = this.items.filter((item) => item.$el instanceof HTMLElement)
      const rects: DOMRect[] = items.map((item) =>
        item.$el.getBoundingClientRect()
      )
      const columns = [...new Set(rects.map((rect) => rect.x))]
      const numberColumns = columns.length
      const isCSSGrid = getComputedStyle(container).display === 'grid'

      let containerHeight = 0
      let rowIndex = -1

      items.forEach((item, index) => {
        const element = item.$el as HTMLElement
        const rect = rects[index]
        const marginTop = parseFloat(getComputedStyle(element).marginTop) || 0
        const columnIndex = columns.indexOf(rect.x)

        let row: MasonryItem[]

        if (!(index % numberColumns)) {
          row = []
          rowIndex++

          grid.push(row)
        } else {
          row = grid[rowIndex]
        }

        const previousItem = grid[rowIndex - 1]?.[columnIndex]
        const y = item.fixed
          ? window.scrollY + rect.y
          : (previousItem ? previousItem.y + previousItem.height : 0) +
            marginTop

        row[columnIndex] = { y, height: rect.height }

        if (!item.fixed) {
          element.style.position = 'absolute'
          element.style.top = y + 'px'
          element.style.width = rect.width + 'px'
          element.style.height = rect.height + 'px'
          element.style.marginTop = '0'

          if (!isCSSGrid) {
            element.style.left = rect.x + 'px'
            element.style.marginLeft = '0'
          }
        }

        if (y + rect.height > containerHeight) containerHeight = y + rect.height
      })

      container.style.height = containerHeight + 'px'
    },
    clearLayout() {
      const container = this.$el as HTMLElement

      this.items.forEach((item, index) => {
        const style = (item.$el as HTMLElement).style

        if (style) style.cssText = this.itemInlineStyles[index] || ''
      })

      container.style.cssText = this.inlineStyle || ''
    },
    onResize() {
      this.updateLayout()
    },
  },
  render(createElement): VNode {
    return this.$slots.default?.[0] || createElement('')
  },
})
</script>

<style lang="scss" module>
// add pseudo element for reset safari grid layout when all children are position absolute
.root {
  &::before {
    display: block;
    content: '';
    visibility: hidden;
  }
}
</style>
