<script setup>
// SEO meta
useHead({
  title: 'Catálogo de Laptops',
  meta: [
    { name: 'description', content: 'Explora el catálogo de laptops en una tabla con filtros por categoría y valor.' }
  ]
})

// Carga todos los documentos bajo content/laptops
const docs = await queryContent('laptops').only(['_path', 'title', 'body']).find()

// Helpers para extraer texto del AST de Nuxt Content
function textFrom(node) {
  if (!node) return ''
  if (typeof node === 'string') return node
  if (node.value && typeof node.value === 'string') return node.value
  if (node.type === 'text' && node.value) return node.value
  const children = node.children || []
  return children.map(textFrom).join('')
}
function collect(node, pred, out = []) {
  if (!node) return out
  if (pred(node)) out.push(node)
  const children = node.children || []
  for (const c of children) collect(c, pred, out)
  return out
}

function extractSpecs(doc) {
  const body = doc?.body
  if (!body) return {}
  // Busca primer nodo tabla (soporta shape type/tag)
  const tables = collect(body, n => n?.tag === 'table' || n?.type === 'table')
  if (!tables.length) return {}
  const table = tables[0]
  // Obtiene filas (tr / tableRow)
  const rows = collect(table, n => n?.tag === 'tr' || n?.type === 'tableRow')
  const kv = {}
  for (const row of rows) {
    const cells = (row.children || []).filter(n => n?.tag === 'td' || n?.tag === 'th' || n?.type === 'tableCell')
    if (!cells.length) continue
    const a = (cells[0] && textFrom(cells[0]).trim()) || ''
    const b = (cells[1] && textFrom(cells[1]).trim()) || ''
    if (!a) continue
    // omite encabezado típico "Spec | Value"
    if (a.toLowerCase() === 'spec' && b.toLowerCase() === 'value') continue
    kv[a] = b
  }
  return kv
}

// Construye filas normalizadas con columnas conocidas
const baseCols = ['Name', 'Operating System', 'Processor', 'Screen Size', 'RAM', 'Storage', 'Touch Screen', 'Price']
const items = docs.map(doc => {
  const specs = extractSpecs(doc)
  const name = doc.title || specs.Name || (doc.body && collect(doc.body, n => n?.tag === 'h1' || (n?.type === 'heading' && n?.depth === 1))[0] && textFrom(collect(doc.body, n => n?.tag === 'h1' || (n?.type === 'heading' && n?.depth === 1))[0]).trim()) || doc._path.split('/').pop()
  const row = { path: doc._path, Name: name }
  for (const k of baseCols.slice(1)) row[k] = specs[k]
  // agrega cualquier otra spec extra encontrada
  for (const [k, v] of Object.entries(specs)) {
    if (!(k in row)) row[k] = v
  }
  return row
})

// Columnas disponibles (unión) con orden amigable
const colSet = new Set(items.flatMap(r => Object.keys(r)))
colSet.delete('path')
const extras = Array.from(colSet).filter(c => !baseCols.includes(c)).sort()
const allCols = [...baseCols.filter(c => colSet.has(c)), ...extras]

// Filtros: categoría + valor
const categoryOptions = allCols.filter(c => c !== 'Name')
const preferred = ['Operating System', 'Processor', 'Screen Size', 'RAM']
const defaultCategory = preferred.find(c => categoryOptions.includes(c)) || categoryOptions[0] || 'Name'
const selectedCategory = ref(defaultCategory)
const selectedValue = ref('') // vacío = todas
watch(() => selectedCategory.value, () => { selectedValue.value = '' })

// Valores disponibles para la categoría actual
const collator = new Intl.Collator(undefined, { sensitivity: 'base' })
const valueOptions = computed(() => {
  const key = selectedCategory.value
  const vals = Array.from(new Set(items.map(r => r[key]).filter(Boolean)))
  return vals.sort((a, b) => collator.compare(String(a), String(b)))
})

// Orden alfabético por Name
const sortedRowsByName = computed(() => {
  return [...items].sort((a, b) => collator.compare(String(a.Name || ''), String(b.Name || '')))
})

// Filtrado por categoría/valor seleccionado
const filteredRows = computed(() => {
  const key = selectedCategory.value
  const val = selectedValue.value
  if (!key || !val) return sortedRowsByName.value
  return sortedRowsByName.value.filter(r => String(r[key] || '').trim() === String(val).trim())
})

// Colocamos la columna de la categoría seleccionada en la primera posición
const orderedColumns = computed(() => {
  const key = selectedCategory.value
  if (!key) return allCols
  return [key, ...allCols.filter(c => c !== key)]
})
</script>

<template>
  <section class="wrap">
    <header class="toolbar">
      <h1 class="title">Catálogo de Laptops</h1>
      <div class="filters">
        <label class="select">
          Categoría:
          <select v-model="selectedCategory">
            <option v-for="c in categoryOptions" :key="c" :value="c">{{ c }}</option>
          </select>
        </label>
        <label class="select">
          Valor:
          <select v-model="selectedValue">
            <option value="">Todas</option>
            <option v-for="v in valueOptions" :key="v" :value="v">{{ v }}</option>
          </select>
        </label>
      </div>
    </header>

    <div class="table-wrap">
      <table class="table">
        <thead>
          <tr>
            <th v-for="col in orderedColumns" :key="col">{{ col }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in filteredRows" :key="row.path">
            <td v-for="col in orderedColumns" :key="col">
              <template v-if="col === 'Name'">
                <NuxtLink :to="row.path">{{ row[col] || '-' }}</NuxtLink>
              </template>
              <template v-else>
                {{ row[col] || '-' }}
              </template>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<style scoped>
.wrap { display: grid; gap: 1rem; }
.title { margin: 0; font-size: 1.25rem; }
.toolbar { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: .75rem; }
.filters { display: inline-flex; flex-wrap: wrap; gap: .75rem; }
.select { display: inline-flex; align-items: center; gap: .5rem; }
.table-wrap { overflow: auto; border: 1px solid #e5e7eb; border-radius: 8px; }
.table { width: 100%; border-collapse: collapse; font-size: .95rem; }
.table th, .table td { padding: .5rem .75rem; border-bottom: 1px solid #f3f4f6; text-align: left; white-space: nowrap; }
.table thead th { background: #f9fafb; font-weight: 600; }
.table tr:hover td { background: #f9fafb; }
</style>
