
<template>
  <div class="layout">
    <Sidebar v-if="!hideSidebar"/>
    <button class="btn sidebar-btn" :class="!hideSidebar ? 'sideoffeset' : ''" @click="toggleHide()">
      {{!hideSidebar ? "<<" : ">>"}}
    </button>
    <main>
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Sidebar from './components/Sidebar.vue'

const hideSidebar = ref(false);

function toggleHide(){
  hideSidebar.value = !hideSidebar.value
}

</script>

<style lang="sass">
.layout 
  display: flex

main 
  flex: 1
  padding: 1rem

.sidebar-btn
  position: relative
  background-color: #99bbb4ff
  height: 38px

.sideoffeset
  transform: translateX(-48px)

</style>