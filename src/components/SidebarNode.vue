<template>
  <div class="node">
    <div v-if="node.path">
      <RouterLink :to="node.name">
        {{ node.name }}
      </RouterLink>
    </div>

    <div v-else>
      <strong class="clickable" @click="toggleHide()">{{ node.name }}{{ hideChildren ? '-' : '⌄' }}</strong>
    </div>

    <div v-if="node.children.length && !hideChildren" class="children">
      <SidebarNode
        v-for="child in node.children"
        :key="child.name"
        :node="child"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { DocNode } from '../types/docs'
import { RouterLink } from 'vue-router'

defineProps<{
  node: DocNode
}>()

const hideChildren = ref(false);

function toggleHide(){
  hideChildren.value = !hideChildren.value
}

</script>

<style lang="sass" scoped>
.node 
  margin-left: 10px
  margin-top: 6px


.children 
  margin-left: 12px

.clickable:hover
  cursor: pointer
  text-decoration: underline
</style>