import { defineStore } from "pinia"


export const useAppStore = defineStore('appStore', {
  state: () => ({
    isMobile: true,
    hideSidebar: true
  }),
  actions: {
    toggleHide(){
      this.hideSidebar = !this.hideSidebar
    },
    setMobile(thing: boolean){
      this.isMobile = thing;
    }
  },
});