export const useCoffeeCatalog = async () => {
  const { data: docs } = await useAsyncData('coffees', () =>
    queryContent('coffees').find()
  )

  const formatOrigin = (origin: any): string => {
    if (!origin) return ''
    if (typeof origin === 'string') return origin
    const parts: string[] = []
    if (origin.label) parts.push(String(origin.label))
    if (origin.farm) parts.push(String(origin.farm))
    if (origin.municipality) parts.push(String(origin.municipality))
    if (origin.region) parts.push(String(origin.region))
    if (origin.country) parts.push(String(origin.country))
    return parts.filter(Boolean).join(', ')
  }

  const formatRoast = (entry: any): string => {
    if (!entry) return ''
    if (typeof entry === 'string') return entry
    const label = entry.name ? String(entry.name) : ''
    const level = entry.level ? String(entry.level) : ''
    if (label && level) return `${label} (${level})`
    return label || level
  }

  const formatGrind = (entry: any): string => {
    if (!entry) return ''
    if (typeof entry === 'string') return entry
    const label = entry.name ? String(entry.name) : ''
    const granularity = entry.granularity ? String(entry.granularity) : ''
    if (label && granularity) return `${label} · ${granularity}`
    return label || granularity
  }

  const formatPackaging = (entry: any): string => {
    if (!entry) return ''
    if (typeof entry === 'string') return entry
    const pieces: string[] = []
    if (entry.format) pieces.push(String(entry.format))
    if (entry.material) pieces.push(String(entry.material))
    if (entry.price !== undefined && entry.price !== null && entry.price !== '') {
      const price = Number(entry.price)
      pieces.push(isFinite(price) ? `$${price.toFixed(2)}` : String(entry.price))
    }
    if (entry.notes) pieces.push(String(entry.notes))
    return pieces.filter(Boolean).join(' • ')
  }

  const items = computed(() => {
    const arr = (docs.value || []) as any[]
    return arr.map((doc: any) => {
      const meta: Record<string, string[]> = {}
      const roasts = (doc.roastProfiles || []).map(formatRoast).filter(Boolean)
      const grinds = (doc.grindOptions || []).map(formatGrind).filter(Boolean)
      const packaging = (doc.packagingOptions || []).map(formatPackaging).filter(Boolean)
      meta['Tueste disponible'] = roasts
      meta['Molienda disponible'] = grinds
      meta['Empaque'] = packaging

      const row: Record<string, any> = {
        path: doc._path,
        'Café': doc.title || doc.name || doc.lotId || '',
        'Lote': doc.lotId || '',
        'Origen': formatOrigin(doc.origin),
        'Productor': doc.producer || '',
        'Variedad': doc.variety || '',
        'Proceso': doc.process || '',
        'Tueste disponible': roasts.join(', '),
        'Molienda disponible': grinds.join(', '),
        'Empaque': packaging.join(', '),
        'Inventario (kg)': doc.inventoryKg !== undefined && doc.inventoryKg !== null
          ? String(doc.inventoryKg)
          : '',
        'Estado actual': doc.status || '',
        'Entrega estimada': doc.deliveryPromise || '',
        'Comercializador': doc.vendor || ''
      }

      if (doc.score !== undefined && doc.score !== null && doc.score !== '') {
        row['Puntaje SCA'] = typeof doc.score === 'number'
          ? doc.score.toFixed(2)
          : String(doc.score)
      }
      if (doc.acopioCenter) {
        row['Centro de acopio'] = doc.acopioCenter
      }

      Object.defineProperty(row, '__meta', { value: meta, enumerable: false })
      return row
    })
  })

  const columnSet = computed(() => {
    const set = new Set<string>()
    for (const row of items.value) {
      for (const key of Object.keys(row)) {
        if (key === 'path') continue
        if (key.startsWith('__')) continue
        set.add(key)
      }
    }
    return set
  })

  const baseCols = [
    'Café',
    'Lote',
    'Origen',
    'Productor',
    'Variedad',
    'Proceso',
    'Tueste disponible',
    'Molienda disponible',
    'Empaque',
    'Inventario (kg)',
    'Estado actual',
    'Entrega estimada',
    'Comercializador',
    'Puntaje SCA',
    'Centro de acopio'
  ] as const

  const allCols = computed(() => {
    const set = columnSet.value
    const base = baseCols.filter(col => set.has(col))
    const extras = Array.from(set).filter(col => !(base as readonly string[]).includes(col)).sort()
    return [...base, ...extras]
  })

  const categoryOptions = computed(() =>
    allCols.value.filter(col => col !== 'Café' && col !== 'Lote')
  )

  const selectedCategory = ref<string>('')

  watchEffect(() => {
    const options = categoryOptions.value
    if (!options.length) {
      selectedCategory.value = ''
      return
    }
    if (options.includes(selectedCategory.value)) return
    const preferred = [
      'Origen',
      'Proceso',
      'Variedad',
      'Estado actual',
      'Tueste disponible',
      'Molienda disponible',
      'Empaque',
      'Comercializador'
    ]
    const next = preferred.find(opt => options.includes(opt)) || options[0]
    selectedCategory.value = next
  })

  const selectedValue = ref<string>('')
  watch(selectedCategory, () => { selectedValue.value = '' })

  const q = ref('')
  const collator = new Intl.Collator(undefined, { sensitivity: 'base' })

  const collectValues = (row: Record<string, any>, key: string): string[] => {
    const meta = (row as any).__meta?.[key]
    if (Array.isArray(meta) && meta.length) {
      return meta.map((val: any) => String(val))
    }
    const raw = row[key]
    if (raw === undefined || raw === null || raw === '') return []
    return [String(raw)]
  }

  const valueOptions = computed(() => {
    const key = selectedCategory.value
    if (!key) return []
    const set = new Set<string>()
    for (const row of items.value) {
      for (const val of collectValues(row, key)) {
        const trimmed = val.trim()
        if (trimmed) set.add(trimmed)
      }
    }
    return Array.from(set).sort((a, b) => collator.compare(a, b))
  })

  const orderedColumns = computed(() => {
    const cols = allCols.value
    const key = selectedCategory.value
    if (!key || !cols.includes(key)) return cols
    const prefix = ['Café', 'Lote']
    const first = prefix.filter(col => cols.includes(col))
    const rest = cols.filter(col => !first.includes(col) && col !== key)
    return [...first, key, ...rest]
  })

  const filteredRows = computed(() => {
    const rows = [...items.value].sort((a, b) => collator.compare(String(a['Café'] || ''), String(b['Café'] || '')))
    const key = selectedCategory.value
    const val = selectedValue.value.trim()
    const base = (!key || !val)
      ? rows
      : rows.filter(row => collectValues(row, key).some(v => v.trim() === val))
    const term = q.value.trim().toLowerCase()
    if (!term) return base
    return base.filter(row =>
      allCols.value.some(col => String(row[col] ?? '').toLowerCase().includes(term))
    )
  })

  const metrics = computed(() => {
    const list = (docs.value || []) as any[]
    const lots = list.length
    const inventory = list.reduce((acc, doc) => {
      const value = doc.inventoryKg
      if (typeof value === 'number') return acc + value
      const numeric = Number(value)
      return acc + (Number.isFinite(numeric) ? numeric : 0)
    }, 0)
    const origins = new Set<string>()
    const vendors = new Set<string>()
    for (const doc of list) {
      const origin = formatOrigin(doc.origin)
      if (origin) origins.add(origin)
      if (doc.vendor) vendors.add(String(doc.vendor))
    }
    return { lots, inventory, origins: origins.size, vendors: vendors.size }
  })

  return {
    q,
    items,
    allCols,
    categoryOptions,
    selectedCategory,
    selectedValue,
    valueOptions,
    orderedColumns,
    filteredRows,
    metrics
  }
}
