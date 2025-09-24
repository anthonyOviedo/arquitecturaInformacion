<script setup lang="ts">
const route = useRoute()
const slugParam = route.params.slug
const slug = Array.isArray(slugParam) ? slugParam.join('/') : String(slugParam || '')
const path = `/coffees/${slug}`

const { data: doc } = await useAsyncData(`coffee-${slug}`, () =>
  queryContent(path).findOne()
)

if (!doc.value) {
  throw createError({ statusCode: 404, statusMessage: 'Lote de café no encontrado' })
}

const coffee = computed(() => doc.value as Record<string, any>)

const formatOrigin = (origin: any): string => {
  if (!origin) return ''
  if (typeof origin === 'string') return origin
  const parts: string[] = []
  if (origin.farm) parts.push(String(origin.farm))
  if (origin.municipality) parts.push(String(origin.municipality))
  if (origin.region) parts.push(String(origin.region))
  if (origin.country) parts.push(String(origin.country))
  return parts.filter(Boolean).join(', ')
}

const originLabel = computed(() => formatOrigin(coffee.value?.origin))

const roastProfiles = computed(() => (coffee.value?.roastProfiles || []) as any[])
const grindOptions = computed(() => (coffee.value?.grindOptions || []) as any[])
const packagingOptions = computed(() => (coffee.value?.packagingOptions || []) as any[])
const fulfillmentFlow = computed(() => (coffee.value?.fulfillmentFlow || []) as any[])
const sellerNotifications = computed(() => (coffee.value?.sellerNotifications || []) as any[])
const certifications = computed(() => (coffee.value?.certifications || []) as string[])
const customerSegments = computed(() => (coffee.value?.customerSegments || []) as string[])

const formatPrice = (value: any) => {
  if (value === undefined || value === null || value === '') return '—'
  const numeric = Number(value)
  if (Number.isFinite(numeric)) {
    return new Intl.NumberFormat('es-PA', { style: 'currency', currency: 'USD' }).format(numeric)
  }
  return String(value)
}

useHead(() => ({
  title: coffee.value?.title
    ? `${coffee.value.title} | Marketplace integral de café`
    : 'Detalle de lote de café',
  meta: [
    {
      name: 'description',
      content: coffee.value?.description
        ? String(coffee.value.description)
        : `Detalle del lote ${coffee.value?.lotId ?? ''} del marketplace de café personalizado.`
    }
  ]
}))
</script>

<template>
  <main class="detail" v-if="coffee">
    <NuxtLink to="/" class="back">← Volver al catálogo</NuxtLink>
    <header class="detail-header">
      <div class="header-info">
        <p class="eyebrow">Microlote {{ coffee.lotId }}</p>
        <h1>{{ coffee.title }}</h1>
        <p class="subtitle">
          <span v-if="originLabel">{{ originLabel }}</span>
          <span v-if="coffee.variety"> · Variedad: {{ coffee.variety }}</span>
          <span v-if="coffee.process"> · Proceso: {{ coffee.process }}</span>
        </p>
      </div>
      <div class="badges">
        <span v-if="coffee.score" class="badge badge-score">SCA {{ coffee.score }}</span>
        <span v-if="coffee.status" class="badge badge-status">{{ coffee.status }}</span>
      </div>
    </header>

    <div class="summary-grid">
      <section class="summary-card">
        <h2>Ficha del lote</h2>
        <ul>
          <li><strong>Productor:</strong> {{ coffee.producer || '—' }}</li>
          <li><strong>Cosecha:</strong> {{ coffee.harvestWindow || '—' }}</li>
          <li><strong>Altitud:</strong> {{ coffee.origin?.altitude || '—' }}</li>
          <li><strong>Acopio:</strong> {{ coffee.acopioCenter || '—' }}</li>
          <li><strong>Puntaje SCA:</strong> {{ coffee.score || '—' }}</li>
        </ul>
        <div v-if="certifications.length" class="chips">
          <span v-for="item in certifications" :key="item" class="chip">{{ item }}</span>
        </div>
      </section>
      <section class="summary-card">
        <h2>Disponibilidad y logística</h2>
        <ul>
          <li><strong>Inventario activo:</strong> {{ coffee.inventoryKg ? `${coffee.inventoryKg} kg` : '—' }}</li>
          <li><strong>Entrega estimada:</strong> {{ coffee.deliveryPromise || '—' }}</li>
          <li><strong>Centro logístico:</strong> {{ coffee.fulfillmentHub || coffee.acopioCenter || '—' }}</li>
          <li><strong>Comercializador:</strong> {{ coffee.vendor || '—' }}</li>
          <li><strong>Próximo hito:</strong> {{ coffee.nextMilestone || '—' }}</li>
        </ul>
      </section>
      <section class="summary-card">
        <h2>Experiencia recomendada</h2>
        <p>{{ coffee.valueProposition || 'Lote diseñado para experiencias de alto impacto con trazabilidad completa.' }}</p>
        <ul v-if="customerSegments.length">
          <li v-for="segment in customerSegments" :key="segment">{{ segment }}</li>
        </ul>
      </section>
    </div>

    <section v-if="roastProfiles.length" class="cards-section">
      <h2>Perfiles de tueste disponibles</h2>
      <div class="card-grid">
        <article v-for="profile in roastProfiles" :key="profile.name || profile.level" class="card">
          <header>
            <h3>{{ profile.name || 'Perfil' }}</h3>
            <span class="pill">{{ profile.level || '—' }}</span>
          </header>
          <p>{{ profile.flavorFocus || 'Balanceado y dulce.' }}</p>
          <ul>
            <li v-if="profile.charge"><strong>Carga:</strong> {{ profile.charge }}</li>
            <li v-if="profile.development"><strong>Desarrollo:</strong> {{ profile.development }}</li>
            <li v-if="profile.restTime"><strong>Descanso sugerido:</strong> {{ profile.restTime }}</li>
          </ul>
          <div v-if="profile.recommendedUses?.length" class="chips">
            <span v-for="use in profile.recommendedUses" :key="use" class="chip">{{ use }}</span>
          </div>
        </article>
      </div>
    </section>

    <section v-if="grindOptions.length" class="cards-section">
      <h2>Opciones de molienda</h2>
      <div class="card-grid grind">
        <article v-for="option in grindOptions" :key="option.name || option.granularity" class="card">
          <header>
            <h3>{{ option.name || 'Molienda' }}</h3>
            <span class="pill">{{ option.granularity || 'Personalizada' }}</span>
          </header>
          <p>{{ option.description || 'Calibración precisa desde espresso hasta prensa francesa.' }}</p>
          <div v-if="option.recommendedUses?.length" class="chips">
            <span v-for="use in option.recommendedUses" :key="use" class="chip">{{ use }}</span>
          </div>
        </article>
      </div>
    </section>

    <section v-if="packagingOptions.length" class="packaging">
      <h2>Empaques disponibles</h2>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Formato</th>
              <th>Material</th>
              <th>Precio</th>
              <th>Notas</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="pack in packagingOptions" :key="pack.format + pack.material">
              <td>{{ pack.format || '—' }}</td>
              <td>{{ pack.material || '—' }}</td>
              <td>{{ formatPrice(pack.price) }}</td>
              <td>{{ pack.notes || pack.leadTime || '—' }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section v-if="fulfillmentFlow.length" class="timeline">
      <h2>Flujo de acopio y fulfilment</h2>
      <ol>
        <li v-for="step in fulfillmentFlow" :key="step.step" class="timeline-step">
          <div class="step-header">
            <h3>{{ step.step }}</h3>
            <span class="pill pill-muted">{{ step.status || 'Pendiente' }}</span>
          </div>
          <p>{{ step.detail || 'Proceso monitoreado.' }}</p>
          <p class="meta">Responsable: {{ step.owner || '—' }} · SLA: {{ step.sla || '—' }}</p>
        </li>
      </ol>
    </section>

    <section v-if="sellerNotifications.length" class="notifications">
      <h2>Notificaciones clave al vendedor</h2>
      <ul>
        <li v-for="note in sellerNotifications" :key="note.trigger" class="notification-item">
          <h3>{{ note.trigger }}</h3>
          <p>{{ note.message }}</p>
          <p class="meta">Canales: {{ Array.isArray(note.channel) ? note.channel.join(', ') : note.channel }}</p>
        </li>
      </ul>
    </section>

    <section class="content-body">
      <ContentRenderer :value="coffee" />
    </section>
  </main>
</template>

<style scoped>
.detail {
  display: grid;
  gap: 2rem;
  padding: 2rem 1.5rem 4rem;
}

.back {
  text-decoration: none;
  color: #2563eb;
  font-weight: 600;
  font-size: 0.95rem;
}

.detail-header {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem 2rem;
  justify-content: space-between;
  align-items: flex-start;
}

.header-info h1 {
  margin: 0.25rem 0 0;
  font-size: clamp(2rem, 4vw, 2.6rem);
}

.eyebrow {
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 0.8rem;
  color: #7c3aed;
  font-weight: 600;
}

.subtitle {
  margin: 0.5rem 0 0;
  color: #4b5563;
  max-width: 60ch;
}

.badges {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.badge {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.4rem 0.75rem;
  border-radius: 999px;
  font-size: 0.85rem;
  font-weight: 600;
}

.badge-score {
  background: rgba(16, 185, 129, 0.15);
  color: #047857;
}

.badge-status {
  background: rgba(59, 130, 246, 0.12);
  color: #1d4ed8;
}

.summary-grid {
  display: grid;
  gap: 1.25rem;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
}

.summary-card {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  padding: 1.5rem;
  display: grid;
  gap: 0.75rem;
  box-shadow: 0 12px 24px -24px rgba(30, 64, 175, 0.4);
}

.summary-card h2 {
  margin: 0;
  font-size: 1.25rem;
}

.summary-card ul {
  margin: 0;
  padding-left: 1.2rem;
  display: grid;
  gap: 0.4rem;
  color: #374151;
}

.summary-card p {
  margin: 0;
  color: #374151;
}

.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}

.chip {
  background: #f3f4f6;
  color: #1f2937;
  border-radius: 999px;
  padding: 0.25rem 0.7rem;
  font-size: 0.8rem;
  font-weight: 600;
}

.cards-section {
  display: grid;
  gap: 1rem;
}

.cards-section h2 {
  margin: 0;
  font-size: 1.45rem;
}

.card-grid {
  display: grid;
  gap: 1.25rem;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
}

.card {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  padding: 1.25rem;
  display: grid;
  gap: 0.75rem;
  box-shadow: 0 12px 28px -28px rgba(59, 130, 246, 0.45);
}

.card header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.75rem;
}

.card h3 {
  margin: 0;
  font-size: 1.1rem;
}

.card p {
  margin: 0;
  color: #374151;
}

.card ul {
  margin: 0;
  padding-left: 1.1rem;
  display: grid;
  gap: 0.3rem;
}

.pill {
  display: inline-flex;
  padding: 0.25rem 0.6rem;
  border-radius: 999px;
  background: rgba(124, 58, 237, 0.12);
  color: #6d28d9;
  font-size: 0.8rem;
  font-weight: 600;
}

.pill-muted {
  background: rgba(100, 116, 139, 0.18);
  color: #1f2937;
}

.packaging {
  display: grid;
  gap: 1rem;
}

.packaging .table-wrap {
  overflow: auto;
  border: 1px solid #e5e7eb;
  border-radius: 14px;
}

.packaging table {
  width: 100%;
  border-collapse: collapse;
  min-width: 600px;
}

.packaging th,
.packaging td {
  padding: 0.65rem 0.85rem;
  border-bottom: 1px solid #f3f4f6;
  text-align: left;
}

.timeline {
  display: grid;
  gap: 1rem;
}

.timeline h2 {
  margin: 0;
  font-size: 1.45rem;
}

.timeline ol {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 1rem;
}

.timeline-step {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  padding: 1.25rem;
  display: grid;
  gap: 0.6rem;
}

.step-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.75rem;
}

.timeline-step p {
  margin: 0;
  color: #374151;
}

.meta {
  color: #2563eb;
  font-size: 0.9rem;
  margin: 0;
}

.notifications {
  display: grid;
  gap: 1rem;
}

.notifications h2 {
  margin: 0;
  font-size: 1.45rem;
}

.notifications ul {
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 0.85rem;
}

.notification-item {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 14px;
  padding: 1.25rem;
  display: grid;
  gap: 0.5rem;
}

.notification-item h3 {
  margin: 0;
  font-size: 1.1rem;
}

.notification-item p {
  margin: 0;
  color: #374151;
}

.content-body {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 12px 32px -28px rgba(15, 23, 42, 0.4);
}

@media (max-width: 640px) {
  .detail {
    padding: 1.5rem 1rem 3rem;
  }

  .detail-header {
    flex-direction: column;
  }
}
</style>
