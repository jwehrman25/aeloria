
<template>
  <div class="layout">
    <Sidebar v-if="!hideSidebar"/>
    <button class="btn sidebar-btn" :class="!hideSidebar ? 'sideoffeset' : ''" @click="toggleHide()">
      {{!hideSidebar ? "<<" : ">>"}}
    </button>
    <main class="page">
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
  height: 100vh
  overflow: hidden

main 
  flex: 1
  padding: 1rem

.page
  overflow-x: wrap
  overflow-y: scroll

.sidebar-btn
  position: relative
  background-color: #99bbb4ff
  height: 38px

.sideoffeset
  transform: translateX(-64px)

</style>