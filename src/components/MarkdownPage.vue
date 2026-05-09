<script setup lang="ts">
import { useMdRender } from '@/services/mdRender'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const md = useMdRender()

const markdownModules = import.meta.glob(
  '../docs/**/*.md',
  {
    eager: true,
    query: '?raw',
    import: 'default'
  }
) as Record<string, string>

const html = computed(() => {
  // rebuild exact glob key
  const filePath =
    `../docs${route.meta.filePath}.md`

  const content = markdownModules[filePath]

  if (!content) {
    return `
      <h1>404</h1>
      <p>Could not find:</p>
      <code>${filePath}</code>
    `
  }

  const render = md.render(content);

  return render
})

</script>

<template>
  <div v-html="html"></div>
</template>