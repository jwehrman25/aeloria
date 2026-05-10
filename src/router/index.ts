import {
  createRouter,
  createWebHashHistory,
  type RouteRecordRaw
} from 'vue-router'

import MarkdownPage from '../components/MarkdownPage.vue'

// eagerly import all markdown
const markdownModules = import.meta.glob(
  '../docs/**/*.md',
  {
    eager: true,
    query: '?raw',
    import: 'default'
  }
)

const routes: RouteRecordRaw[] = Object.keys(markdownModules).map((file) => {
  const path = '/' + file
    .split('/')
    .pop()!
    .replace('.md', '')
    .replaceAll(' ', '_')
  
  return {
    path,
    component: MarkdownPage,
    meta: {
      filePath: file.replace('../docs', '')
      .replace('.md', '')
      .replace('/index', '')
    }
  }
})


routes.push({
  path: '/',
  redirect: '/intro'
})

export default createRouter({
  history: createWebHashHistory(),
  routes
})