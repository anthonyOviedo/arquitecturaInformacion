<script setup>
import { useRoute } from 'vue-router'
import { queryContent } from '#content'

const route = useRoute()
const category = route.params.category

const categories = {
  brand: { field: 'brand', title: 'Marca' },
  operatingSystem: { field: 'operatingSystem', title: 'Sistema Operativo' },
  screenSize: { field: 'screenSize', title: 'Tamaño de pantalla' },
  processor: { field: 'processor', title: 'Procesador' }
}

const meta = categories[category]
if (!meta) {
  throw createError({ statusCode: 404, statusMessage: 'Categoría no válida' })
}

const { data } = await queryContent('laptops').find()
const values = Array.from(new Set(data.map(item => item[meta.field]))).sort()
</script>

<template>
  <div>
    <h2>{{ meta.title }}</h2>
    <ul>
      <li v-for="val in values" :key="val">
        <NuxtLink :to="`/${category}/${encodeURIComponent(val)}`">{{ val }}</NuxtLink>
      </li>
    </ul>
  </div>
</template>
