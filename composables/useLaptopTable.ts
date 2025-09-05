export const useLaptopTable = async () => {
  const { data: docs } = await useAsyncData('laptops', () =>
    queryContent('laptops').only(['_path', 'title', 'body']).find()
  )

  // Helpers
  const text = (n: any): string => {
    if (!n) return ''
    if (typeof n === 'string') return n
    if (n.value) return String(n.value)
    const kids = n.children || []
    return kids.map(text).join('')
  }
  const find = (n: any, p: (x: any) => boolean): any | null => {
    if (!n) return null
    if (p(n)) return n
    const kids = n.children || []
    for (const k of kids) {
      const hit = find(k, p)
      if (hit) return hit
    }
    return null
  }

  const baseCols = ['Name', 'Operating System', 'Processor', 'Screen Size', 'RAM', 'Storage', 'Touch Screen', 'Price'] as const

  const items = computed(() => {
    const arr = (docs.value || []) as any[]
    return arr.map((doc: any) => {
      const body = doc.body
      const table = body && (find(body, (n) => n?.tag === 'table' || n?.type === 'table'))
      const rows = table ? (table.children || []).filter((n: any) => n?.tag === 'tr' || n?.type === 'tableRow') : []
      const specs: Record<string, string> = {}
      for (const r of rows) {
        const cells = (r.children || []).filter((c: any) => c?.tag === 'td' || c?.tag === 'th' || c?.type === 'tableCell')
        const a = text(cells[0]).trim()
        const b = text(cells[1]).trim()
        if (!a) continue
        if (a.toLowerCase() === 'spec' && b.toLowerCase() === 'value') continue
        specs[a] = b
      }
      const h1 = body && find(body, (n) => (n?.tag === 'h1') || (n?.type === 'heading' && n?.depth === 1))
      const name = doc.title || specs['Name'] || (h1 && text(h1).trim()) || doc._path.split('/').pop()
      const row: Record<string, string> = { path: doc._path, Name: name }
      for (const k of baseCols.slice(1)) row[k] = specs[k] as string
      for (const [k, v] of Object.entries(specs)) if (!(k in row)) row[k] = v
      return row
    })
  })

  const set = computed(() => new Set(items.value.flatMap((r: any) => Object.keys(r))))
  const allCols = computed(() => {
    const s = new Set(set.value)
    s.delete('path')
    const extras = Array.from(s).filter((c) => !(baseCols as readonly string[]).includes(c)).sort()
    return [...(baseCols as readonly string[]).filter((c) => s.has(c)), ...extras]
  })

  // UI state
  const q = ref('')
  const categoryOptions = computed(() => allCols.value.filter((c) => c !== 'Name'))
  const preferred = ['Operating System', 'Processor', 'Screen Size', 'RAM']
  const selectedCategory = ref(preferred.find((c) => categoryOptions.value.includes(c)) || categoryOptions.value[0] || 'Name')
  const selectedValue = ref('')
  watch(selectedCategory, () => { selectedValue.value = '' })

  // Derived
  const collator = new Intl.Collator(undefined, { sensitivity: 'base' })
  const valueOptions = computed(() => {
    const key = selectedCategory.value
    const vals = Array.from(new Set(items.value.map((r: any) => r[key]).filter(Boolean))) as string[]
    return vals.sort((a, b) => collator.compare(a, b))
  })
  const orderedColumns = computed(() => {
    const key = selectedCategory.value
    const cols = allCols.value
    if (!key) return cols
    return [key, ...cols.filter((c) => c !== key)]
  })
  const filteredRows = computed(() => {
    const nameSorted = [...items.value].sort((a: any, b: any) => collator.compare(String(a.Name || ''), String(b.Name || '')))
    const key = selectedCategory.value
    const val = selectedValue.value.trim()
    const base = !key || !val ? nameSorted : nameSorted.filter((r: any) => String(r[key] || '').trim() === val)
    const term = q.value.trim().toLowerCase()
    if (!term) return base
    return base.filter((r: any) => orderedColumns.value.some((c) => String(r[c] || '').toLowerCase().includes(term)))
  })

  return { q, items, allCols, categoryOptions, selectedCategory, selectedValue, valueOptions, orderedColumns, filteredRows }
}

