<template>
    <div :class="$style.root">
<!--        <v-nav-project />-->
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import VNavProject from '~/components/organisms/VNavProject.vue'

export default Vue.extend({
    name: 'Index',
    components: { VNavProject },
})
</script>

<style lang="scss" module>
.root {
    user-select: auto;
}
</style>
