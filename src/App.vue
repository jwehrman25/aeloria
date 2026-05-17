
<template>
  <div class="layout">
    <Sidebar v-if="!appStore.hideSidebar"/>
    <button class="btn sidebar-btn" :class="!appStore.hideSidebar ? 'sideoffeset' : ''" @click="appStore.toggleHide()">
      {{!appStore.hideSidebar ? "<<" : ">>"}}
    </button>
    <main class="page">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import Sidebar from './components/Sidebar.vue'
import { useAppStore } from './stores/appStore';
import { onMounted } from 'vue';

const appStore = useAppStore();

const handleResize = () => {
  appStore.setMobile(window.screen.width < 800);
};

onMounted(() => {
  window.addEventListener('resize', handleResize);
});

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