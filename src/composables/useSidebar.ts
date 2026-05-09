import { computed } from 'vue'
import type { DocNode, DocPage } from '../types/docs'

export function useSidebar() {
  // grab all markdown files
  const modules = import.meta.glob('../docs/**/*.md')

  const pages: DocPage[] = Object.keys(modules).map((file) => {
    const path = file
      .replace('../docs', '')
      .replace('.md', '')
      .replace('/index', '')

    const name =
      path
        .split('/')
        .filter(Boolean)
        .pop() || 'untitled'

    return {
      name,
      path,
      filePath: file
    }
  })

  const tree = computed<DocNode[]>(() => {
    const root: DocNode[] = []

    for (const page of pages) {
      const parts = page.path.split('/').filter(Boolean)

      let current = root

      parts.forEach((part, index) => {
        const isLast = index === parts.length - 1

        let node = current.find(n => n.name === part)

        if (!node) {
          node = {
            name: part,
            path: isLast ? page.path : null,
            children: []
          }

          current.push(node)
        }

        current = node.children
      })
    }

    return root
  })

  return {
    tree
  }
}