<template>
  <h1>{{ route.path?.toString().replaceAll('_', ' ').replace('/', '') }}</h1>
  <div v-html="html" @click="onClick"></div>
</template>

<script setup lang="ts">
import { useMdRender } from '@/services/mdRender'
import { computed } from 'vue'
import { useRoute,useRouter } from 'vue-router'

const route = useRoute();
const router = useRouter();
const md = useMdRender();


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

function onClick(event: MouseEvent) {
  const target = event.target as HTMLElement;

  if (target.tagName !== 'A') return;

  const anchor = target as HTMLAnchorElement;

  const href = anchor.getAttribute('href');

  if (!href) return;

  // internal wiki links
  if (href.startsWith('#/')) {
    event.preventDefault();

    router.push(
      decodeURIComponent(href.replace('#', ''))
    );
  }
}

</script>

<style lang="sass" scoped>

</style>