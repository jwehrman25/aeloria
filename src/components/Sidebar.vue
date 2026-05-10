<template>
  <nav class="sidebar">
    <input type="text" placeholder="search" v-model="treeFilter"/>
    <SidebarNode
      v-for="node in filteredTree"
      :key="node.name"
      :node="node"
    />
  </nav>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useSidebar } from '../composables/useSidebar'
import SidebarNode from './SidebarNode.vue'
import type { DocNode } from '@/types/docs';

const { tree } = useSidebar()

const filteredTree = computed(() => {
  return filterTree(tree.value)
})

const treeFilter = ref('');

function filterTree(tree: DocNode[]): DocNode[] {
  const filter = treeFilter.value.trim().replaceAll(' ', '').toLowerCase();

  if (filter === '') return tree;

  return tree.reduce((filtered: DocNode[], node: DocNode) => {
    const matchesSelf = node.name.replaceAll('_', '').toLowerCase().includes(filter);

    if(matchesSelf){
      filtered.push({...node});
      return filtered;
    }

    const filteredChildren = filterTree(node.children ?? []);

    if (filteredChildren.length > 0) {
      filtered.push({
        ...node,
        children: filteredChildren,
      });
    }

    return filtered;
  }, []);
}

</script>

<style lang="sass" scoped>
.sidebar
  width: 280px
  padding: 1rem
  border-right: 1px #8b8b8b60 solid
  background-color: #b4ddd5ff
  height: 100%
  overflow-y: scroll
  overflow-x: wrap

</style>