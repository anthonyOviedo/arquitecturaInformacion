<script setup>
const route = useRoute()
// Obtiene el documento exactamente por la ruta actual
const item = await queryContent().where({ _path: route.path }).findOne()

const pageTitle = (item?.title || [item?.brand, item?.model].filter(Boolean).join(' ') || item?._path?.split('/').pop() || 'Laptop').toString()
const showOwnTitle = Boolean(item?.title || item?.brand || item?.model)
useHead({ title: pageTitle })

const labels = {
  brand: 'Marca',
  model: 'Modelo',
  operatingSystem: 'Sistema Operativo',
  screenSize: 'Tamaño de pantalla',
  processor: 'Procesador',
  ram: 'RAM',
  storage: 'Almacenamiento',
  price: 'Precio'
}

const specs = Object.entries(labels)
  .filter(([key]) => item && key in item && item[key])
  .map(([key, label]) => ({ key, label, value: item[key] }))
</script>

<template>
  <article v-if="item" class="wrap">
    <h1 v-if="showOwnTitle" class="title">{{ pageTitle }}</h1>

    <ul v-if="specs.length" class="specs">
      <li v-for="s in specs" :key="s.key"><strong>{{ s.label }}:</strong> {{ s.value }}</li>
    </ul>

    <ContentRenderer :value="item" />
  </article>
  <p v-else>No encontrado.</p>
</template>

<style scoped>
.wrap { display: grid; gap: .75rem; }
.title { margin: 0; font-size: 1.5rem; }
.specs { list-style: none; padding: 0; margin: 0 0 .5rem; display: grid; gap: .25rem; color: #374151; }
.specs strong { color: #111827; }
</style>
