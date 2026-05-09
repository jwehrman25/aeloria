export type DocNode = {
  name: string
  path: string | null
  children: DocNode[]
}

export type DocPage = {
  name: string
  path: string
  filePath: string
}