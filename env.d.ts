/// <reference types="vite/client" />

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

interface ImportMeta {
  readonly glob: <T = any>(
    pattern: string
  ) => Record<string, () => Promise<T>>
}