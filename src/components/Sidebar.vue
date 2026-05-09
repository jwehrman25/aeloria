<script setup lang="ts">
import { useSidebar } from '../composables/useSidebar'
import SidebarNode from './SidebarNode.vue'

const { tree } = useSidebar()
</script>

<template>
  <nav class="sidebar">
    <SidebarNode
      v-for="node in tree"
      :key="node.name"
      :node="node"
    />
  </nav>
</template>

<style lang="sass" scoped>
.sidebar
  width: 280px
  padding: 1rem
  border-right: 1px #8b8b8b60 solid
  background-color: #b4ddd5ff

</style>