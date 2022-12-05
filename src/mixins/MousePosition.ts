import Vue from 'vue'
import {throttle} from "throttle-debounce";

interface MousePosition {
    x: number
    y: number
}

export default Vue.extend({
    data() {
        return {
            mousePosition: {} as MousePosition,
            mouseMove: false,
            startMovingData: {} as Date,
            isMovingCallback: throttle(300, (this as any).isMoving),
        }
    },
    mounted() {
        window.addEventListener('mousemove', this.onMouseMove)
    },
    beforeDestroy() {
        window.removeEventListener('mousemove', this.onMouseMove)
    },
    methods: {
        isMoving() {
            this.mouseMove = false
        },
        onMouseMove(event: MouseEvent) {
            this.startMovingData = new Date()
            // this.isMovingCallback()
            // window.setTimeout( () => this.mouseMove = false,  500)
            this.mouseMove = true

            this.mousePosition = {
                x: event.clientX,
                y: event.clientY,
            }
            this.onMousePositionUpdate()
        },
        onMousePositionUpdate() {},
    },
})
