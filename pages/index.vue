<script setup lang="ts">
import { useCoffeeCatalog } from '~/composables/useCoffeeCatalog'

useHead({
  title: 'Marketplace integral de café personalizado',
  meta: [
    {
      name: 'description',
      content: 'Propuesta integral para un portal de venta de café que orquesta personalización, logística y seguimiento para clientes, vendedores y administradores.'
    }
  ]
})

const table = await useCoffeeCatalog()
const { q, categoryOptions, selectedCategory, selectedValue, valueOptions, orderedColumns, filteredRows, metrics } = table

const formatMetric = (value: number | string, digits = 0) => {
  if (value === undefined || value === null) return '—'
  if (typeof value === 'number') {
    return new Intl.NumberFormat('es-PA', {
      minimumFractionDigits: digits,
      maximumFractionDigits: digits
    }).format(value)
  }
  return String(value)
}

const formatCell = (value: unknown) => {
  if (value === undefined || value === null || value === '') return '—'
  if (typeof value === 'number') {
    return new Intl.NumberFormat('es-PA', { maximumFractionDigits: 2 }).format(value)
  }
  return String(value)
}

const metricCards = computed(() => {
  const snapshot = metrics.value
  return [
    { label: 'Lotes activos', value: snapshot.lots, digits: 0 },
    { label: 'Inventario disponible (kg)', value: snapshot.inventory, digits: 0 },
    { label: 'Orígenes representados', value: snapshot.origins, digits: 0 },
    { label: 'Comercializadores activos', value: snapshot.vendors, digits: 0 }
  ]
})

const roleCapabilities = [
  {
    role: 'Cliente',
    description: 'Explora cafés de especialidad, configura tueste, molido y empaque y recibe entregas frescas con seguimiento granular.',
    capabilities: [
      'Catálogo responsivo con filtros avanzados por origen, proceso, puntaje SCA, inventario disponible y certificaciones.',
      'Configurador que combina perfiles de tueste, grados de molienda y tipos de empaque con precios y tiempos de entrega dinámicos.',
      'Carrito inteligente que sugiere suscripciones, kits de extracción y recordatorios de recompra basados en histórico sensorial.',
      'Seguimiento post-compra con línea de tiempo logística, trazabilidad del lote y repositorio de guías de preparación personalizadas.'
    ],
    touchpoints: [
      { name: 'Web / App', detail: 'UI omnicanal, accesible y con login social; permite guardar recetas y repetir configuraciones favoritas.' },
      { name: 'Soporte contextual', detail: 'Chat integrado, asistentes basados en IA y centro de ayuda con recetas según el tueste adquirido.' },
      { name: 'Comunidad', detail: 'Sistema de reseñas con notas de cata, badges de fidelidad y retos mensuales patrocinados por tostadores.' }
    ]
  },
  {
    role: 'Vendedor',
    description: 'Agricultores, cooperativas o tostadores que suben lotes, monitorean el estado operativo y reciben retroalimentación en tiempo real.',
    capabilities: [
      'Onboarding guiado con checklists de trazabilidad, laboratorios aliados y validaciones de calidad antes del envío al acopio.',
      'Panel de desempeño con métricas de velocidad de venta, tickets abiertos y pronóstico de demanda por perfil de tueste.',
      'Herramientas para definir precios mínimos, ventanas de producción y reglas de disponibilidad basadas en inventario.',
      'Historial de notificaciones operativas (acopio, tueste, despacho) con evidencia fotográfica y acuses digitales.'
    ],
    touchpoints: [
      { name: 'Panel web', detail: 'Gestor de lotes, control documental, contratos digitales y capacidad de generar etiquetas logísticas.' },
      { name: 'Alertas proactivas', detail: 'Push, email y SMS con hitos críticos (recepción, QC, tostado, liquidación).' },
      { name: 'Integraciones', detail: 'API para subir lotes desde ERPs agrícolas y sincronizar inventario físico.' }
    ]
  },
  {
    role: 'Admin',
    description: 'Equipo interno que orquesta catálogo, operaciones, riesgo y analítica financiera del marketplace.',
    capabilities: [
      'Panel maestro con tablero de mando por SLA (acopio, tueste, despacho) y visibilidad de capacidad por centro de acopio.',
      'Motor de reglas para aprobar lotes, ajustar márgenes dinámicos, segmentar campañas y activar promociones temáticas.',
      'Sistema de conciliación con split de pagos, anticipos a productores y liquidaciones automáticas tras la entrega.',
      'Suite de reportes con trazabilidad de incidencias, comparativas de cup score y NPS post-entrega.'
    ],
    touchpoints: [
      { name: 'Backoffice modular', detail: 'Roles granulares, bitácora de auditoría y asistentes para resolución rápida de incidencias.' },
      { name: 'BI & alertas', detail: 'Dashboards con KPIs en tiempo real, alertas tempranas y exportaciones a Data Warehouse.' },
      { name: 'Gestión de contenidos', detail: 'CMS para campañas, bundles estacionales y recetas patrocinadas.' }
    ]
  }
]

const personalizationSteps = [
  {
    id: '01',
    title: 'Exploración de origen y lote',
    description: 'Filtros facetados por país, altitud, variedad y certificaciones con disponibilidad de inventario en tiempo real.',
    deliverables: [
      'Mapa interactivo y fichas comparables de microlotes.',
      'Indicadores de frescura (fecha de cosecha, humedad, densidad).',
      'Etiquetas de atributos sensoriales y puntaje SCA.'
    ],
    owner: 'Módulo Catálogo & Contenido'
  },
  {
    id: '02',
    title: 'Selección de perfil de tueste',
    description: 'Motor que recomienda tuestes según método favorito del cliente y disponibilidad de capacidad en la tostadora.',
    deliverables: [
      'Simulaciones de sabor y curvas de temperatura validadas por laboratorio.',
      'Promesas de fecha de tueste y descanso óptimo según el perfil elegido.',
      'Alertas de producción cuando un lote alcanza su límite mínimo.'
    ],
    owner: 'OMS & Tostaduría Aliada'
  },
  {
    id: '03',
    title: 'Configuración de molienda y empaque',
    description: 'Calibraciones predefinidas por método (espresso, filtro, prensa, cold brew) y empaques sostenibles con costos asociados.',
    deliverables: [
      'Tabla de equivalencias de micraje con recomendaciones de preparación.',
      'Selección de empaques compostables, valvulados o al vacío con impacto en shelf life.',
      'Visualización del impacto en costo y lead time por combinación.'
    ],
    owner: 'Centro de Acopio & Fulfillment'
  },
  {
    id: '04',
    title: 'Checkout omnicanal',
    description: 'Pagos escalables con split automático, suscripciones recurrentes y opciones de envío express o programado.',
    deliverables: [
      'Wallet de cafés favoritos, recompensas y códigos de degustación.',
      'Integración con transportistas urbanos y logística fría para ciudades clave.',
      'Confirmaciones en tiempo real vía email, app y webhook.'
    ],
    owner: 'Motor de Pagos & OMS'
  },
  {
    id: '05',
    title: 'Postventa y fidelización',
    description: 'Seguimiento detallado del despacho, encuestas sensoriales y automatizaciones de recompra.',
    deliverables: [
      'Timeline con hitos de acopio, tueste, empaque y entrega con evidencias multimedia.',
      'Encuestas NPS y recordatorios de molienda programados.',
      'Programa de membresías con envíos prioritarios y acceso a lotes exclusivos.'
    ],
    owner: 'CRM & Customer Success'
  }
]

const vendorPipeline = [
  {
    title: '1. Registro y prevalidación',
    sla: 'SLA: 6 h desde la carga',
    owner: 'Vendedor + Control de Calidad',
    description: 'El productor crea la ficha digital del lote, adjunta resultados de laboratorio y agenda ventana de entrega.',
    actions: [
      'Checklist guiado para humedad, densidad, trazabilidad y certificaciones.',
      'Aprobaciones automáticas mediante scoring mínimo configurado por el admin.',
      'Reserva de transporte y generación de etiquetas QR para pallets.'
    ],
    signals: [
      'Confirmación instantánea de recepción de documentos.',
      'Alerta push al vendedor ante observaciones del analista.'
    ]
  },
  {
    title: '2. Recepción en centro de acopio',
    sla: 'SLA: 24 h desde arribo',
    owner: 'Operaciones de Acopio',
    description: 'El lote se pesa, se toma muestra de control y se registra evidencia fotográfica para el vendedor.',
    actions: [
      'Pesaje automatizado con integración a básculas inteligentes.',
      'Registro de humedad y colorímetro con publicación en la ficha.',
      'Liberación del lote a inventario temporal para preventa.'
    ],
    signals: [
      'Push + email al vendedor con fotos y resultados.',
      'Webhook al admin con checklist de incidencias.'
    ]
  },
  {
    title: '3. Programación de tueste',
    sla: 'SLA: 48 h tras liberación de QC',
    owner: 'Coordinador de Tostado',
    description: 'Se asigna la curva de tueste al lote, se actualiza la disponibilidad y se comunica al cliente final.',
    actions: [
      'Bloqueo de capacidad por perfil seleccionado en el checkout.',
      'Sincronización con IoT de tostadora para capturar curvas y lotes reales.',
      'Actualización automática del ETA en los pedidos impactados.'
    ],
    signals: [
      'Push al vendedor con agenda confirmada.',
      'Notificación al cliente si el tueste genera cambios en la fecha de entrega.'
    ]
  },
  {
    title: '4. Molienda, empaque y QA final',
    sla: 'SLA: 12 h posteriores al tueste',
    owner: 'Centro de Fulfillment',
    description: 'El lote se muele según configuraciones, se empaca y pasa por control de calidad final antes de despacho.',
    actions: [
      'Asignación automática de molinos y validación de micraje con sensores.',
      'Etiquetado inteligente con códigos de lote, fecha de tueste y método recomendado.',
      'Control de fugas y revisión de sellado antes de cierre de guía.'
    ],
    signals: [
      'Reporte al vendedor con evidencia fotográfica del empaquetado.',
      'Actualización del estado del pedido a “En ruta”.'
    ]
  },
  {
    title: '5. Entrega y liquidación',
    sla: 'SLA: 24-72 h según destino',
    owner: 'Logística + Finanzas',
    description: 'Seguimiento de última milla, confirmación de entrega y liquidación automática al vendedor.',
    actions: [
      'Integración con transportistas para tracking en vivo y pruebas de entrega.',
      'Liquidación automática del lote descontando comisiones y costos logísticos.',
      'Encuesta post entrega y actualización de rating del vendedor.'
    ],
    signals: [
      'Notificación de entrega con evidencia al vendedor y cliente.',
      'Estado de pago actualizado en el panel administrativo.'
    ]
  }
]

const notificationMatrix = [
  {
    event: 'Ficha de lote enviada',
    vendor: 'Push + email con checklist de revisión y tiempo estimado de respuesta.',
    operations: 'Creación automática de ticket en tablero Kanban de calidad.',
    customer: 'No aplica (lote aún no visible públicamente).'
  },
  {
    event: 'Recepción en acopio',
    vendor: 'Push + email con fotos, pesaje y observaciones.',
    operations: 'Actualización de dashboard en tiempo real y alerta en Slack/Teams.',
    customer: 'Suscriptores “early access” reciben aviso de nuevo lote disponible.'
  },
  {
    event: 'Tueste iniciado',
    vendor: 'Push con hora estimada de finalización y curvas disponibles.',
    operations: 'Sincronización IoT + tarea de QA en el panel operativo.',
    customer: 'Actualización en la línea de tiempo del pedido y aviso en la app.'
  },
  {
    event: 'Empaque y despacho',
    vendor: 'Email con guía, lote empacado y ventana de salida.',
    operations: 'OMS genera manifiesto y bloquea inventario restante.',
    customer: 'Tracking en vivo, confirmación por email/app y opción de reagendar.'
  },
  {
    event: 'Entrega confirmada',
    vendor: 'Liquidación automática + encuesta de satisfacción.',
    operations: 'Cierre de ticket, conciliación contable y archivo en el DWH.',
    customer: 'Encuesta sensorial, recordatorio de recompra y actualización de puntos.'
  }
]

const adminStacks = [
  {
    title: 'Operaciones y cumplimiento',
    description: 'Visibilidad integral del flujo acopio → tueste → empaque → entrega.',
    modules: [
      'Dashboard en tiempo real de capacidad de tostadoras, molinos y líneas de empaque.',
      'Gestión de SLA con semáforos y re-enrutamiento automático ante cuellos de botella.',
      'Registro de incidencias con evidencia multimedia y planes de acción asignables.'
    ],
    kpis: [
      'Lead time promedio acopio → despacho.',
      '% de lotes aprobados sin reproceso.',
      'Nivel de ocupación por equipo crítico.'
    ]
  },
  {
    title: 'Administración y finanzas',
    description: 'Control de márgenes, split de pagos y gestión de contratos.',
    modules: [
      'Motor de comisiones configurable por vendedor, origen o tipo de cliente.',
      'Conciliación bancaria automática y generación de facturas electrónicas.',
      'Gestión de contratos digitales, renovaciones y garantías de calidad.'
    ],
    kpis: [
      'Margen neto por lote y por canal.',
      'Tiempo promedio de liquidación al productor.',
      'Incidencias financieras resueltas en primera llamada.'
    ]
  },
  {
    title: 'Estrategia comercial & CX',
    description: 'Orquesta campañas, fidelización y aprendizaje del cliente final.',
    modules: [
      'Segmentación avanzada por comportamiento de compra y preferencias sensoriales.',
      'Motor de recomendaciones que combina datos de cata y satisfacción.',
      'Experimentación A/B para landing pages, bundles y planes de suscripción.'
    ],
    kpis: [
      'NPS post entrega y tasa de recompra a 60 días.',
      'Conversión de campañas personalizadas por segmento.',
      'Participación de miembros en programas de suscripción.'
    ]
  }
]
</script>

<template>
  <div class="page">
    <header class="hero">
      <p class="eyebrow">Marketplace integral de café de especialidad</p>
      <h1>Propuesta operativa para venta de café con personalización extremo a extremo</h1>
      <p class="lead">
        Arquitectura que permite a clientes configurar su café ideal, a vendedores monitorear cada hito desde el acopio hasta la entrega y a administradores gobernar la operación con datos en tiempo real.
      </p>
      <div class="metrics-grid">
        <div v-for="metric in metricCards" :key="metric.label" class="metric-card">
          <span class="metric-number">{{ formatMetric(metric.value, metric.digits) }}</span>
          <span class="metric-label">{{ metric.label }}</span>
        </div>
      </div>
    </header>

    <section class="roles">
      <h2>Pilares de experiencia por tipo de usuario</h2>
      <div class="role-grid">
        <article v-for="role in roleCapabilities" :key="role.role" class="role-card">
          <header>
            <h3>{{ role.role }}</h3>
            <p>{{ role.description }}</p>
          </header>
          <h4>Capacidades clave</h4>
          <ul>
            <li v-for="item in role.capabilities" :key="item">{{ item }}</li>
          </ul>
          <h4>Touchpoints</h4>
          <ul>
            <li v-for="item in role.touchpoints" :key="item.name">
              <strong>{{ item.name }}:</strong> {{ item.detail }}
            </li>
          </ul>
        </article>
      </div>
    </section>

    <section class="personalization">
      <h2>Flujo de personalización y compra</h2>
      <p class="section-lead">Cada etapa conecta inventario real, capacidad de tueste y logística para asegurar entregas frescas y trazables.</p>
      <ol class="step-grid">
        <li v-for="step in personalizationSteps" :key="step.id">
          <span class="step-id">{{ step.id }}</span>
          <div class="step-body">
            <h3>{{ step.title }}</h3>
            <p>{{ step.description }}</p>
            <ul>
              <li v-for="deliverable in step.deliverables" :key="deliverable">{{ deliverable }}</li>
            </ul>
            <p class="owner">Responsable: {{ step.owner }}</p>
          </div>
        </li>
      </ol>
    </section>

    <section class="catalog">
      <h2>Catálogo operativo de lotes activos</h2>
      <p class="section-lead">Visualiza en un mismo tablero los lotes disponibles, configuraciones permitidas y estado operativo para habilitar compras informadas.</p>
      <div class="catalog-controls">
        <label>
          <span>Buscar</span>
          <input v-model="q" type="search" placeholder="Filtrar por café, origen o vendedor" />
        </label>
        <label>
          <span>Categoría</span>
          <select v-model="selectedCategory">
            <option v-for="option in categoryOptions" :key="option" :value="option">{{ option }}</option>
          </select>
        </label>
        <label>
          <span>Valor</span>
          <select v-model="selectedValue">
            <option value="">Todos</option>
            <option v-for="option in valueOptions" :key="option" :value="option">{{ option }}</option>
          </select>
        </label>
      </div>
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
                <template v-if="col === 'Café'">
                  <NuxtLink :to="row.path">{{ formatCell(row[col]) }}</NuxtLink>
                </template>
                <template v-else>
                  {{ formatCell(row[col]) }}
                </template>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="pipeline">
      <h2>Pipeline monitorizado del vendedor y centro de acopio</h2>
      <p class="section-lead">Cada hito genera notificaciones, evidencia y reglas de negocio que mantienen alineados a vendedor, operaciones y cliente final.</p>
      <div class="pipeline-grid">
        <article v-for="stage in vendorPipeline" :key="stage.title" class="pipeline-card">
          <header>
            <h3>{{ stage.title }}</h3>
            <span class="sla">{{ stage.sla }}</span>
          </header>
          <p>{{ stage.description }}</p>
          <h4>Acciones principales</h4>
          <ul>
            <li v-for="action in stage.actions" :key="action">{{ action }}</li>
          </ul>
          <p class="owner">Responsable: {{ stage.owner }}</p>
          <p class="signals">
            <strong>Alertas:</strong>
            <span>{{ stage.signals.join(' · ') }}</span>
          </p>
        </article>
      </div>
    </section>

    <section class="notifications">
      <h2>Orquestación de notificaciones y comunicación</h2>
      <p class="section-lead">Asegura transparencia y acción rápida mediante notificaciones sincronizadas para cada actor.</p>
      <div class="table-wrap">
        <table class="notif-table">
          <thead>
            <tr>
              <th>Evento</th>
              <th>Vendedor</th>
              <th>Operaciones / Admin</th>
              <th>Cliente</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in notificationMatrix" :key="row.event">
              <th scope="row">{{ row.event }}</th>
              <td>{{ row.vendor }}</td>
              <td>{{ row.operations }}</td>
              <td>{{ row.customer }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="operations">
      <h2>Capas administrativas y de analítica</h2>
      <p class="section-lead">Backoffice modular que conecta operaciones físicas, finanzas y experiencia del cliente con datos confiables.</p>
      <div class="ops-grid">
        <article v-for="area in adminStacks" :key="area.title" class="ops-card">
          <header>
            <h3>{{ area.title }}</h3>
            <p>{{ area.description }}</p>
          </header>
          <h4>Módulos clave</h4>
          <ul>
            <li v-for="module in area.modules" :key="module">{{ module }}</li>
          </ul>
          <h4>KPIs de control</h4>
          <ul>
            <li v-for="kpi in area.kpis" :key="kpi">{{ kpi }}</li>
          </ul>
        </article>
      </div>
    </section>
  </div>
</template>

<style scoped>
.page {
  display: grid;
  gap: 3rem;
  padding: 2rem 1.5rem 4rem;
}

.hero {
  display: grid;
  gap: 1.5rem;
  text-align: left;
}

.eyebrow {
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #7c3aed;
  font-weight: 600;
}

.hero h1 {
  margin: 0;
  font-size: clamp(2rem, 4vw, 2.75rem);
  line-height: 1.1;
}

.lead {
  margin: 0;
  font-size: 1.05rem;
  color: #374151;
  max-width: 60ch;
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 1rem;
}

.metric-card {
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 1rem 1.25rem;
  display: grid;
  gap: 0.35rem;
}

.metric-number {
  font-size: 1.75rem;
  font-weight: 700;
  color: #111827;
}

.metric-label {
  color: #4b5563;
  font-size: 0.95rem;
}

section {
  display: grid;
  gap: 1.25rem;
}

section h2 {
  margin: 0;
  font-size: 1.75rem;
}

.section-lead {
  margin: 0;
  color: #4b5563;
  max-width: 70ch;
}

.role-grid {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
}

.role-card {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  padding: 1.5rem;
  display: grid;
  gap: 1rem;
  box-shadow: 0 12px 24px -24px rgba(15, 23, 42, 0.6);
}

.role-card h3 {
  margin: 0 0 0.35rem;
  font-size: 1.25rem;
}

.role-card p {
  margin: 0;
  color: #4b5563;
}

.role-card ul {
  margin: 0;
  padding-left: 1.25rem;
  display: grid;
  gap: 0.35rem;
}

.personalization .step-grid {
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 1rem;
}

.step-grid li {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 1rem;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 14px;
  padding: 1.25rem 1.5rem;
  align-items: start;
  box-shadow: 0 12px 32px -28px rgba(30, 64, 175, 0.45);
}

.step-id {
  font-size: 1.75rem;
  font-weight: 700;
  color: #7c3aed;
}

.step-body h3 {
  margin: 0 0 0.35rem;
}

.step-body p {
  margin: 0 0 0.5rem;
  color: #374151;
}

.step-body ul {
  margin: 0 0 0.75rem;
  padding-left: 1.1rem;
  display: grid;
  gap: 0.3rem;
}

.owner {
  margin: 0;
  font-weight: 600;
  color: #2563eb;
}

.catalog {
  gap: 1.5rem;
}

.catalog-controls {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: flex-end;
}

.catalog-controls label {
  display: grid;
  gap: 0.35rem;
  font-size: 0.9rem;
  color: #374151;
}

.catalog-controls input,
.catalog-controls select {
  border: 1px solid #d1d5db;
  border-radius: 8px;
  padding: 0.45rem 0.65rem;
  min-width: 200px;
  font-size: 0.95rem;
}

.table-wrap {
  overflow: auto;
  border: 1px solid #e5e7eb;
  border-radius: 14px;
}

.table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.95rem;
  min-width: 900px;
}

.table th,
.table td {
  padding: 0.75rem 0.85rem;
  text-align: left;
  border-bottom: 1px solid #f3f4f6;
  vertical-align: top;
}

.table thead {
  background: #f9fafb;
}

.table tbody tr:hover td {
  background: #f3f4f6;
}

.table a {
  color: #2563eb;
  text-decoration: none;
  font-weight: 600;
}

.pipeline-grid {
  display: grid;
  gap: 1.25rem;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
}

.pipeline-card {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  padding: 1.5rem;
  display: grid;
  gap: 0.85rem;
  box-shadow: 0 12px 32px -28px rgba(30, 64, 175, 0.35);
}

.pipeline-card h3 {
  margin: 0;
  font-size: 1.1rem;
}

.pipeline-card p {
  margin: 0;
  color: #374151;
}

.pipeline-card ul {
  margin: 0;
  padding-left: 1.2rem;
  display: grid;
  gap: 0.35rem;
}

.pipeline-card .sla {
  font-size: 0.85rem;
  color: #7c3aed;
  font-weight: 600;
}

.pipeline-card .signals {
  color: #2563eb;
}

.notif-table {
  width: 100%;
  border-collapse: collapse;
  min-width: 720px;
}

.notif-table th,
.notif-table td {
  padding: 0.75rem 0.85rem;
  border-bottom: 1px solid #e5e7eb;
  text-align: left;
}

.notif-table thead th {
  background: #f9fafb;
}

.ops-grid {
  display: grid;
  gap: 1.25rem;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
}

.ops-card {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  padding: 1.5rem;
  display: grid;
  gap: 0.9rem;
  box-shadow: 0 12px 30px -30px rgba(15, 118, 110, 0.6);
}

.ops-card h3 {
  margin: 0;
  font-size: 1.15rem;
}

.ops-card p {
  margin: 0;
  color: #374151;
}

.ops-card ul {
  margin: 0;
  padding-left: 1.25rem;
  display: grid;
  gap: 0.35rem;
}

@media (max-width: 640px) {
  .page {
    padding: 1.5rem 1rem 3rem;
  }

  .table {
    font-size: 0.88rem;
  }

  .step-grid li {
    grid-template-columns: 1fr;
  }

  .step-id {
    font-size: 1.25rem;
  }
}
</style>
